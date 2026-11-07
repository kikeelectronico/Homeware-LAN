#!/usr/bin/env python3
"""Convert an OpenAPI (3.x) JSON file into one Markdown page for Hugo.

The page uses the api-* shortcodes of hugo-docs-theme. Schemas are expanded
inline inside every parameter, request body and response.

Usage: python3 scripts/openapi2md.py [openapi.json] [output.md]
No third-party dependencies.
"""
import json
import re
import sys
from pathlib import Path

SRC = sys.argv[1] if len(sys.argv) > 1 else "static/openapi.json"
OUT = sys.argv[2] if len(sys.argv) > 2 else "content/docs/api/rest.md"

TITLE = "REST API"
WEIGHT = 30
ALIASES = ["/api/"]  # URL of the old Docusaurus page
OPEN_DEPTH = 2  # object fields nested deeper than this start collapsed
METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"]

spec = json.loads(Path(SRC).read_text(encoding="utf-8"))
schemas = spec.get("components", {}).get("schemas", {})
ignored = set()


# ---------------------------------------------------------------- shortcodes

def q(value):
    return '"%s"' % re.sub(r"\s+", " ", str(value)).strip().replace('"', '\\"')


def sc(_tag, **params):
    """Opening shortcode; params that are None/empty are omitted."""
    args = ["%s=%s" % (k, q(v)) for k, v in params.items() if v not in (None, "")]
    return "{{< %s >}}" % " ".join([_tag] + args)


def end(name):
    return "{{< /%s >}}" % name


# ------------------------------------------------------------- schema helpers

def resolve(obj):
    """Follow $ref of parameters, request bodies and responses."""
    for _ in range(10):
        if not (isinstance(obj, dict) and "$ref" in obj):
            break
        node = spec
        for part in obj["$ref"].lstrip("#/").split("/"):
            node = node[part.replace("~1", "/").replace("~0", "~")]
        obj = node
    return obj


def ref_name(s):
    return s["$ref"].rsplit("/", 1)[-1]


def flatten(s, depth=0):
    """Merge the properties of allOf members (and of their $refs) into one schema."""
    if not isinstance(s, dict) or depth > 10:
        return {"properties": {}, "required": []}
    if "$ref" in s:
        return flatten(schemas.get(ref_name(s), {}), depth + 1)
    merged = {"properties": {}, "required": []}
    for member in s.get("allOf", []):
        m = flatten(member, depth + 1)
        merged["properties"].update(m["properties"])
        merged["required"] += m["required"]
    merged["properties"].update(s.get("properties", {}))
    merged["required"] += s.get("required", [])
    return merged


def unwrap(s):
    """Resolve $ref and drop `null` from anyOf/oneOf.

    Returns (schema, outermost ref name, nullable, {description, default}).
    """
    ref, nullable, meta = None, False, {}
    while isinstance(s, dict):
        for k in ("description", "default"):
            if k in s and k not in meta:
                meta[k] = s[k]
        if "$ref" in s:
            ref = ref or ref_name(s)
            s = schemas.get(ref_name(s), {})
            continue
        union = s.get("anyOf") or s.get("oneOf")
        if union:
            members = [m for m in union if not (isinstance(m, dict) and m.get("type") == "null")]
            nullable = nullable or len(members) != len(union)
            if len(members) == 1:
                s = members[0]
                continue
        break
    return (s if isinstance(s, dict) else {}), ref, nullable, meta


def label(s):
    """Short human-readable type, e.g. `array of object (Access)`."""
    u, ref, nullable, _ = unwrap(s)
    union = u.get("anyOf") or u.get("oneOf")
    t = u.get("type")
    if union:
        text = " or ".join(label(m) for m in union if not (isinstance(m, dict) and m.get("type") == "null"))
    elif "allOf" in u:
        text = "object (%s)" % ref if ref else "object"
    elif t == "array":
        inner = label(u.get("items", {}))
        text = "array of " + ("(%s)" % inner if " or " in inner else inner)
    elif t == "object" or "properties" in u:
        ap = u.get("additionalProperties")
        if ref and u.get("properties"):
            text = "object (%s)" % ref
        elif isinstance(ap, dict) and ap:
            text = "object with values of " + label(ap)
        else:
            text = "object"
    elif isinstance(t, list):
        text = " or ".join(t)
    elif t:
        text = "%s (%s)" % (t, u["format"]) if u.get("format") else t
    else:
        text = "any"
    return text + (" or null" if nullable else "")


def children(s):
    """(flattened object, ref name) of the object shown below a field, or None."""
    u, ref, _, _ = unwrap(s)
    while u.get("type") == "array":
        u, r, _, _ = unwrap(u.get("items", {}))
        ref = r or ref
    union = u.get("anyOf") or u.get("oneOf")
    if union:
        if any(children(m) for m in union):
            ignored.add("unions of several objects (shown by type only)")
        return None
    if u.get("type") == "object" or "properties" in u or "allOf" in u:
        flat = flatten(u)
        if flat["properties"]:
            return flat, ref
    return None


# ------------------------------------------------------------------ rendering

def field(name, schema, required, depth, seen, location=None, description=None):
    u, _, _, meta = unwrap(schema)
    enum = u.get("enum")
    params = dict(
        name=name,
        type=label(schema),
        location=location,
        required="true" if required else None,
        default=json.dumps(meta["default"]) if "default" in meta else None,
        enum=", ".join(str(v) for v in enum) if enum else None,
        desc=description or meta.get("description"),
    )
    kids = children(schema)
    if kids and kids[1] not in seen:
        flat, key = kids
        out = [sc("api-object", open=None if depth < OPEN_DEPTH else "false", **params)]
        out += fields(flat, depth + 1, seen + ((key,) if key else ()))
        return out + [end("api-object")]
    return [sc("api-field", recursive="true" if kids else None, **params)]


def fields(flat, depth, seen):
    required = set(flat["required"])
    out = []
    for name, p in flat["properties"].items():
        out += field(name, p, name in required, depth, seen)
    return out


def body(schema, content_type):
    u, _, _, meta = unwrap(schema)
    enum = u.get("enum")
    out = [sc("api-body", type=content_type, schema=label(schema),
              enum=", ".join(str(v) for v in enum) if enum else None)]
    kids = children(schema)
    if kids:
        flat, key = kids
        out += fields(flat, 1, (key,) if key else ())
    return out + [end("api-body")]


def operation(path, method, op, shared_params):
    out = ["### %s" % (op.get("summary") or op.get("operationId") or "%s %s" % (method.upper(), path)), ""]
    out.append(sc("api-op", method=method, path=path, deprecated="true" if op.get("deprecated") else None))
    if op.get("description"):
        out += [sc("api-desc"), op["description"].strip(), end("api-desc")]
    if op.get("security"):
        ignored.add("security requirements")
    if op.get("callbacks"):
        ignored.add("callbacks")

    params = {}
    for p in shared_params + op.get("parameters", []):
        p = resolve(p)
        params[(p["name"], p["in"])] = p
    if params:
        out.append(sc("api-section", kind="parameters"))
        for p in params.values():
            out += field(p["name"], p.get("schema", {}), p.get("required") or p["in"] == "path", 1, (),
                         location=p["in"], description=p.get("description"))
        out.append(end("api-section"))

    req = resolve(op.get("requestBody"))
    if req:
        out.append(sc("api-section", kind="request", required="true" if req.get("required") else None))
        if req.get("description"):
            out += [sc("api-desc"), req["description"].strip(), end("api-desc")]
        for ct, media in req.get("content", {}).items():
            out += body(media.get("schema", {}), ct)
        out.append(end("api-section"))

    if op.get("responses"):
        out.append(sc("api-section", kind="responses"))
        for status, r in op["responses"].items():
            r = resolve(r)
            out.append(sc("api-response", status=status, description=r.get("description"),
                          open=None if str(status).startswith("2") else "false"))
            for ct, media in r.get("content", {}).items():
                out += body(media.get("schema", {}), ct)
            out.append(end("api-response"))
        out.append(end("api-section"))

    return out + [end("api-op"), ""]


def group_name(path, op):
    if op.get("tags"):
        return op["tags"][0]
    segments = [s for s in path.split("/") if s]
    if segments and segments[0] == "api":
        segments = segments[1:]
    first = segments[0] if segments and not segments[0].startswith("{") else "general"
    return first.replace("_", " ").replace("-", " ").capitalize()


def walk(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in ("example", "examples"):
                ignored.add("examples")
            walk(v)
    elif isinstance(o, list):
        for v in o:
            walk(v)


walk(spec)
for key in ("servers", "security", "webhooks"):
    if spec.get(key):
        ignored.add(key)
if spec.get("components", {}).get("securitySchemes"):
    ignored.add("securitySchemes")

groups = {}
for path, item in spec.get("paths", {}).items():
    shared = item.get("parameters", [])
    for method in METHODS:
        if item.get(method):
            groups.setdefault(group_name(path, item[method]), []).append((path, method, item[method], shared))
tag_desc = {t["name"]: t.get("description", "") for t in spec.get("tags", [])}

lines = ["---",
         "# GENERATED by scripts/openapi2md.py from %s. Do not edit by hand." % SRC,
         'title: "%s"' % TITLE,
         "weight: %d" % WEIGHT]
if ALIASES:
    lines += ["aliases:"] + ["  - %s" % a for a in ALIASES]
lines += ["---", ""]

if spec.get("info", {}).get("description"):
    lines += [spec["info"]["description"].strip(), ""]

for name, ops in groups.items():
    lines += ["## %s" % name, ""]
    if tag_desc.get(name):
        lines += [tag_desc[name].strip(), ""]
    for path, method, op, shared in ops:
        lines += operation(path, method, op, shared)

out = Path(OUT)
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text("\n".join(lines).rstrip("\n") + "\n", encoding="utf-8")
print("Written %s (%d operations)" % (OUT, sum(len(v) for v in groups.values())))
if ignored:
    print("Warning: not rendered: %s" % ", ".join(sorted(ignored)), file=sys.stderr)

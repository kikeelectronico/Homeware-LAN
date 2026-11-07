#!/usr/bin/env python3
"""Convert an OpenAPI (3.x) JSON file into one Markdown page for Hugo.

Usage: python3 scripts/openapi2md.py [openapi.json] [output.md]
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
METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"]

spec = json.loads(Path(SRC).read_text(encoding="utf-8"))
schemas = spec.get("components", {}).get("schemas", {})
ignored = set()


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


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


def code(text):
    return "`%s`" % text


def cell(text):
    return re.sub(r"\s+", " ", str(text or "")).replace("|", "\\|").strip()


def type_str(s):
    if not isinstance(s, dict) or not s:
        return "any"
    if "$ref" in s:
        name = s["$ref"].rsplit("/", 1)[-1]
        return "[%s](#schema-%s)" % (name, slug(name))
    for key, sep in (("anyOf", " or "), ("oneOf", " or "), ("allOf", " and ")):
        if key in s:
            return sep.join(type_str(x) for x in s[key])
    t = s.get("type")
    if isinstance(t, list):
        return " or ".join(code(x) for x in t)
    if "enum" in s:
        vals = ", ".join(code(json.dumps(v)) for v in s["enum"])
        return "%s, one of %s" % (code(t or "value"), vals)
    if t == "array":
        return "array of " + type_str(s.get("items", {}))
    if t == "object" or "properties" in s:
        ap = s.get("additionalProperties")
        if isinstance(ap, dict) and ap:
            return "object with values of " + type_str(ap)
        return code("object")
    if t:
        fmt = s.get("format")
        return code("%s (%s)" % (t, fmt) if fmt else t)
    return "any"


def default_text(s):
    if isinstance(s, dict) and "default" in s:
        return "Default: `%s`." % json.dumps(s["default"])
    return ""


def describe(s):
    desc = s.get("description", "") if isinstance(s, dict) else ""
    return " ".join(x for x in (desc, default_text(s)) if x)


def flatten(s, depth=0):
    """Merge the properties of allOf members (and of their $refs) into one schema."""
    if not isinstance(s, dict) or depth > 10:
        return {}
    if "$ref" in s:
        return flatten(schemas.get(s["$ref"].rsplit("/", 1)[-1], {}), depth + 1)
    merged = {"properties": {}, "required": []}
    for member in s.get("allOf", []):
        m = flatten(member, depth + 1)
        merged["properties"].update(m.get("properties", {}))
        merged["required"] += m.get("required", [])
    merged["properties"].update(s.get("properties", {}))
    merged["required"] += s.get("required", [])
    return merged


def props_table(s):
    if isinstance(s, dict) and "$ref" in s:
        return []  # documented in the Schemas section
    flat = flatten(s)
    props = flat.get("properties")
    if not props:
        return []
    req = set(flat.get("required", []))
    rows = ["| Name | Type | Required | Description |", "| --- | --- | --- | --- |"]
    for name, p in props.items():
        rows.append("| %s | %s | %s | %s |" % (
            code(name), cell(type_str(p)), "yes" if name in req else "no", cell(describe(p))))
    return rows + [""]


def render_op(path, method, op, shared_params):
    out = ["### %s" % (op.get("summary") or op.get("operationId") or "%s %s" % (method.upper(), path)), ""]
    out += ["%s %s" % (code(method.upper()), code(path)), ""]
    if op.get("deprecated"):
        out += ["**Deprecated.**", ""]
    if op.get("description"):
        out += [op["description"].strip(), ""]
    if op.get("security"):
        ignored.add("security requirements")
    if op.get("callbacks"):
        ignored.add("callbacks")

    params = {}
    for p in shared_params + op.get("parameters", []):
        p = resolve(p)
        params[(p["name"], p["in"])] = p
    if params:
        out += ["**Parameters**", "", "| Name | In | Type | Required | Description |", "| --- | --- | --- | --- | --- |"]
        for p in params.values():
            required = p.get("required") or p["in"] == "path"
            schema = p.get("schema", {})
            desc = p.get("description") or (schema.get("description", "") if isinstance(schema, dict) else "")
            desc = " ".join(x for x in (desc, default_text(schema)) if x)
            out.append("| %s | %s | %s | %s | %s |" % (
                code(p["name"]), p["in"], cell(type_str(schema)), "yes" if required else "no", cell(desc)))
        out.append("")

    body = resolve(op.get("requestBody"))
    if body:
        out += ["**Request body**%s" % (" (required)" if body.get("required") else ""), ""]
        if body.get("description"):
            out += [body["description"].strip(), ""]
        for ct, media in body.get("content", {}).items():
            schema = media.get("schema", {})
            out += ["Content type: %s, %s" % (code(ct), type_str(schema)), ""]
            out += props_table(schema)

    responses = op.get("responses", {})
    if responses:
        out += ["**Responses**", "", "| Status | Description | Content |", "| --- | --- | --- |"]
        extra = []
        for status, r in responses.items():
            r = resolve(r)
            content = r.get("content", {})
            shown = "; ".join("%s: %s" % (code(ct), type_str(m.get("schema", {}))) for ct, m in content.items())
            out.append("| %s | %s | %s |" % (code(status), cell(r.get("description", "")), cell(shown) or "-"))
            for ct, m in content.items():
                table = props_table(m.get("schema", {}))
                if table:
                    extra += ["Response %s, %s:" % (code(status), code(ct)), ""] + table
        out.append("")
        out += extra
    return out


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
        lines += render_op(path, method, op, shared)

if schemas:
    lines += ["## Schemas", ""]
    for name, s in schemas.items():
        lines += ["### %s {#schema-%s}" % (name, slug(name)), ""]
        if s.get("description"):
            lines += [s["description"].strip(), ""]
        table = props_table(s)
        lines += table if table else ["Type: %s" % type_str(s), ""]

out = Path(OUT)
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text("\n".join(lines).rstrip("\n") + "\n", encoding="utf-8")
print("Written %s (%d operations, %d schemas)" % (OUT, sum(len(v) for v in groups.values()), len(schemas)))
if ignored:
    print("Warning: not rendered: %s" % ", ".join(sorted(ignored)), file=sys.stderr)

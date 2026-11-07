#!/usr/bin/env python3
"""Copy CODE_OF_CONDUCT.md and CONTRIBUTING.md into docs/content for Hugo.

The level-1 heading of each file is removed (Hugo renders the page title from
the front matter). If the source file has no Hugo front matter, one is
generated from the heading; if it already has it (CONTRIBUTING.md carries it
right below the heading), it is kept.

Usage, from the repository root: python3 docs/scripts/sync_community_docs.py
No third-party dependencies.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# (source, destination, URL of the old Docusaurus page, kept as an alias)
FILES = [
    ("CODE_OF_CONDUCT.md", "docs/content/code-of-conduct.md", "/docs/code-of-conduct/"),
    ("CONTRIBUTING.md", "docs/content/contributing.md", "/docs/contributing/"),
]

FRONT_MATTER = re.compile(r"\A---[ \t]*\n.*?\n---[ \t]*(?:\n|\Z)", re.S)
H1 = re.compile(r"\A\s*#[ \t]+(.+?)[ \t]*(?:\n|\Z)(?:[ \t]*\n)?")


def split_front_matter(text):
    m = FRONT_MATTER.match(text)
    return (m.group(0), text[m.end():]) if m else (None, text)


def convert(text, alias):
    text = text.replace("\r\n", "\n").lstrip("\ufeff")
    front, text = split_front_matter(text)

    title = None
    m = H1.match(text)
    if m:
        title, text = m.group(1).strip(), text[m.end():]

    if front is None:  # CONTRIBUTING.md: front matter right after the heading
        front, text = split_front_matter(text.lstrip("\n"))
    if front is None:
        if title is None:
            raise ValueError("no level-1 heading and no front matter")
        front = "---\ntitle: %s\naliases:\n  - %s\n---\n" % (json.dumps(title, ensure_ascii=False), alias)

    return front.rstrip("\n") + "\n\n" + text.lstrip("\n")


def main():
    for src, dst, alias in FILES:
        src_path, dst_path = ROOT / src, ROOT / dst
        try:
            result = convert(src_path.read_text(encoding="utf-8"), alias)
        except (OSError, ValueError) as err:
            sys.exit("%s: %s" % (src, err))
        old = dst_path.read_text(encoding="utf-8") if dst_path.exists() else None
        if result == old:
            print("Unchanged %s" % dst)
            continue
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        dst_path.write_text(result, encoding="utf-8", newline="\n")
        print("Written %s" % dst)


if __name__ == "__main__":
    main()

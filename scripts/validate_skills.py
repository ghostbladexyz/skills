#!/usr/bin/env python3
"""Validate the repository's skill files and README links."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILLS_ROOT = ROOT / "skills"
README_PATH = ROOT / "README.md"
SKILL_LINK_PATTERN = re.compile(r"\]\(([^)]+/SKILL\.md)\)")


def discover_skill_files(skills_root: Path) -> list[Path]:
    """discover_skill_files returns every skill file under the repository skill directory."""
    return sorted(
        skill_file
        for directory in skills_root.iterdir()
        if directory.is_dir() and not directory.name.startswith(".")
        for skill_file in [directory / "SKILL.md"]
        if skill_file.is_file()
    )


def read_frontmatter(skill_file: Path) -> dict[str, str]:
    """read_frontmatter extracts the required metadata from one skill file."""
    lines = skill_file.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError("must start with YAML frontmatter")

    try:
        closing_index = lines.index("---", 1)
    except ValueError as error:
        raise ValueError("must close its YAML frontmatter") from error

    metadata: dict[str, str] = {}
    for line in lines[1:closing_index]:
        key, separator, value = line.partition(":")
        if separator and key.strip() in {"name", "description"}:
            metadata[key.strip()] = value.strip().strip('"\'')
    return metadata


def validate_skills(root: Path, skills_root: Path, readme_path: Path) -> list[str]:
    """validate_skills checks metadata, duplicate names, and README skill links."""
    errors: list[str] = []
    if not skills_root.is_dir():
        return ["skills/: directory not found"]

    skill_files = discover_skill_files(skills_root)
    if not skill_files:
        errors.append("no skills/*/SKILL.md files found")

    names: dict[str, Path] = {}
    for skill_file in skill_files:
        try:
            metadata = read_frontmatter(skill_file)
        except (OSError, ValueError) as error:
            errors.append(f"{skill_file.relative_to(root)}: {error}")
            continue

        for required_key in ("name", "description"):
            if not metadata.get(required_key):
                errors.append(f"{skill_file.relative_to(root)}: missing {required_key} frontmatter")

        skill_name = metadata.get("name")
        if skill_name:
            previous_file = names.get(skill_name)
            if previous_file:
                errors.append(
                    f"duplicate skill name {skill_name!r}: "
                    f"{previous_file.relative_to(root)} and {skill_file.relative_to(root)}"
                )
            names[skill_name] = skill_file

    try:
        readme = readme_path.read_text(encoding="utf-8")
    except OSError as error:
        return [f"{readme_path.relative_to(root)}: {error}"]

    linked_paths = set(SKILL_LINK_PATTERN.findall(readme))
    actual_paths = {skill_file.relative_to(root).as_posix() for skill_file in skill_files}
    for linked_path in linked_paths - actual_paths:
        errors.append(f"README.md links to missing skill file: {linked_path}")
    for actual_path in actual_paths - linked_paths:
        errors.append(f"README.md does not link to skill file: {actual_path}")
    return errors


def main() -> int:
    """main validates the repository and returns a process status for CI or local use."""
    errors = validate_skills(ROOT, SKILLS_ROOT, README_PATH)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print("Skill validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

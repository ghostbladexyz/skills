# Agent Instructions

This repository stores reusable skill instructions for coding agents.

## Repository rules

- Keep one skill per top-level directory, with its instructions in `SKILL.md`.
- Treat each skill's frontmatter and body as the authority for that skill's behavior.
- Update `README.md` when the available skills or installation instructions change.
- Keep contributor workflow in `CONTRIBUTING.md`; do not duplicate it here.
- Run `python scripts/validate_skills.py` after changing skills or README links.
- Keep instructions portable: do not encode local paths, credentials, or machine-specific assumptions.

## Adding a skill

1. Create a directory with a `SKILL.md` file.
2. Add valid `name` and `description` frontmatter.
3. Add the skill to the README's included-skills list.
4. Run the validator and review the full diff.

# Agent Skills

Reusable skill instructions for coding agents.

## Included skills

- [`skills/comments/SKILL.md`](skills/comments/SKILL.md) — guidelines for useful code comments and function documentation.
- [`skills/commit-messages/SKILL.md`](skills/commit-messages/SKILL.md) — conventions for writing commit messages.
- [`skills/contributing/SKILL.md`](skills/contributing/SKILL.md) — guidelines for creating contribution documentation.
- [`skills/frontend-design/SKILL.md`](skills/frontend-design/SKILL.md) — design guidance for distinctive, intentional user interfaces ([license](skills/frontend-design/LICENSE.txt)).
- [`skills/generate-book/SKILL.md`](skills/generate-book/SKILL.md) — creates project-specific HTML learning books grounded in code and history.

## Use these skills with an agent

1. Clone or copy this repository into a location available to the agent.
2. Configure the agent's skill loader to discover the `skills/` directory, or copy the skill directories inside it into the agent's local skills directory.
3. Load `skills/comments/SKILL.md` when generating or refactoring code, `skills/commit-messages/SKILL.md` when creating or reviewing commit messages, `skills/contributing/SKILL.md` when creating contribution guidelines, `skills/frontend-design/SKILL.md` when designing or reshaping user interfaces, and `skills/generate-book/SKILL.md` when creating a learning book about a software project.

### Install with the skills CLI

If your agent supports the skills CLI, install the skills directly into a project:

```bash
npx skills@latest add ghostbladexyz/skills
```

Choose the skills and target agents when prompted.

Each skill is self-contained. Keep the directory name and the `SKILL.md` filename unchanged so loaders that expect the standard skill layout can find them.

The checked-in files are the source of truth. When a skill changes, refresh any copies used by agents and review the file's history for the current guidance.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for repository changes and [`AGENTS.md`](AGENTS.md) for agent maintenance rules.

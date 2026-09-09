# Agent Skills

Reusable skill instructions for coding agents.

## Included skills

- [`comments/SKILL.md`](comments/SKILL.md) — guidelines for useful code comments and function documentation.
- [`commit-messages/SKILL.md`](commit-messages/SKILL.md) — conventions for writing commit messages.

## Use these skills with an agent

1. Clone or copy this repository into a location available to the agent.
2. Configure the agent's skill loader to discover the `comments` and `commit-messages` directories, or copy those directories into the agent's local skills directory.
3. Load `comments/SKILL.md` when generating or refactoring code, and load `commit-messages/SKILL.md` when creating or reviewing commit messages.

### Install with the skills CLI

If your agent supports the skills CLI, install the skills directly into a project:

```bash
npx skills@latest add ghostbladexyz/skills
```

Choose the skills and target agents when prompted.

Each skill is self-contained. Keep the directory name and the `SKILL.md` filename unchanged so loaders that expect the standard skill layout can find them.

The checked-in files are the source of truth. When a skill changes, refresh any copies used by agents and review the file's history for the current guidance.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for repository changes and [`AGENTS.md`](AGENTS.md) for agent maintenance rules.

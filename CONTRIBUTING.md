# Contributing to Agent Skills

Thank you for your interest in contributing to Agent Skills! This repository contains reusable instructions for coding agents.

## Getting Started

1. Fork the repository.
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/skills.git
   cd skills
   ```

3. Create a feature branch:

   ```bash
   git switch -c feature/your-feature-name
   ```

## Development Requirements

- Git
- Python 3.11 or higher for the repository validator
- No third-party dependencies are required

## Code Standards

- Keep each skill in its own directory with a `SKILL.md` file.
- Give every skill valid `name` and `description` frontmatter.
- Update `README.md` when adding or removing a skill.
- Keep skill instructions focused, actionable, and independent of this repository's local machine.
- Follow the commit message conventions in [`commit-messages/SKILL.md`](commit-messages/SKILL.md).

## Testing

Run the repository validator before opening a pull request:

```bash
python scripts/validate_skills.py
```

Also check for whitespace errors:

```bash
git diff --check
```

## Building

There is no build step. The repository is consumed as a collection of Markdown skill files.

## Submitting Changes

1. Run the validation commands above.
2. Review the complete diff and confirm README links are current.
3. Push your branch to your fork.
4. Open a pull request against `main` with a clear description of the change.

## Project Structure

- `comments/SKILL.md` — code commenting and function documentation guidance.
- `commit-messages/SKILL.md` — commit message conventions.
- `scripts/validate_skills.py` — dependency-free skill and README validator.
- `.github/workflows/validate.yml` — automated validation for pushes and pull requests.
- `README.md` — installation and user-facing usage guidance.
- `AGENTS.md` — instructions for agents maintaining this repository.

## Code Review

All submissions go through code review. Reviewers will check that the validator passes, skill metadata is valid, README links are current, and the change stays focused on reusable agent guidance.

## Questions?

Open an issue in the [repository issue tracker](https://github.com/ghostbladexyz/skills/issues) for questions or discussion.

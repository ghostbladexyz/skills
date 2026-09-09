---

name: commit-messages

description: Generate commit messages following our team's conventions. Use when creating commits or when the user asks for help with commit messages.

---

# Commit Message Format

Format: `type(scope): description` when the change has a specific path scope, otherwise `type: description`.

## Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | minor |
| `fix` | Bug fix | patch |
| `docs` | Documentation only | - |
| `style` | Formatting, whitespace (no code change) | - |
| `refactor` | Code change that neither fixes nor adds | - |
| `perf` | Performance improvement | patch |
| `test` | Adding or updating tests | - |
| `build` | Build system or dependencies | - |
| `ci` | CI/CD configuration | - |
| `chore` | Maintenance tasks | - |
| `revert` | Reverting a previous commit | patch |

## Scope

The scope should be the **full file path** from the project root to provide precise context:

- Single file change: Use the file path (e.g., `bot/services/discovery.ts`)
- Multiple files in same directory: Use the directory path (e.g., `bot/services`)
- Multiple files across directories: Use the common parent or most significant component
- Repository-wide changes across unrelated top-level paths: Omit the scope and parentheses (e.g., `docs: refresh project documentation`)

Never use `.`, `root`, `repo`, or another placeholder scope to represent the repository as a whole.

## Breaking Changes

Add an exclamation mark after type and optional scope for breaking changes:
- `feat!: remove deprecated API` - major bump, no scope
- `feat(bot/api/client.ts)!: remove deprecated API` - major bump with scope
- `fix(bot/types)!: change return type` - major bump

Or use footer:
```
feat(bot/services/auth.ts): change authentication flow

BREAKING CHANGE: JWT tokens now expire after 1 hour
```

## Examples

```
feat(bot/services/discovery.ts): add reward eligibility filter
fix(bot/strategies/spread.ts): handle empty orderbook gracefully
perf(bot/db): add index for position lookups
feat(bot/config/schema.ts)!: drop support for legacy config format
chore(bot/package.json): update lodash to 4.17.21
docs(bot/README.md): add orderbook_position mode documentation
refactor(mcp/main.py): restructure cache handling
ci: verify supported toolchains
docs: refresh repository-wide documentation
revert: feat(bot/services): add cascade prevention
```

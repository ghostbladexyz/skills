---

name: contributing

description: Create a CONTRIBUTING.md file for open source projects. Use when setting up a new project or when the user asks to create contribution guidelines.

---

# Create CONTRIBUTING.md

Generate a CONTRIBUTING.md file following a consistent format for open source projects.

## Before Creating

1. Check the project's README.md for:
   - Project name
   - Language/runtime version
   - Build/test commands (Makefile or direct commands)
   - GitHub repository URL

2. Check project structure to document key files

## Template

Create CONTRIBUTING.md with this structure:

```markdown
# Contributing to {PROJECT_NAME}

Thank you for your interest in contributing to {PROJECT_NAME}! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/{REPO_NAME}.git
   cd {REPO_NAME}
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Requirements

- {LANGUAGE} {VERSION} or higher
- {ANY_OTHER_REQUIREMENTS}

## Code Standards

- Follow {LANGUAGE} conventions and run `{FORMAT_COMMAND}` before committing
- Write tests for new features
- Keep code simple and readable

## Testing

Run tests using the Makefile:

```bash
make test          # Run all tests
```

Or directly with {LANGUAGE}:

```bash
{TEST_COMMANDS}
```

## Building

```bash
{BUILD_COMMANDS}
```

## Submitting Changes

1. Ensure all tests pass
2. Write clear, descriptive commit messages following [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `test:` for test changes
   - `chore:` for maintenance tasks
3. Push to your fork
4. Open a Pull Request against `main`

## Project Structure

When contributing, understand the architecture:

{LIST_KEY_FILES_WITH_DESCRIPTIONS}

## Code Review

All submissions go through code review. Requirements:

- All tests must pass
- Code follows {LANGUAGE} best practices
- Documentation is updated where applicable

## Questions?

Open an issue in the [issue tracker](https://github.com/{OWNER}/{REPO_NAME}/issues) for questions or discussion.
```

## Placeholders to Replace

| Placeholder | Source |
|-------------|--------|
| `{PROJECT_NAME}` | README title or repo name |
| `{REPO_NAME}` | Repository name from git remote |
| `{OWNER}` | GitHub username/org from git remote |
| `{LANGUAGE}` | Primary language (Go, Python, Node.js, etc.) |
| `{VERSION}` | Language version from README or config files |
| `{FORMAT_COMMAND}` | `go fmt`, `npm run format`, `black .`, etc. |
| `{TEST_COMMANDS}` | Test commands with common flags |
| `{BUILD_COMMANDS}` | Build commands from Makefile or package.json |
| `{LIST_KEY_FILES_WITH_DESCRIPTIONS}` | Key source files with one-line descriptions |
| `{ANY_OTHER_REQUIREMENTS}` | Dependencies, tools, or constraints |

## Language-Specific Examples

### Go
```markdown
## Development Requirements

- Go 1.21 or higher
- Standard library only (no external dependencies)

## Testing

```bash
go test -v ./...              # Verbose test output
go test -cover ./...          # Test with coverage
go test -run TestName ./...   # Run specific test
```
```

### Node.js
```markdown
## Development Requirements

- Node.js 20 or higher
- Run `npm install` to install dependencies

## Testing

```bash
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```
```

### Python
```markdown
## Development Requirements

- Python 3.11 or higher
- Run `pip install -r requirements.txt` for dependencies

## Testing

```bash
pytest                  # Run all tests
pytest -v               # Verbose output
pytest --cov=src        # With coverage
```
```

## After Creating

1. Verify all placeholders are replaced
2. Ensure GitHub URLs are correct
3. Test that documented commands actually work

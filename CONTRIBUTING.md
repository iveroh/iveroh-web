# Contributing

## Commit Types

| Type         | Description                                              |
| ------------ | -------------------------------------------------------- |
| **feat**     | Adding a new feature or functionality                    |
| **fix**      | Fixing a bug or incorrect behavior                       |
| **add**      | Adding new files, examples, or resources                 |
| **refactor** | Improving code structure without changing functionality  |
| **docs**     | Updating documentation, comments, or README files        |
| **test**     | Adding or modifying tests                                |
| **chore**    | Routine tasks (e.g., updating `.gitignore`, cleaning up) |

## Commit Format

```
<type>[optional scope]: <title>

[description]

Issue:
Co-authored-by:
```

Example:
```
feat[api]: add user authentication

Adds JWT-based auth to the Elysia backend.

Issue: #12
```

## Branches

Use short descriptive branch names prefixed with the commit type:

```
feat/user-auth
fix/api-proxy
docs/update-readme
```

## Before Pushing

Make sure CI will pass locally:

```bash
bun run typecheck
bun run lint
bun run format:check
bun run build
```

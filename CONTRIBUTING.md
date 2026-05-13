# Contributing

## Development

- Keep Azure keys and endpoints out of frontend files.
- Keep service-specific logic inside `backend/services/`.
- Use deterministic mock responses unless real Azure integration is intentionally added.
- Run Python syntax checks before committing:

```bash
python3 -m py_compile backend/app.py backend/services/*.py
```

## Pull Requests

Include a short description of:

- What changed
- How it was tested
- Any Azure configuration or API contract changes

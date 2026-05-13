# WanderAI

WanderAI is a full-stack AI-powered luxury travel website built with a plain HTML/CSS/JavaScript frontend and a Python Flask backend. The backend uses Azure-shaped service modules with placeholder configuration, so the app runs locally with polished mock AI responses and can later be wired to real Azure AI services.

## Features

- Cinematic luxury travel SPA with dark navy and gold editorial styling
- Debounced AI destination search with animated suggestions
- Filterable destination cards
- Floating AI chatbot drawer
- AI itinerary planner with staggered day-by-day reveal
- Sentiment-aware travel review cards
- Multilingual blog translation toggle
- Drag-and-drop photo upload with AI-style caption and tags
- Toast notifications, skeleton loading states, smooth responsive UI

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask, Flask-CORS
- AI service structure: Azure AI Language, Azure AI Search, Azure Translator, Azure Vision, Azure OpenAI

## Project Structure

```text
.
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   └── services/
│       ├── bot.py
│       ├── language.py
│       ├── openai_service.py
│       ├── search.py
│       ├── translator.py
│       └── vision.py
└── frontend/
    ├── index.html
    ├── main.js
    └── style.css
```

## Local Setup

1. Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Run the Flask backend:

```bash
python backend/app.py
```

4. Open the app:

```text
http://localhost:5000
```

If port `5000` is already in use on macOS, check whether AirPlay Receiver is using it or change the port in `backend/app.py`.

## API Overview

- `POST /api/chat`
- `GET /api/search?q=`
- `POST /api/sentiment`
- `POST /api/entities`
- `POST /api/translate`
- `POST /api/vision`
- `POST /api/itinerary`
- `GET /api/destinations`

## Azure Configuration

All Azure placeholders live in `backend/config.py`. Do not put credentials in frontend files.

The current version is Azure-ready but mock-backed. Replace the placeholder values in `backend/config.py` and update the service modules when connecting real Azure resources.

## GitHub Notes

- Generated Python cache files and local environments are ignored by `.gitignore`.
- No real API keys or secrets are included.
- The frontend is served by Flask from the `frontend/` directory.

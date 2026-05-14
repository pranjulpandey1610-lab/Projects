# WanderAI

WanderAI is a full-stack AI-powered luxury travel website that helps travelers explore destinations, generate itinerary ideas, analyze reviews, translate travel stories, and create AI-style captions for uploaded photos.

The project is built with a plain HTML/CSS/JavaScript frontend and a Python Flask backend. The backend uses Azure-shaped service modules with placeholder configuration, so the app runs locally with polished mock AI responses and can later be connected to real Azure AI services.

## Live Website

Website link: _Add your deployed website URL here_

Example:

```text
https://your-wanderai-website-link.com
```

## Features

- Cinematic luxury travel single-page app with editorial styling
- Debounced AI destination search with animated suggestions
- Filterable destination cards for browsing curated travel ideas
- Floating AI chatbot drawer for travel questions and concierge-style prompts
- AI itinerary planner with staggered day-by-day reveal
- Sentiment-aware travel review cards
- Multilingual blog translation toggle
- Drag-and-drop photo upload with AI-style caption and tags
- Toast notifications, skeleton loading states, and smooth responsive UI
- Flask API layer that separates frontend behavior from backend service logic

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask, Flask-CORS
- AI service structure: Azure AI Language, Azure AI Search, Azure Translator, Azure Vision, Azure OpenAI

## Project Structure

```text
.
├── README.md
├── GITHUB_ABOUT.md
├── LICENSE
├── CONTRIBUTING.md
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

## How It Works

The Flask app serves the frontend from the `frontend/` directory and exposes API routes under `/api`. Each route delegates to a focused service module in `backend/services/`, keeping chat, search, translation, sentiment, vision, and itinerary behavior isolated.

The current implementation uses local mock responses so the project can be reviewed and demoed without cloud credentials. The same structure can be extended by replacing the service logic with real Azure AI SDK calls or REST API integrations.

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

## Environment Notes

The app does not require real Azure credentials for the current mock-backed version. When moving to production services, add environment-based configuration and avoid committing secrets to the repository.

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

## Future Improvements

- Connect the service modules to real Azure AI resources
- Add user authentication and saved itineraries
- Store destinations, reviews, and journal content in a database
- Add deployment configuration for Azure App Service or another hosting provider
- Add automated tests for API routes and service modules

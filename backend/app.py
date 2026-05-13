import os

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from services.bot import respond_to_chat
from services.language import analyze_sentiment, extract_entities
from services.openai_service import generate_itinerary
from services.search import get_destinations, suggest_destinations
from services.translator import translate_text
from services.vision import analyze_image


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend"))

app = Flask(__name__, static_folder=None)
CORS(app)


@app.get("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.get("/<path:path>")
def static_proxy(path):
    if path.startswith("api/"):
        return jsonify({"error": "Not found"}), 404
    target = os.path.join(FRONTEND_DIR, path)
    if os.path.exists(target):
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.get("/api/search")
def search():
    query = request.args.get("q", "")
    return jsonify({"suggestions": suggest_destinations(query)})


@app.get("/api/destinations")
def destinations():
    return jsonify({"destinations": get_destinations()})


@app.post("/api/chat")
def chat():
    payload = _json_payload()
    return jsonify(respond_to_chat(payload.get("message", ""), payload.get("history", [])))


@app.post("/api/sentiment")
def sentiment():
    payload = _json_payload()
    return jsonify(analyze_sentiment(payload))


@app.post("/api/entities")
def entities():
    payload = _json_payload()
    return jsonify(extract_entities(payload.get("text", "")))


@app.post("/api/translate")
def translate():
    payload = _json_payload()
    return jsonify(translate_text(payload.get("text", ""), payload.get("targetLanguage", "en")))


@app.post("/api/vision")
def vision():
    payload = _json_payload()
    return jsonify(analyze_image(payload.get("imageData", "")))


@app.post("/api/itinerary")
def itinerary():
    payload = _json_payload()
    return jsonify(generate_itinerary(payload))


@app.errorhandler(404)
def not_found(_error):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(_error):
    return jsonify({"error": "WanderAI could not complete that request."}), 500


def _json_payload():
    return request.get_json(silent=True) or {}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

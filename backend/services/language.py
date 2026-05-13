import re

from config import AZURE_LANGUAGE_ENDPOINT, AZURE_LANGUAGE_KEY


POSITIVE_TERMS = {
    "beautiful",
    "excellent",
    "amazing",
    "luxury",
    "perfect",
    "memorable",
    "seamless",
    "stunning",
    "calm",
    "wonderful",
    "loved",
}

NEGATIVE_TERMS = {
    "late",
    "delayed",
    "poor",
    "noisy",
    "bad",
    "crowded",
    "expensive",
    "cold",
    "missed",
    "rushed",
    "disappointed",
}

KNOWN_PLACES = [
    "Amalfi",
    "Bali",
    "Kyoto",
    "Santorini",
    "Marrakech",
    "Patagonia",
    "Paris",
    "Tokyo",
    "Rome",
    "Jaipur",
]


def analyze_sentiment(payload):
    _ = (AZURE_LANGUAGE_ENDPOINT, AZURE_LANGUAGE_KEY)
    reviews = payload.get("reviews")
    if not reviews:
        text = payload.get("text", "")
        reviews = [{"author": "Guest", "text": text}]

    return {"reviews": [_score_review(review) for review in reviews if review.get("text", "").strip()]}


def extract_entities(text):
    _ = (AZURE_LANGUAGE_ENDPOINT, AZURE_LANGUAGE_KEY)
    content = text or ""
    places = [place for place in KNOWN_PLACES if re.search(rf"\b{re.escape(place)}\b", content, re.IGNORECASE)]
    date_matches = re.findall(
        r"\b(?:\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*|"
        r"(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{1,2}|"
        r"\d{4}-\d{2}-\d{2}|next\s(?:week|month|summer|winter|spring|fall))\b",
        content,
        re.IGNORECASE,
    )

    return {
        "entities": [
            *[{"text": place, "category": "Location", "confidenceScore": 0.92} for place in places],
            *[{"text": date, "category": "DateTime", "confidenceScore": 0.87} for date in date_matches],
        ]
    }


def _score_review(review):
    text = review.get("text", "")
    tokens = set(re.findall(r"[a-z]+", text.lower()))
    positive_hits = len(tokens & POSITIVE_TERMS)
    negative_hits = len(tokens & NEGATIVE_TERMS)

    if positive_hits > negative_hits:
        sentiment = "positive"
        positive = min(0.98, 0.72 + positive_hits * 0.06)
        negative = max(0.01, 0.12 - negative_hits * 0.02)
    elif negative_hits > positive_hits:
        sentiment = "negative"
        negative = min(0.96, 0.7 + negative_hits * 0.07)
        positive = max(0.02, 0.16 - positive_hits * 0.02)
    else:
        sentiment = "neutral"
        positive = 0.28
        negative = 0.19

    neutral = max(0.01, round(1 - positive - negative, 2))
    return {
        "author": review.get("author", "Traveler"),
        "text": text,
        "sentiment": sentiment,
        "confidenceScores": {
            "positive": round(positive, 2),
            "neutral": round(neutral, 2),
            "negative": round(negative, 2),
        },
    }

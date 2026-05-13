from config import (
    AZURE_OPENAI_API_VERSION,
    AZURE_OPENAI_DEPLOYMENT_NAME,
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_KEY,
)


def generate_itinerary(payload):
    _ = (AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, AZURE_OPENAI_DEPLOYMENT_NAME, AZURE_OPENAI_API_VERSION)
    destination = (payload.get("destination") or "Amalfi Coast").strip()
    days = _safe_days(payload.get("days"))
    budget = payload.get("budget") or "premium"
    style = payload.get("style") or payload.get("travelStyle") or "culture and slow luxury"

    itinerary_days = []
    for index in range(1, days + 1):
        itinerary_days.append(
            {
                "day": index,
                "title": _day_title(index, destination, style),
                "morning": f"Begin with a private, unhurried introduction to {destination}, tuned for {style}.",
                "afternoon": f"Reserve the afternoon for a curated {budget} experience with a local specialist.",
                "evening": f"Close day {index} with a golden-hour table, a short walk, and a quiet nightcap.",
            }
        )

    return {
        "destination": destination,
        "budget": budget,
        "style": style,
        "days": itinerary_days,
    }


def travel_completion(message, history=None):
    _ = (AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, AZURE_OPENAI_DEPLOYMENT_NAME, AZURE_OPENAI_API_VERSION)
    text = (message or "").strip()
    lower = text.lower()
    history_count = len(history or [])

    if "budget" in lower:
        reply = "For a luxury trip, I would protect budget for location, private transfers, and one signature meal, then trim on midday dining and add-on tours."
    elif "honeymoon" in lower or "romantic" in lower:
        reply = "I would build this around slower mornings, view-led suites, private transfers, and one surprise dinner where the setting does most of the work."
    elif "itinerary" in lower or "days" in lower:
        reply = "Share destination, number of days, budget, and travel style. I can turn that into a day-by-day plan with a calm pace and strong anchors."
    else:
        reply = "I would start with season, pace, and the feeling you want from the trip, then shortlist destinations where the hotels and local rhythm support that mood."

    return {
        "reply": reply,
        "historyDepth": history_count,
        "suggestions": [
            "Design a 5-day itinerary",
            "Find coastal luxury escapes",
            "Compare Bali and Kyoto",
        ],
    }


def _safe_days(raw_days):
    try:
        days = int(raw_days)
    except (TypeError, ValueError):
        days = 5
    return min(max(days, 1), 14)


def _day_title(day, destination, style):
    titles = [
        "Arrival With A Sense Of Place",
        "Markets, Makers, And Hidden Rooms",
        "Water, Wellness, And Slow Afternoons",
        "Architecture, Art, And After-Dark Tables",
        "A Private Detour Beyond The Guidebooks",
    ]
    if day <= len(titles):
        return titles[day - 1]
    return f"Signature {style.title()} Day In {destination}"

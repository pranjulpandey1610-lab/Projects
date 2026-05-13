from config import AZURE_SEARCH_ENDPOINT, AZURE_SEARCH_INDEX_NAME, AZURE_SEARCH_KEY


DESTINATIONS = [
    {
        "id": "amalfi",
        "name": "Amalfi Coast",
        "country": "Italy",
        "location": "Europe",
        "price": 4200,
        "priceTier": "luxury",
        "rating": 4.9,
        "type": "Coastal escape",
        "image": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80",
        "summary": "Clifftop suites, lemon groves, private coves, and candlelit seafood terraces.",
    },
    {
        "id": "kyoto",
        "name": "Kyoto",
        "country": "Japan",
        "location": "Asia",
        "price": 3600,
        "priceTier": "premium",
        "rating": 4.8,
        "type": "Cultural retreat",
        "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
        "summary": "Temple gardens, ryokan rituals, kaiseki dining, and dawn walks through bamboo.",
    },
    {
        "id": "santorini",
        "name": "Santorini",
        "country": "Greece",
        "location": "Europe",
        "price": 3900,
        "priceTier": "luxury",
        "rating": 4.7,
        "type": "Island romance",
        "image": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
        "summary": "Caldera suites, private catamarans, volcanic wines, and blue-hour terraces.",
    },
    {
        "id": "marrakech",
        "name": "Marrakech",
        "country": "Morocco",
        "location": "Africa",
        "price": 2800,
        "priceTier": "premium",
        "rating": 4.6,
        "type": "Design-led city stay",
        "image": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=80",
        "summary": "Riad courtyards, souk ateliers, desert dinners, and hammam afternoons.",
    },
    {
        "id": "bali",
        "name": "Bali",
        "country": "Indonesia",
        "location": "Asia",
        "price": 2600,
        "priceTier": "value",
        "rating": 4.8,
        "type": "Wellness escape",
        "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
        "summary": "Jungle villas, sunrise yoga, surf coves, and chef-led Balinese tastings.",
    },
    {
        "id": "patagonia",
        "name": "Patagonia",
        "country": "Argentina & Chile",
        "location": "South America",
        "price": 5100,
        "priceTier": "luxury",
        "rating": 4.9,
        "type": "Expedition lodge",
        "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
        "summary": "Glacier hikes, fire-warmed lodges, private guides, and big-sky silence.",
    },
]


def get_destinations():
    return DESTINATIONS


def suggest_destinations(query):
    _ = (AZURE_SEARCH_ENDPOINT, AZURE_SEARCH_KEY, AZURE_SEARCH_INDEX_NAME)
    needle = (query or "").strip().lower()
    ranked = []

    for destination in DESTINATIONS:
        haystack = " ".join(
            [
                destination["name"],
                destination["country"],
                destination["location"],
                destination["type"],
                destination["summary"],
            ]
        ).lower()
        if not needle or needle in haystack:
            score = 0.96 if needle and needle in destination["name"].lower() else 0.82
            ranked.append(
                {
                    "name": destination["name"],
                    "country": destination["country"],
                    "location": destination["location"],
                    "type": destination["type"],
                    "score": score,
                    "image": destination["image"],
                }
            )

    return ranked[:6] if ranked else _fallback_suggestions(needle)


def _fallback_suggestions(query):
    readable = query.title() if query else "Hidden Coast"
    return [
        {
            "name": readable,
            "country": "Curated by WanderAI",
            "location": "Bespoke",
            "type": "Private itinerary concept",
            "score": 0.74,
            "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        }
    ]

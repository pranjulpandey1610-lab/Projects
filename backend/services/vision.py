from config import AZURE_VISION_ENDPOINT, AZURE_VISION_KEY


def analyze_image(image_data):
    _ = (AZURE_VISION_ENDPOINT, AZURE_VISION_KEY)
    size_hint = len(image_data or "")
    mood = "cinematic" if size_hint > 120000 else "editorial"

    return {
        "caption": f"A {mood} travel frame with refined light, strong sense of place, and magazine-ready composition.",
        "tags": ["travel", "luxury", "architecture", "golden-hour", "wanderai"],
        "metadata": {
            "received": bool(image_data),
            "analysisMode": "mock-azure-vision",
        },
    }

from config import AZURE_OPENAI_API_VERSION, AZURE_OPENAI_DEPLOYMENT_NAME, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY
from services.openai_service import travel_completion


def respond_to_chat(message, history=None):
    _ = (AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, AZURE_OPENAI_DEPLOYMENT_NAME, AZURE_OPENAI_API_VERSION)
    if not (message or "").strip():
        return {
            "reply": "Tell me where you are dreaming of going, when you want to travel, and the pace you prefer.",
            "suggestions": ["Plan a beach escape", "Find a cultural city", "Build a honeymoon"],
        }
    return travel_completion(message, history)

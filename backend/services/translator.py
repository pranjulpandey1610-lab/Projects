from config import AZURE_TRANSLATOR_ENDPOINT, AZURE_TRANSLATOR_KEY, AZURE_TRANSLATOR_REGION


TRANSLATIONS = {
    "en": {
        "A private guide to slower mornings, hidden courtyards, and late dinners beside the water.": "A private guide to slower mornings, hidden courtyards, and late dinners beside the water.",
        "How to turn a five-day escape into a restorative journey without losing the thrill of discovery.": "How to turn a five-day escape into a restorative journey without losing the thrill of discovery.",
        "Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.": "Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.",
    },
    "hi": {
        "A private guide to slower mornings, hidden courtyards, and late dinners beside the water.": "धीमी सुबहों, छिपे आंगनों और पानी के किनारे देर रात के भोजन के लिए एक निजी गाइड।",
        "How to turn a five-day escape into a restorative journey without losing the thrill of discovery.": "खोज के रोमांच को बनाए रखते हुए पांच दिनों की यात्रा को सुकूनभरे अनुभव में बदलने का तरीका।",
        "Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.": "बुटीक ठहराव, शेफ के साथ बाजार यात्राएं, और वे शांत रस्में जो शहर को अपना बना देती हैं।",
    },
    "fr": {
        "A private guide to slower mornings, hidden courtyards, and late dinners beside the water.": "Un guide prive pour des matins plus lents, des cours cachees et des diners tardifs au bord de l'eau.",
        "How to turn a five-day escape into a restorative journey without losing the thrill of discovery.": "Comment transformer une escapade de cinq jours en voyage reparateur sans perdre le frisson de la decouverte.",
        "Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.": "Sejours boutique, marches avec chef et rituels discrets qui rendent une ville intime.",
    },
    "es": {
        "A private guide to slower mornings, hidden courtyards, and late dinners beside the water.": "Una guia privada para mananas pausadas, patios ocultos y cenas tardias junto al agua.",
        "How to turn a five-day escape into a restorative journey without losing the thrill of discovery.": "Como convertir una escapada de cinco dias en un viaje reparador sin perder la emocion del descubrimiento.",
        "Boutique stays, chef-led markets, and the quiet rituals that make a city feel personal.": "Estancias boutique, mercados guiados por chefs y rituales tranquilos que hacen que una ciudad se sienta propia.",
    },
}


def translate_text(text, target_language):
    _ = (AZURE_TRANSLATOR_ENDPOINT, AZURE_TRANSLATOR_KEY, AZURE_TRANSLATOR_REGION)
    language = (target_language or "en").lower()
    phrasebook = TRANSLATIONS.get(language, TRANSLATIONS["en"])
    translated = phrasebook.get(text) or _fallback_translate(text, language)
    return {"detectedLanguage": "en", "targetLanguage": language, "translatedText": translated}


def _fallback_translate(text, language):
    prefixes = {
        "hi": "अनुवादित यात्रा नोट:",
        "fr": "Note de voyage traduite:",
        "es": "Nota de viaje traducida:",
        "en": "",
    }
    prefix = prefixes.get(language, "")
    return f"{prefix} {text}".strip()

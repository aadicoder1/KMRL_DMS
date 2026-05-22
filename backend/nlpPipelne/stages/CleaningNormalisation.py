import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from deep_translator import GoogleTranslator


def translate_to_english(text: str) -> str:
    """Translate input text to English."""
    if not text:
        return ""
    try:
        translated = GoogleTranslator(source="auto", target="en").translate(text)
        return translated
    except Exception as e:
        print(f"Translation failed: {e}, using original text")
        return text


def clean_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^\w\s.,!?;:()\-]", "", text, flags=re.UNICODE)
    text = text.lower()
    return text


async def clean_normalise(stage1_result: dict) -> dict:
    # Step 0: Translate to English first
    translated_text = translate_to_english(stage1_result["raw_text"])

    # Step 1: Clean
    cleaned = clean_text(translated_text)

    # Step 2: Sentence tokenization
    sentences = sent_tokenize(cleaned)

    # Step 3: Word tokenization
    words = word_tokenize(cleaned)

    stop_words = set(stopwords.words("english"))
    words = [w for w in words if w not in stop_words]

    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(w) if re.match(r"[a-zA-Z]", w) else w for w in words]

    words = [re.sub(r"\d+", "<NUM>", w) for w in words if re.match(r"[a-zA-Z0-9]", w)]

    stage1_result.update({
        "translated_text": translated_text,
        "cleaned_text": cleaned,
        "sentences": sentences,
        "words": words,
        "num_sentences": len(sentences),
        "num_words": len(words),
    })

    return stage1_result

import pandas as pd
import numpy as np
import string
import emoji
import re
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords


from fastapi.middleware.cors import CORSMiddleware  # 👈 Import this

app = FastAPI()

# 👈 Add this CORS configuration block right after app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change to your frontend URL later, e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)

stop_words = set(stopwords.words('english'))

def extract_features(text):

    # Cleaning
    text = re.sub(r'<.*?>', '', str(text))
    text = emoji.demojize(text)

    # Tokenization
    sentences = sent_tokenize(text)
    words = word_tokenize(text)

    # POS Tagging
    pos_tags = pos_tag(words)

    features = {}

    # Basic Features
    features['char_count'] = len(text)
    features['word_count'] = len(words)
    features['sentence_count'] = len(sentences)

    # Average Lengths
    features['avg_word_length'] = (
        np.mean([len(word) for word in words])
        if words else 0
    )

    features['avg_sentence_length'] = (
        len(words) / len(sentences)
        if len(sentences) > 0 else 0
    )

    # Lexical Richness
    features['unique_words'] = len(set(words))

    features['type_token_ratio'] = (
        len(set(words)) / len(words)
        if len(words) > 0 else 0
    )

    # Stopwords
    features['stopword_count'] = sum(
        1 for word in words
        if word.lower() in stop_words
    )

    # Punctuation
    features['punctuation_count'] = sum(
        1 for char in text
        if char in string.punctuation
    )

    # Uppercase
    features['uppercase_count'] = sum(
        1 for word in words
        if word.isupper()
    )

    # POS Counts
    pos_counts = {}

    for _, tag in pos_tags:
        pos_counts[tag] = pos_counts.get(tag, 0) + 1

    for tag, count in pos_counts.items():
        features[f'pos_{tag}'] = count

    return pd.DataFrame([features])




model = joblib.load("model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
scaler = joblib.load("scaler.pkl")
feature_columns = joblib.load("columns.pkl")

class Input(BaseModel):
    text: str

@app.post("/predict")
def predict(data: Input):

    features_df = extract_features(data.text)

    features_df = features_df.reindex(
        columns=feature_columns,
        fill_value=0
    )

    scaled = scaler.transform(features_df)

    pred = model.predict(scaled)

    author = label_encoder.inverse_transform(pred)

    return {
        "author": author[0]
    }

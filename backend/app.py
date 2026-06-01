import pandas as pd
import numpy as np
import string
import re
import joblib

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from nltk.tokenize import sent_tokenize, word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from scipy.sparse import csr_matrix, hstack
from collections import Counter



# =========================
# FASTAPI SETUP
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD MODELS
# =========================

#C:\Users\ilive\OneDrive\문서\Desktop\auth_pro\backend\pkl
model = joblib.load("../pipeline/nlp/model.pkl")
label_encoder = joblib.load("../pipeline/nlp/label_encoder.pkl")
scaler = joblib.load("../pipeline/nlp/scaler.pkl")
vectorizer = joblib.load("../pipeline/nlp/vectorizer.pkl")

# =========================
# STOPWORDS
# =========================

stop_words = set(stopwords.words('english'))

# =========================
# FEATURE EXTRACTION
# =========================

def extract_features(text):
    words = word_tokenize(text)
    sentences = sent_tokenize(text)
    
    if(len(words)==0): return {}

    tags = pos_tag(words)

    pos_counts = Counter(tag for _, tag in tags)

    features = {
        "char_count": len(text),
        "word_count": len(words),
        "sent_count": len(sentences),
        "avg_word_len" : sum(len(w) for w in words)/len(words),
        "avg_sentence_len" : sum(len(sen) for sen in sentences)/len(sentences),
        "unique_word_count" : len(set(words)),
        "type_token_ratio" : len(set(words)) / len(words),
        "noun_ratio" : pos_counts['NN']/len(tags),
        "verb_ratio":  pos_counts["VB"] / len(tags),
        "adj_ratio":   pos_counts["JJ"] / len(tags),
        "adv_ratio": pos_counts["RB"] / len(tags),
        'punctuation_count' : sum(1 for char in text if char in string.punctuation),
        'upper_case_count' :  sum(1 for word in words if word.isupper()),
    }

    for tag, count in pos_counts.items():
        features[f'pos_{tag}'] = count

###-------------------------------------------------------------------------------------

    features['stopword_count'] = sum(1 for word in words if word.lower() in stop_words)

    features['stopword_ratio'] = sum(1 for word in words if word.lower() in stop_words) / len(words) if len(words) > 0 else 0
    
    return pd.DataFrame([features])
    

# =========================
# REQUEST MODEL
# =========================

class Input(BaseModel):
    text: str

# =========================
# PREDICTION ROUTE
# =========================

@app.post("/predict")
def predict(data: Input):

    text = data.text

    # =====================
    # TF-IDF Features
    # =====================

    X_ngram = vectorizer.transform([text])

    # =====================
    # Stylometric Features
    # =====================

    style_df = extract_features(text)

    style_df = style_df.fillna(0)

    # IMPORTANT:
    # scaler was trained on specific columns
    # so preserve column order

    expected_columns = scaler.feature_names_in_

    style_df = style_df.reindex(
        columns=expected_columns,
        fill_value=0
    )

    # Scale
    X_style = scaler.transform(style_df)

    # Convert to sparse
    X_style_sparse = csr_matrix(X_style)

    # =====================
    # Combine Features
    # =====================

    X_final = hstack([X_ngram, X_style_sparse])

    # =====================
    # Prediction
    # =====================

    pred = model.predict(X_final)

    author = label_encoder.inverse_transform(pred)

    return {
        "author": author[0]
    }


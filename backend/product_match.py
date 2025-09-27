from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from database import database, new_product

# -----------------------------
# TF-IDF + Cosine Similarity
# -----------------------------

def compute_similarity(new_product, database):
    # Combine text fields into lists for TF-IDF
    db_titles = [p["title"] for p in database]
    db_descriptions = [p["description"] for p in database]
    db_ingredients = [p["ingredients"] for p in database]

    # Append new product’s text for vectorization
    titles_all = db_titles + [new_product["title"]]
    descriptions_all = db_descriptions + [new_product["description"]]
    ingredients_all = db_ingredients + [new_product["ingredients"]]

    vectorizer_title = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_title = vectorizer_title.fit_transform(titles_all)

    vectorizer_desc= TfidfVectorizer(ngram_range=(1,2))
    tfidf_desc= vectorizer_desc.fit_transform(descriptions_all)

    vectorizer_ing = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_ing = vectorizer_ing.fit_transform(ingredients_all)

    # Cosine similarity calculations
    sim_title = cosine_similarity(tfidf_title[-1], tfidf_title[:-1]).flatten()
    sim_desc = cosine_similarity(tfidf_desc[-1], tfidf_desc[:-1]).flatten()
    sim_ing = cosine_similarity(tfidf_ing[-1], tfidf_ing[:-1]).flatten()

    # Weighted similarity (prioritize ingredients more than title)
    text_similarity = 0.7 * sim_ing + 0.15 * sim_title + 0.15 * sim_desc

    return text_similarity

# Run similarity check
similarities = compute_similarity(new_product, database)
# Rank results
ranked_indices = np.argsort(similarities)[::-1]  # descending order
print("Top matches for:", new_product["title"])
for idx in ranked_indices:
    print(f"- {database[idx]['title']} (Score: {similarities[idx]:.3f})")

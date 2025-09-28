from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from database import database, new_product
from fragrance_match import compare_fragrance_lists

# -----------------------------
# TF-IDF + Cosine Similarity
# -----------------------------

def compute_text_similarity(new_product, database):
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

def compute_fragrance_similarity(new_product, database):
    scores= []
    for p in database: 
        score = compare_fragrance_lists(
            new_product.get("fragrance", []),
            p.get("fragrance", [])
        )
        scores.append(score)
    return np.array(scores)


def compute_final_similarity(new_product, database):
    text_sim = compute_text_similarity(new_product, database)
    fragrance_sim= compute_fragrance_similarity(new_product, database)

    final_sim = 0.5 * text_sim + 0.5 * fragrance_sim
    
    return final_sim


# Run similarity check
final_sim = compute_final_similarity(new_product, database)
# Rank results
ranked_indices = np.argsort(final_sim)[::-1]
print("Top matches for:", new_product["title"])
for idx in ranked_indices:
    p = database[idx]
    print(f"- {p['title']} | Price: ${p['price']:.2f} | Fragrance: {p['fragrance']} | Score: {final_sim[idx]:.3f}")

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from models import Product
# from database import database, new_product

# -----------------------------
# TF-IDF + Cosine Similarity
# -----------------------------

def compute_similarity(new_product: Product, database: list[Product]):
    database_dicts = [product.model_dump() for product in database]
    new_product_dict = new_product.model_dump()
    # Combine text fields into lists for TF-IDF
    db_titles = [p["title"] for p in database_dicts]
    db_descriptions = [p["description"] for p in database_dicts]
    db_ingredients = [p["ingredients"] for p in database_dicts]

    # Append new product’s text for vectorization
    titles_all = db_titles + [new_product_dict["title"]]
    descriptions_all = db_descriptions + [new_product_dict["description"]]
    ingredients_all = db_ingredients + [new_product_dict["ingredients"]]

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
    for i, score in enumerate(text_similarity):
        database_dicts[i]["similarity_score"] = score
    
    # Sort database by similarity score in descending order
    database_sorted = sorted(database_dicts, key=lambda x: x["similarity_score"], reverse=True)

    product_list = [Product(**product_dict) for product_dict in database_sorted]

    return product_list

# Run similarity check
# ranked_database = compute_similarity(new_product, database)
# print("Top matches for:", new_product["title"])
# for item in ranked_database:
#     print(f"- {item['title']} (Score: {item['similarity_score']:.3f})")

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
# from database import database, new_product
from fragrance_match import compare_fragrance_lists

from models import Product
from database_new import database, new_product


# -----------------------------
# TF-IDF + Cosine Similarity
# -----------------------------

def compute_similarity(original_product: Product, database: list[Product]):
    database_dicts = [product.model_dump() for product in database]
    original_product_dict = original_product.model_dump()

    # Combine text fields into lists for TF-IDF
    db_titles = [p["title"].lower() for p in database_dicts]
    db_descriptions = [p["description"].lower() for p in database_dicts]
    # Convert ingredients lists to strings, and then puts all strings into a list for TF-IDF
    db_ingredients = [" ".join(p["ingredients"]).lower() if isinstance(p["ingredients"], list) else str(p["ingredients"]).lower() for p in database_dicts]

    # Append the original product's text for vectorization
    titles_all = db_titles + [original_product_dict["title"].lower()]
    descriptions_all = db_descriptions + [original_product_dict["description"].lower()]
    # Convert original product ingredients to string
    original_ingredients = " ".join(original_product_dict["ingredients"]).lower() if isinstance(original_product_dict["ingredients"], list) else str(original_product_dict["ingredients"]).lower()
    ingredients_all = db_ingredients + [original_ingredients]

    vectorizer_title = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_title = vectorizer_title.fit_transform(titles_all)

    vectorizer_desc = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_desc = vectorizer_desc.fit_transform(descriptions_all)

    vectorizer_ing = TfidfVectorizer(ngram_range=(1, 2))
    tfidf_ing = vectorizer_ing.fit_transform(ingredients_all)

    # Cosine similarity calculations
    sim_title = cosine_similarity(tfidf_title[-1], tfidf_title[:-1]).flatten()
    sim_desc = cosine_similarity(tfidf_desc[-1], tfidf_desc[:-1]).flatten()
    sim_ing = cosine_similarity(tfidf_ing[-1], tfidf_ing[:-1]).flatten()

    # Weighted similarity (prioritize ingredients more than title and description)
    text_similarity = 0.7 * sim_ing + 0.15 * sim_title + 0.15 * sim_desc
    for i, score in enumerate(text_similarity):
        database_dicts[i]["similarity_score"] = float(score)
    
    # Sort database by similarity score in descending order
    database_sorted = sorted(database_dicts, key=lambda x: x["similarity_score"], reverse=True)

    # Convert back to Product objects
    # product_list = [Product(**product_dict) for product_dict in database_sorted]

    return np.array([product_dict["similarity_score"] for product_dict in database_dicts])

# def compute_fragrance_similarity(new_product, database):
#     scores= []
#     for p in database: 
#         score = compare_fragrance_lists(
#             new_product.get("fragrance", []),
#             p.get("fragrance", [])
#         )
#         scores.append(score)
#     return np.array(scores)
async def compute_fragrance_similarity(new_product, database):
    scores = []
    
    def get_field(obj, field, default=None):
        if isinstance(obj, dict):
            return obj.get(field, default)
        return getattr(obj, field, default)
    
    for p in database:
        user_fragrance = get_field(new_product, "fragrances", [])
        product_fragrance = get_field(p, "fragrances", [])
        
        # If compare_fragrance_lists is async, await it; otherwise it runs synchronously
        score = compare_fragrance_lists(user_fragrance, product_fragrance)
        scores.append(score)
    
    return np.array(scores)


async def compute_final_similarity(new_product: Product, database: list[Product]) -> list[Product]:
    text_sim = compute_similarity(new_product, database)
    fragrance_sim = await compute_fragrance_similarity(new_product, database)
    # text_sim = np.array(text_sim)
    # fragrance_sim = np.array(fragrance_sim)
    final_sim = 0.5 * text_sim + 0.5 * fragrance_sim
    
    # Create Product objects with final similarity scores
    products_with_scores = []
    for i, product in enumerate(database):
        # Create a copy of the product with the final similarity score
        product.similarity_score = float(final_sim[i])
        products_with_scores.append(product)
        # product_dict["similarity_score"] = float(final_sim[i])
        # products_with_scores.append(Product(**product_dict))
    
    # Sort by final similarity score (handle None values)
    products_with_scores.sort(key=lambda x: x.similarity_score or 0.0, reverse=True)
    
    return products_with_scores


# Example usage - commented out for now
# final_sim = compute_final_similarity(new_product, database)
# print("Top matches for:", new_product.title)
# for product in final_sim:
#     print(f"- {product.title} | Price: ${product.price:.2f} | Fragrance: {product.fragrances} | Score: {product.similarity_score:.3f}")
# if __name__ == "__main__":
#     ranked_database = compute_similarity(new_product, database)
#     print("Top matches for:", new_product.title)
#     for item in ranked_database:
#         print(f"- {item.title} (Score: {item.similarity_score:.3f})")

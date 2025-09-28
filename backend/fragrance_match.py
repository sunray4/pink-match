from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load the model once
model = SentenceTransformer("all-MiniLM-L6-v2")

def get_embedding(text):
    return model.encode(text)

# Compute centroid value (average)
def get_centroid_embedding(fragrance_list):
    embeddings = [get_embedding(note) for note in fragrance_list]
    return np.mean(embeddings, axis=0)

# Compare two lists of fragrances (user vs product) using centroid cosine similarity and return a similarity score between 0 and 1.
def compare_fragrance_lists(user_fragrances, product_fragrances):
    if not user_fragrances or not product_fragrances:
        return 0.0 

    user_centroid = get_centroid_embedding(user_fragrances)
    product_centroid = get_centroid_embedding(product_fragrances)

    score = cosine_similarity([user_centroid], [product_centroid])[0][0]
    return score

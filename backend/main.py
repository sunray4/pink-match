from fastapi import FastAPI

from product_match import compute_similarity
from scraper import scraper

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search")
async def search(query: str):
    # right now, the query should be a link
    max_results = 7
    products = scraper(query, max_results)
    if products is None:
        return {"error": "No products found or an error occurred."}
    ranked_products = compute_similarity(products[0], products[1:])

    filename = f"ranked_products.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"Ranked Products - {query}\n")
        f.write("=" * 50 + "\n\n")
        for product in ranked_products:
            f.write(f"Title: {product.title}\n")
            f.write(f"ASIN: {product.asin}\n")
            f.write(f"Description: {product.description}\n")
            f.write(f"Rating: {product.rating}\n")
            f.write(f"Price: {product.price}\n")
            f.write(f"Ingredients: {', '.join(product.ingredients)}\n")
            f.write(f"Volume (mL): {product.volume_ml}\n")
            f.write(f"Unit Price (per 100mL): {product.unit_price}\n")
            f.write(f"Fragrance: {product.fragrance}\n")
            f.write(f"Similarity Score: {product.similarity_score}\n")
            f.write("-" * 50 + "\n")

    # results should contain the list of similar items
    return {"query": query, "results": ranked_products}


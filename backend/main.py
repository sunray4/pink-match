from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from product_match import compute_final_similarity
from scraper import scraper

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js dev server ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# amazon link is just www.amazon.ca/dp/{asin}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search")
async def search(query: str):
    # right now, the query should be a link
    max_results = 40
    products = await scraper(query, max_results)
    print("Products fetched:", products)
    print("Number of products fetched:", len(products) if products else -1)
    if not products or len(products) == 0 or products[0] is None:
        print("No products found or an error occurred.")
        return {"error": "No products found or an error occurred."}
    ranked_products = await compute_final_similarity(products[0], products[1:])

    filename = f"ranked_products.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"Ranked Products - {query}\n")
        f.write("=" * 50 + "\n\n")
        for p in ranked_products:
            f.write(f"Title: {p.title}\n")
            f.write(f"ASIN: {p.asin}\n")
            f.write(f"Description: {p.description}\n")
            f.write(f"Rating: {p.rating}\n")
            f.write(f"Price: {p.price}\n")
            f.write(f"Ingredients: {p.ingredients if p.ingredients else 'N/A'}\n")
            f.write(f"Volume (mL): {p.volume_ml if p.volume_ml else 'N/A'}\n")
            f.write(f"Unit Price (per 100mL): {p.unit_price if p.unit_price else 'N/A'}\n")
            f.write(f"Fragrance: {p.fragrances if p.fragrances else 'N/A'}\n")
            f.write(f"Similarity Score: {p.similarity_score}\n")
            f.write("-" * 50 + "\n")

    # results should contain the list of similar items
    return {"query": query, "original_product": products[0], "results": ranked_products}


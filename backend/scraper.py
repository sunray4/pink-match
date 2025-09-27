# currently working on products that have ingredients list (e.g. shampoos, conditioners, body washes, skincare, etc.)
# later, work on products with materials list (e.g. clothes, shoes, razors, etc.)

# scrape_product('B0C9V8BVZ7')

import os
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

import json
from datetime import datetime

load_dotenv()

from llm_model import create_alternative_query, extract_volume_and_fragrance, clean_ingredients
from models import Product

OXYLABS_USERNAME = os.getenv("OXYLABS_USERNAME")
OXYLABS_PASSWORD = os.getenv("OXYLABS_PASSWORD")

def scraper(query: str, max_results: int) -> list[Product] | None:
    products: list[Product] = []

    # Write products to txt file
    filename = f"products.txt"
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"Scraping products - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 50 + "\n\n")

    original_product = scrape_original(query)
    if original_product is None:
        return None

    products.append(original_product)

    alternative_products = scrape_alternative_list(original_product, max_results)
    if alternative_products:
        products.extend(alternative_products)
    print(f"Found {len(products)-1} alternative products")
    
    
    return products

def scrape_product(asin: str) -> Product | None:
    # Structure payload.
    payload = {
        'source': 'amazon_product',
        'parse': True,
        'query': asin,
        'domain': 'ca',
        'geo_location': 'N2G1T9',
    }

    # Check credentials
    if OXYLABS_USERNAME is None or OXYLABS_PASSWORD is None:
        raise ValueError("Oxylabs credentials are not set in environment variables.")
    
    # Get response from Oxylabs.
    response = requests.request(
        'POST',
        'https://realtime.oxylabs.io/v1/queries',
        auth=(OXYLABS_USERNAME, OXYLABS_PASSWORD),
        json=payload,
    )

    if response.status_code != 200:
        print("Error:", response.status_code, response.text)
        return None

    response_json = response.json()

    if (
        response_json is None
        or "results" not in response_json
        or not response_json["results"]
        or "content" not in response_json["results"][0]
        or "important_information" not in response_json["results"][0]["content"]
        or response_json["results"][0]["content"]["important_information"] is None
    ):
        print("No response or no important information found")
        return None
    
    # get ingredients list:
    ingredients: str | None = None
    for section in response_json["results"][0]["content"]["important_information"]:
        if section["title"] == "Ingredients":
            ingredients = section["description"]
            break
    if not ingredients:
        print("No ingredients found")
        return None

    # clean up ingredients list
    ingredients_list = clean_ingredients(ingredients)

    print("Ingredients list:", ingredients_list)

    # get title and description
    title = response_json["results"][0]["content"]["title"]
    description = response_json["results"][0]["content"]["bullet_points"]
    rating: float = response_json["results"][0]["content"]["rating"]
    price: float = response_json["results"][0]["content"]["price"]
    volume, fragrance = extract_volume_and_fragrance(title, description)
    unit_price: float | None = price / volume * 100 if volume else None

    print("Title:", title)
    print("Description:", description)

    # Write products to txt file
    filename = f"products.txt"
    
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(f"Scraped Products - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 50 + "\n\n")
        
        f.write(f"Product {asin}:\n")
        f.write(f"ASIN: {asin}\n")
        f.write(f"Title: {title}\n")
        f.write(f"Price: ${price:.2f}\n")
        f.write(f"Rating: {rating}\n")
        f.write(f"Volume: {volume} mL\n" if volume else "Volume: Not specified\n")
        f.write(f"Unit Price: ${unit_price:.2f}/100mL\n" if unit_price else "Unit Price: Not calculated\n")
        f.write(f"Ingredients: {', '.join(ingredients_list)}\n")
        f.write(f"Description: {description}\n")
        f.write(f"Fragrance: {fragrance}\n" if fragrance else "Fragrance: Not specified\n")
        f.write("-" * 30 + "\n\n")
    
    print(f"Products saved to {filename}")

    return Product(
        asin=asin,
        title=title,
        description=description,
        rating=rating,
        price=price,
        ingredients=ingredients_list,
        volume_ml=volume,
        unit_price=unit_price,
        fragrances=fragrance,
    )

def scrape_original(query: str) -> Product | None:
    # get ASIN from the URL
    asin = query.split("/dp/")[1].split("/")[0]
    # run scraping for ingredients
    product = scrape_product(asin)
    return product

## scrape list of alternatives
def scrape_alternative_list(original_product: Product, max_results: int) -> list[Product]:
    alternative_products: list[Product] = []

    # Create prompt with gemini
    prompt = create_alternative_query(original_product.title, original_product.description)

    # Structure payload.
    payload = {
        'source': 'amazon_search',
        'domain': 'ca',
        'geo_location': 'N2G1T9',
        'parse': True,
        'query': prompt
    }

    # Check credentials
    if OXYLABS_USERNAME is None or OXYLABS_PASSWORD is None:
        raise ValueError("Oxylabs credentials are not set in environment variables.")

    # Get response.
    response = requests.request(
        'POST',
        'https://realtime.oxylabs.io/v1/queries',
        auth=(OXYLABS_USERNAME, OXYLABS_PASSWORD),
        json=payload,
    )

    response_json = response.json()

    filename = f"alternatives_list.txt"
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(f"Scraped alternatives list - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 50 + "\n\n")
        f.write(json.dumps(response_json, indent=4))
        
        f.write("-" * 30 + "\n\n")

    results_count = 0
    for item in response_json["results"][0]["content"]["results"]["organic"]:
        if results_count >= max_results:
            break
        asin = item["asin"]
        alternative_product = scrape_product(asin)
        if (
            alternative_product
            and alternative_product.asin != original_product.asin
            and alternative_product.unit_price is not None
            and original_product.unit_price is not None
            and alternative_product.unit_price < original_product.unit_price
        ):
            alternative_products.append(alternative_product)
            results_count += 1

    return alternative_products

# scraper("https://www.amazon.ca/Herbal-Essences-Nourishes-Certified-Especially/dp/B0CP6CX9RB/ref=sxin_16_pa_sp_search_thematic_sspa?content-id=amzn1.sym.46621be6-fabe-4126-8501-d32c96c42a24:amzn1.sym.46621be6-fabe-4126-8501-d32c96c42a24&crid=2NB5RKHDY6IE9&cv_ct_cx=women's+shampoo&keywords=women's+shampoo&pd_rd_i=B0CP6CX9RB&pd_rd_r=5cbc5adb-adf6-4145-b1a1-62558f7aa2a5&pd_rd_w=zdkBG&pd_rd_wg=3fDtA&pf_rd_p=46621be6-fabe-4126-8501-d32c96c42a24&pf_rd_r=230VZ98RTWGGHZYY7D6Z&qid=1759001440&sbo=RZvfv//HxDF+O5021pAnSA%3D%3D&sprefix=women's+shampo,aps,147&sr=1-2-acb80629-ce74-4cc5-9423-11e8801573fb-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&psc=1")
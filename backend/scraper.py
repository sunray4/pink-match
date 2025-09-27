# currently working on products that have ingredients list (e.g. shampoos, conditioners, body washes, skincare, etc.)
# later, work on products with materials list (e.g. clothes, shoes, razors, etc.)

# scrape_product('B0C9V8BVZ7')

import os
from pydantic import BaseModel
import requests
from dotenv import load_dotenv

load_dotenv()

from llm_model import create_alternative_query, extract_volume, clean_ingredients

OXYLABS_USERNAME = os.getenv("OXYLABS_USERNAME")
OXYLABS_PASSWORD = os.getenv("OXYLABS_PASSWORD")

class Product(BaseModel):
    asin: str
    title: str
    description: str
    rating: float
    price: float
    ingredients: list[str]
    volume_ml: float | None = None
    unit_price: float | None = None  # price per 100mL

def scraper(query: str):
    products: list[Product] = []
    original_product = scrape_original(query)
    if original_product is None:
        return None

    products.append(original_product)

    alternative_products = scrape_alternative_list(original_product)
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

    # clean up ingredients list with gemini prompt - split into a list, lowercase, remove special characters, and change to most common reference name
    cleaned_ingredients = clean_ingredients(ingredients)

    print("Ingredients list:", cleaned_ingredients)

    # get title and description
    title = response_json["results"][0]["content"]["title"]
    description = response_json["results"][0]["content"]["bullet_points"]
    rating: float = response_json["results"][0]["content"]["rating"]
    price: float = response_json["results"][0]["content"]["price"]
    volume: float | None = extract_volume(title, description)
    unit_price: float | None = price / volume * 100 if volume else None

    print("Title:", title)
    print("Description:", description)

    return Product(
        asin=asin,
        title=title,
        description=description,
        rating=rating,
        price=price,
        ingredients=cleaned_ingredients,
        volume_ml=volume,
        unit_price=unit_price,
    )

def scrape_original(query: str) -> Product | None:
    # get ASIN from the URL
    asin = query.split("/dp/")[1].split("/")[0]
    # run scraping for ingredients
    product = scrape_product(asin)
    return product

## scrape list of alternatives
def scrape_alternative_list(original_product: Product) -> list[Product]:
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

    for item in response_json["results"][0]["content"]["results"]["organic"]:
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

    return alternative_products

## scraping for ingredients
# ingredients list should be in the following location if available:
# for section in response["results"][0]["content"]["important_information"]:
#     if section["title"] == "Ingredients":
#         ingredients = section["description"]
#         break

# take the ingredients list and split by commas into list - remove leading/trailing whitespace
# ingredients_list = [ingredient.strip() for ingredient in ingredients.split(",")]
# make all ingredients lowercase
# ingredients_list = [ingredient.lower() for ingredient in ingredients_list]
# clean up ingredients list with gemini prompt
#parse this list of ingredients into a python list.  change the name of the ingredient into its most common reference name. do not include any of the following symbols within each ingredient string "()/<>"

scraper("https://www.amazon.ca/LOreal-Paris-Lengths-Shampoo-Keratin/dp/B088KMMXRG/ref=sr_1_7?crid=V8Z9WSWIHZGS&dib=eyJ2IjoiMSJ9.WDz0zMsaWreVsbkOjQdqUB-mcpSIf26aizBqMfX6ZzDPGkD-bSME-cBI22Zx5BM1OT04yQUDY_tNJ2A0JsrNK2h9D1zwY0SoAttorOtPP55k_1p0KtH25q4-UpjIqSFkE0xxk9sHJ13Yf_Ku7q_Rz_qnb-MBbxrhgTR7LHSbqyPuWgHzOk9Ub6D_OFI7GiT3hu14qS_DlC8MWyolQhjyaZRTWem6Qw_cEk1AsfAy1E37eYkN_AHF0sXOx4KKPw10XDHAOic9UgLArrfewxnXnXH4ypgVUNWfYvwzmSHjimQ.ucZ704ZRWdS2eTX18O_vEJgzFtI83XcQB8SvGxtYaH0&dib_tag=se&keywords=womens+shampoo&qid=1758999688&sprefix=womens+shampoo,aps,105&sr=8-7")
import os
from pydantic import BaseModel
import httpx
import asyncio
from dotenv import load_dotenv

import json
from datetime import datetime

load_dotenv()

from llm_model import create_alternative_query, batch_clean_ingredients, batch_extract_volumes, batch_extract_fragrances
from models import Product

OXYLABS_USERNAME = os.getenv("OXYLABS_USERNAME")
OXYLABS_PASSWORD = os.getenv("OXYLABS_PASSWORD")

async def scraper(query: str, max_results: int) -> list[Product] | None:
    products: list[Product] = []
    working_products = []
    print(f"Starting scrape for original product")
    original_product = await scrape_original(query)
    if original_product is None:
        return None
    print(f"Original product scraped: {original_product.title} (ASIN: {original_product.asin})")
    alternative_products = await scrape_alternative_list(original_product, max_results)
    if alternative_products:
        products.extend(alternative_products)
    

    # Batch process all volumes with Gemini for efficiency
    print("Batch processing volumes with Gemini...")
    product_titles = [original_product.title] + [product.title for product in products]
    extracted_volumes = batch_extract_volumes(product_titles)

    # Assign volumes and calculate unit prices
    original_product.volume_ml = extracted_volumes[0]
    if original_product.volume_ml and original_product.volume_ml > 0:
        original_product.unit_price = original_product.price / original_product.volume_ml * 100
    print(f"Updated volume for original product {original_product.asin}: {original_product.volume_ml} mL")

    # add original product to working list. original product is always the first item
    working_products.append(original_product)

    for i, product in enumerate(products):
        if i and extracted_volumes and i < len(extracted_volumes) - 1:
            product.volume_ml = extracted_volumes[i + 1]
            # Calculate unit price if volume is available
            if product.volume_ml and product.volume_ml > 0:
                product.unit_price = product.price / product.volume_ml * 100
                if original_product.unit_price and product.unit_price < original_product.unit_price:
                    working_products.append(product)
            else:
                working_products.append(product)
            print(f"Updated volume for {product.asin}: {product.volume_ml} mL")

    # Batch process all ingredients with Gemini
    print("Batch processing ingredients with Gemini...")
    raw_ingredients_2d = [product.ingredients for product in working_products]
    cleaned_ingredients_2d = batch_clean_ingredients(raw_ingredients_2d)
    
    # Assign cleaned ingredients back to products
    for i, product in enumerate(working_products):
        if i and cleaned_ingredients_2d and i < len(cleaned_ingredients_2d):
            working_products[i].ingredients = cleaned_ingredients_2d[i]
            print(f"Updated ingredients for {product.asin}: {product.ingredients}")

    # Batch process all fragrances with Gemini for efficiency
    print("Batch processing fragrances with Gemini...")
    product_descriptions = [f"{product.title} {product.description}" for product in working_products]
    extracted_fragrances = batch_extract_fragrances(product_descriptions)
    
    if not isinstance(extracted_fragrances, list):
        print(f"Warning: batch_extract_fragrances returned {type(extracted_fragrances)}, expected list")
        extracted_fragrances = [None] * len(product_descriptions)
    
    # Assign fragrances back to products
    for i, product in enumerate(working_products):
        if i and extracted_fragrances and i < len(extracted_fragrances):
            working_products[i].fragrances = extracted_fragrances[i]
            print(f"Updated fragrances for {product.asin}: {product.fragrances}")
        else:
            working_products[i].fragrances = None


    print(f"Found {len(working_products)} alternative products")

    filename = f"products.txt"
        
    with open(filename, 'w', encoding='utf-8') as f:
        for product in working_products:
        # Write products to txt file
        
            f.write(f"Scraped Products - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("=" * 50 + "\n\n")
            f.write(f"Product {product.asin}:\n")
            f.write(f"ASIN: {product.asin}\n")
            f.write(f"Title: {product.title}\n")
            f.write(f"Price: ${product.price:.2f}\n")
            f.write(f"Rating: {product.rating}\n")
            f.write(f"Volume: {product.volume_ml} mL\n" if product.volume_ml else "Volume: Not specified\n")
            f.write(f"Unit Price: ${product.unit_price:.2f}/100mL\n" if product.unit_price else "Unit Price: Not calculated\n")
            f.write(f"Ingredients: {product.ingredients}\n")
            f.write(f"Description: {product.description}\n")
            f.write(f"Fragrance: {product.fragrances}\n" if product.fragrances else "Fragrance: Not specified\n")
            f.write(f"Image URL: {product.image_url}\n" if product.image_url else "Image URL: Not available\n")
            f.write("-" * 30 + "\n\n")
    
            print(f"Products saved to {filename}")
    
    return working_products

async def scrape_product(asin: str, client: httpx.AsyncClient) -> Product | None:
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
    
    try:
        # Get response from Oxylabs.
        response = await client.post(
            'https://realtime.oxylabs.io/v1/queries',
            auth=(OXYLABS_USERNAME, OXYLABS_PASSWORD),
            json=payload,
        )

        if response.status_code != 200:
            print("Error:", response.status_code, response.text)
            return None
    except Exception as e:
        print(f"Request failed for ASIN {asin}: {e}")
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

    # Store raw ingredients string - will be processed in batch later
    raw_ingredients_list = [ingredient.strip().lower() for ingredient in ingredients.split(",")]
    raw_ingredients_list = [ingredient for ingredient in raw_ingredients_list if ingredient]

    print("Raw ingredients list:", raw_ingredients_list)

    # get title and description
    title = response_json["results"][0]["content"]["title"]
    description = response_json["results"][0]["content"]["bullet_points"]
    rating: float = response_json["results"][0]["content"]["rating"]
    price: float = response_json["results"][0]["content"]["price"]
    image_url = response_json["results"][0]["content"]["images"][0]

    print("Title:", title)
    print("Description:", description)

    return Product(
        asin=asin,
        title=title,
        description=description,
        rating=rating,
        price=price,
        ingredients=raw_ingredients_list,
        image_url=image_url
    )

async def scrape_original(query: str) -> Product | None:
    # get ASIN from the URL
    asin = query.split("/dp/")[1].split("/")[0]
    print(f"Scraping original product ASIN: {asin}")
    # run scraping for ingredients
    async with httpx.AsyncClient(timeout=60.0) as client:
        product = await scrape_product(asin, client)
    return product

async def scrape_alternatives_with_rate_limit(asins: list[str], client: httpx.AsyncClient) -> list[Product]:
    """
    Scrape products with rate limiting to stay within 10 requests per second.
    Uses semaphore to limit concurrent requests and adds delays between batches.
    """
    # Limit to 6 concurrent requests (well below the 10/sec limit)
    semaphore = asyncio.Semaphore(6)

    async def rate_limited_scrape(asin: str, delay: float = 0) -> Product | Exception | None:
        # Add staggered delay to spread requests over time
        if delay > 0:
            await asyncio.sleep(delay)
            
        async with semaphore:
            try:
                result = await scrape_product(asin, client)
                return result  # Can be Product or None
            except Exception as e:
                return e
    
    # Create tasks with staggered delays (0.1 second apart)
    tasks = []
    for i, asin in enumerate(asins):
        delay = i * 0.1  # 100ms delay between each request start
        task = rate_limited_scrape(asin, delay)
        tasks.append(task)
    
    # Execute all tasks
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Filter out exceptions and None values, return valid products
    products = []
    for result in results:
        if isinstance(result, Product):
            products.append(result)
        elif isinstance(result, Exception):
            print(f"Error scraping product: {result}")
        elif result is None:
            print("Product scraping returned None (possibly no data found)")
    
    return products

## scrape list of alternatives
async def scrape_alternative_list(original_product: Product, max_results: int) -> list[Product]:
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

    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            # Get response.
            response = await client.post(
                'https://realtime.oxylabs.io/v1/queries',
                auth=(OXYLABS_USERNAME, OXYLABS_PASSWORD),
                json=payload,
            )

            if response.status_code != 200:
                print("Error:", response.status_code, response.text)
                return alternative_products

            response_json = response.json()

            filename = f"alternatives_list.txt"
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(f"Scraped alternatives list - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write("=" * 50 + "\n\n")
                f.write(json.dumps(response_json, indent=4))
                
                f.write("-" * 30 + "\n\n")

            # Collect ASINs for concurrent scraping
            asins_to_scrape = []
            for item in response_json["results"][0]["content"]["results"]["organic"]:
                if len(asins_to_scrape) >= max_results:
                    break
                asins_to_scrape.append(item["asin"])
            print(f"ASINs to scrape: {asins_to_scrape}")

            # Scrape all products with rate limiting (max 10 requests per second)
            scraped_products = await scrape_alternatives_with_rate_limit(asins_to_scrape, client)

            # Filter successful results that meet criteria
            for alternative_product in scraped_products:
                if (
                    isinstance(alternative_product, Product)  # Not an exception
                    and alternative_product.asin != original_product.asin
                ):
                    alternative_products.append(alternative_product)
                    if len(alternative_products) >= max_results:
                        break

        except Exception as e:
            print(f"Error scraping alternatives: {e}")

    return alternative_products
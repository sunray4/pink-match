import ast
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY is None:
    raise ValueError("Gemini API key is not set in environment variables.")

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key=GEMINI_API_KEY)


# give gemini the title and description of the product and ask it to exract the volume of the product
def extract_volume_and_fragrance(title: str, description: str) -> tuple[float | None, list[str] | None]:
    prompt = f"Extract the volume from the following product details:\n\nTitle: {title}\nDescription: {description}. If no volume is found, return '0'. The volume could be in milliliters (ml) or liters (L) or ounces (oz) for liquids, grams (g) or kilograms (kg) for solids. Once you've found the volume value with its unit, convert to mL. For example, if the volume is 1L, convert it to 1000mL. If the volume is 8oz, convert it to approximately 237mL. If the volume is 500g, convert it to 500mL. If the volume is 1kg, convert it to 1000mL. Additionally, extract the fragrances of the product from the description if available. Example of fragrances include jasmine, lemon, vanilla, cinnamon, sandalwood, amber. There may be more than 1 fragrance in the product. Return the results in the following format: \"volume fragrance1 fragrance2 ...\", where volume is the numeric value of volume in mL without any units or additional text, and fragrance1, fragrance2, etc are the extracted fragrance strings. If you cannot find a fragrance, return 'None' for fragrance."

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )
        response_text = response.text.strip()
        volume, fragrances = response_text.split(" ", 1)
        volume = float(volume)
        print("Extracted volume:", volume)
        if fragrances.lower() == 'none':
            fragrances = None
        else:
            fragrances = [fragrance.strip() for fragrance in fragrances.split(" ")]
        if volume <= 0 :
            volume = None
        return volume, fragrances
    except Exception as e:
        print(f"Error extracting volume (Gemini API issue): {e}")
        print("Skipping volume extraction for now...")
        return None, None

def create_alternative_query(title: str, description: str) -> str:
    prompt = f"Create a search query to find products similar to the following product. The query should be concise and focus on the main features of the product, avoiding specific brand names or unique identifiers.\n\nTitle: {title}\nDescription: {description}\n\nQuery should only be a simple string. Search Query:"
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    print("Alternative search query:", response.text)
    return response.text.strip()

# this should go into product match file
# cleans up ingredients list - remove / and everything after it, lowercase, remove () 
def clean_ingredients(ingredients: str) -> list[str]:
    ingredients_list = [ingredient.strip().lower() for ingredient in ingredients.split(",")]
    ingredients_list = [ingredient for ingredient in ingredients_list if ingredient]
    ingredients_list = [ingredient.split('/')[0].strip() for ingredient in ingredients_list]
    cleaned_ingredients_list = []
    for ingredient in ingredients_list:
        if ("(" in ingredient) and (")" in ingredient):
            index_of_open = ingredient.index('(')
            index_of_close = ingredient.index(')')
            new_ingredient = (ingredient[:index_of_open] + ingredient[index_of_open + 1:index_of_close - 1] + ingredient[index_of_close+1:]).strip()
            if new_ingredient:
                cleaned_ingredients_list.append(new_ingredient)
        else:
            cleaned_ingredients_list.append(ingredient)
    prompt = f"Parse this list of ingredients into a python list. If something is very obviously not an ingredient, remove it. Change the name of each ingredient into its most common reference name. Each ingredient should be a string in the list, and should only contain lowercase letters. Do not include any of the following symbols within each ingredient string '()/<>'. Return ONLY the Python list in your response, no markdown formatting or additional text. Also do not print out any of your own thoughts or explanations.\n\nIngredients: {cleaned_ingredients_list}\n\nParsed Ingredients List:"
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    print("Parsed Ingredients List:", response.text)
    response_text = response.text.strip()

    response_text = response.text.strip()
    # Remove markdown code blocks if present
    if response_text.startswith("```python"):
        response_text = response_text[9:]  # Remove ```python
    if response_text.startswith("```"):
        response_text = response_text[3:]  # Remove ```
    if response_text.endswith("```"):
        response_text = response_text[:-3]  # Remove trailing ```
    response_text = response_text.strip()
    
    try:
        parsed_ingredients_list = ast.literal_eval(response_text)
        return parsed_ingredients_list
    except (ValueError, SyntaxError) as e:
        print(f"Error parsing ingredients list with ast: {e}")
        print(f"Response was: {response_text}")
        return ingredients_list

# remove gendered language
def remove_gendered_language(text: str) -> str:
    prompt = f"Rewrite the following text to remove any mentions of gender and well as brand names. For example, \"Dove Women+Care Pure Fresh 2-in-1 Shampoo + Conditioner with plant-based cleansers & moisturizers Orange & Sage for strong, healthy-looking hair 517 ml\" becomes \"Care Pure Fresh 2-in-1 Shampoo + Conditioner with plant-based cleansers & moisturizers Orange & Sage for strong, healthy-looking hair 517 ml\" and \"Every Man Jack 2-in-1 Daily Shampoo + Conditioner - Pacific Cypress | Nourishing For All Hair Types, Naturally Derived, Cruelty-Free Shampoo and Conditioner Set for Men | 710 mL - 1 Bottle\" becomes \"2-in-1 Daily Shampoo + Conditioner - Pacific Cypress | Nourishing For All Hair Types, Naturally Derived, Cruelty-Free Shampoo and Conditioner Set | 710 mL - 1 Bottle\"\n\nText: {text}\n\nRewritten Text:"
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    print("Text without gendered language:", response.text)
    return response.text.strip()

# remove_gendered_language("Harry's Shave Cream - Soothing Shave Cream for Men with Eucalyptus - Conditioning & Hydrating - Dermatologist-Tested - Gentle on Sensitive Skin - 3.4 oz - 2 Pack")
# create_alternative_query("https://www.amazon.ca/Olay-Cooling-White-Strawberry-Bodywash/dp/B01N6H32IR/ref=sr_1_13?crid=1VHRY7PK1RQ77&dib=eyJ2IjoiMSJ9.fXSbFC-4s_4P6Xkwxd3c7M1RiPQsHn0hfZOyg8YzXjmyf6LGpWfbHDdcXhYZGLSy7SaE0qxTdfjLhaFNY5UT1APyIrfBqTRQVGh7OhticmzN6hAkqYSYZ1A6yDGtn8gsXUjpO_UaITmr-1gaWBqMTGVNmfxzVYussJh5hEqe4oemzCtQcJwXtF5ccMQuligG-_B_ZL0cWUgDPODNFhit7u6KRZP_iEhRMYRMXFkvBIEAvpasNrhsAa7vKjUqmgsN_qsBt-fLyOegrE32_d1I9a10qFu23vG2K6fXu27WGSk.EX22oMNJD02EQBlAJzEgAwWHGvmmvxQBFSmPlfHas1M&dib_tag=se&keywords=body+wash&qid=1758998427&s=beauty&sprefix=body+,beauty,100&sr=1-13&th=1", "ACHIEVE VISIBLY IMPROVED SKIN IN JUST 14 DAYS: Enjoy visibly smooth and radiant skin with Olay Fresh Radiance Body Wash in 2 weeks 24/7 FRESHNESS: Olay Fresh Radiance Body Wash leaves your skin feeling renewed and looking healthy after every shower FORMULATED WITH SKIN-LOVING INGREDIENTS: Our essence-infused blend with Vitamin B3 & Antioxidant provides gentle and effective cleansing without drying your skin* (*vs regular bar soap) DESIGNED FOR ALL SKIN TYPES: This body wash is made with plant-based cleansers and free of parabens & phthalates TRUSTED FORMULA: Powered by over 70 years of industry-leading skin research, our Body Wash delivers the care and quality your skin deserves")
# extract_volume("Botanic Hearth Eucalyptus Tea Tree Body Wash | Shower Gel - 16 fl oz | for Men and Women | Antifungal, Moisturizing & Soothing Formula with Natural Oils", "Botanic Hearth Tea Tree Eucalyptus Body Wash is present with 100% Pure Tea Tree Oil Methodically formulated with botanical extracts and other powerful ingredients Helps seamlessly dissolve tension during shower with its invigorating, natural scent The Foot and Body Wash helps wash away and defend impurities from the skin surface Botanic Heart products are not tested on animals.")
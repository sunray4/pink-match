import ast
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY is None:
    raise ValueError("Gemini API key is not set in environment variables.")

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client(api_key=GEMINI_API_KEY)


# give gemini the title and description of the product and ask it to exract the volume of the product
# def extract_volume_and_fragrance(title: str, description: str) -> tuple[float | None, list[str] | None]:
#     prompt = f"Extract the volume from the following product details:\n\nTitle: {title}\nDescription: {description}. If no volume is found, return '0'. The volume could be in milliliters (ml) or liters (L) or ounces (oz) for liquids, grams (g) or kilograms (kg) for solids. Once you've found the volume value with its unit, convert to mL. For example, if the volume is 1L, convert it to 1000mL. If the volume is 8oz, convert it to approximately 237mL. If the volume is 500g, convert it to 500mL. If the volume is 1kg, convert it to 1000mL. Additionally, extract the fragrances of the product from the description if available. Example of fragrances include jasmine, lemon, vanilla, cinnamon, sandalwood, amber. There may be more than 1 fragrance in the product. Return the results in the following format: \"volume fragrance1 fragrance2 ...\", where volume is the numeric value of volume in mL without any units or additional text, and fragrance1, fragrance2, etc are the extracted names of the fragrances without any additional text. If you cannot find a fragrance, return 'None' for fragrance."

#     try:
#         response = client.models.generate_content(
#             model="gemini-2.5-flash", 
#             contents=prompt,
#             config=types.GenerateContentConfig(
#                 temperature=0.0,
#                 thinking_config=types.ThinkingConfig(thinking_budget=0)
#             )
#         )
#         response_text = response.text.strip()
#         volume, fragrances = response_text.split(" ", 1)
#         volume = float(volume)
#         print("Extracted volume:", volume)
#         if fragrances.lower() == 'none':
#             fragrances = None
#         else:
#             fragrances = [fragrance.strip() for fragrance in fragrances.split(" ")]
#         if volume <= 0 :
#             volume = None
#         return volume, fragrances
#     except Exception as e:
#         print(f"Error extracting volume (Gemini API issue): {e}")
#         print("Skipping volume extraction for now...")
#         return None, None

def create_alternative_query(title: str, description: str) -> str:
    prompt = f"Create a search query to find only men or unisex products similar to the following product. The query should be at most 10 words long and focus on the main features of the product, avoiding specific brand names or unique identifiers.\n\nTitle: {title}\nDescription: {description}\n\nQuery should only be a simple string. Search Query:"
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.0,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        print("Alternative search query:", response.text)
        return response.text.strip()
    except Exception as e:
        print(f"Error creating alternative query (Gemini API issue): {e}")
        print("Using fallback query based on title...")
        fallback_query = " ".join(title.lower().split()[:5])  # extract the first 5 words from the original title
        print(f"Fallback query: {fallback_query}")
        return fallback_query

# this should go into product match file
# cleans up ingredients list - remove / and everything after it, lowercase, remove () 
# def clean_ingredients(ingredients: str) -> list[str]:
#     ingredients_list = [ingredient.strip().lower() for ingredient in ingredients.split(",")]
#     ingredients_list = [ingredient for ingredient in ingredients_list if ingredient]
#     # ingredients_list = [ingredient.split('/')[0].strip() for ingredient in ingredients_list]
#     # cleaned_ingredients_list = []
#     # for ingredient in ingredients_list:
#     #     if ("(" in ingredient) and (")" in ingredient):
#     #         index_of_open = ingredient.index('(')
#     #         index_of_close = ingredient.index(')')
#     #         new_ingredient = (ingredient[:index_of_open] + ingredient[index_of_open + 1:index_of_close - 1] + ingredient[index_of_close+1:]).strip()
#     #         if new_ingredient:
#     #             cleaned_ingredients_list.append(new_ingredient)
#     #     else:
#     #         cleaned_ingredients_list.append(ingredient)
#     prompt = f"Parse this list of ingredients into a python list. If something is very obviously not an ingredient, remove it. Change the name of each ingredient into its most common reference name. Each ingredient should be a string in the list, and should only contain lowercase letters. Do not include any of the following symbols within each ingredient string '()/<>'. Return ONLY the Python list in your response, no markdown formatting or additional text. Also do not print out any of your own thoughts or explanations.\n\nIngredients: {ingredients_list}\n\nParsed Ingredients List:"
#     response = client.models.generate_content(
#         model="gemini-2.5-flash", 
#         contents=prompt,
#         config=types.GenerateContentConfig(
#             temperature=0.0
#         )
#     )
#     print("Parsed Ingredients List:", response.text)
#     response_text = response.text.strip()

#     response_text = response.text.strip()
#     # Remove markdown code blocks if present
#     if response_text.startswith("```python"):
#         response_text = response_text[9:]  # Remove ```python
#     if response_text.startswith("```"):
#         response_text = response_text[3:]  # Remove ```
#     if response_text.endswith("```"):
#         response_text = response_text[:-3]  # Remove trailing ```
#     response_text = response_text.strip()
    
    # try:
    #     parsed_ingredients_list = ast.literal_eval(response_text)
    #     return parsed_ingredients_list
    # except (ValueError, SyntaxError) as e:
    #     print(f"Error parsing ingredients list with ast: {e}")
    #     print(f"Response was: {response_text}")
    #     return ingredients_list

# Process a 2D array of ingredient lists in batch
def batch_clean_ingredients(ingredients_2d_array: list[list[str]]) -> list[list[str]]:
    if not ingredients_2d_array:
        return []
    
    # Convert 2D array to string representation for Gemini
    ingredients_str = str(ingredients_2d_array)
    
    prompt = f"""Clean up this 2D array of ingredient lists. For each ingredient list:
1. Remove items that are very obviously not ingredients (like 'fragrance' or marketing terms)
2. Remove all symbols like (), /, <, >, • from ingredient names  
3. Convert each ingredient name to its most common reference name
4. Keep only lowercase letters in ingredient names
5. If you realize that an ingredient is actually a combination of multiple ingredients, make each individual ingredient its own string in the list
6. Return data in a 2D structure - return exactly the same number of lists within the outer list

Input 2D array: {ingredients_str}

Return ONLY the cleaned 2D array in valid Python list format, no markdown formatting or additional text. Do not include any explanations or thoughts."""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.0,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```python"):
            response_text = response_text[9:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse the response
        cleaned_ingredients_2d = ast.literal_eval(response_text)
        
        # Validate that we got back the same structure
        if len(cleaned_ingredients_2d) != len(ingredients_2d_array):
            print(f"Warning: Batch cleaning changed number of lists from {len(ingredients_2d_array)} to {len(cleaned_ingredients_2d)}")
            return ingredients_2d_array  # Return original if structure mismatch
        
        print(f"Successfully batch-cleaned {len(ingredients_2d_array)} ingredient lists")
        return cleaned_ingredients_2d
        
    except Exception as e:
        print(f"Error in batch ingredient cleaning (Gemini API issue): {e}")
        if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
            print("Quota exceeded - applying basic ingredient cleaning instead of AI processing")
            # Apply basic fallback cleaning without AI
            fallback_cleaned = []
            for ingredient_list in ingredients_2d_array:
                cleaned_list = []
                for ingredient in ingredient_list:
                    # Basic cleaning: remove symbols, lowercase, split on common separators
                    clean_ingredient = ingredient.lower().strip()
                    # Remove common symbols
                    for symbol in ['(', ')', '/', '<', '>', '•', '*', '-']:
                        clean_ingredient = clean_ingredient.replace(symbol, ' ')
                    # Split and rejoin to remove extra spaces
                    clean_ingredient = ' '.join(clean_ingredient.split())
                    if clean_ingredient and len(clean_ingredient) > 1:  # Skip very short strings
                        cleaned_list.append(clean_ingredient)
                fallback_cleaned.append(cleaned_list)
            print(f"Applied fallback cleaning to {len(ingredients_2d_array)} ingredient lists")
            return fallback_cleaned
        else:
            print("Non-quota error occurred, returning original ingredients")
            return ingredients_2d_array  # Return original on other errors

def batch_extract_volumes(titles: list[str]) -> list[float | None]:
    """
    Extract volumes from an array of product titles in batch with Gemini.
    This is much more efficient than calling Gemini for each product individually.
    
    Args:
        titles: List of product titles
        
    Returns:
        List of volumes in mL (same order as input titles), None if no volume found
    """
    if not titles:
        return []
    
    # Convert titles array to string representation for Gemini
    titles_str = str(titles)
    
    prompt = f"""Extract the volume from each product title in this array. For each title:
1. Look for volume indicators like: ml, mL, L, oz, fl oz, g, kg
2. Convert all volumes to milliliters (mL):
   - 1L = 1000mL
   - 8oz = ~237mL  
   - 16oz = ~473mL
   - 500g = 500mL
   - 1kg = 1000mL
3. If no volume is found in a title, use 0
4. Return ONLY the numeric values in an array, in the same order as the input titles
5. Do not include units or any other text

Input titles array: {titles_str}

Return ONLY a Python list of numbers (volumes in mL), no markdown formatting or additional text. Example: [500, 0, 237, 1000]"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.0,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```python"):
            response_text = response_text[9:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse the response
        volumes = ast.literal_eval(response_text)
        
        # Validate that we got back the same number of volumes
        if len(volumes) != len(titles):
            print(f"Warning: Batch volume extraction returned {len(volumes)} volumes for {len(titles)} titles")
            return [None] * len(titles)  # Return None array if mismatch
        
        # Convert 0 values to None and ensure all are float or None
        processed_volumes = []
        for vol in volumes:
            if vol == 0 or vol is None:
                processed_volumes.append(None)
            else:
                processed_volumes.append(float(vol))
        
        print(f"Successfully batch-extracted volumes for {len(titles)} titles")
        return processed_volumes
        
    except Exception as e:
        print(f"Error in batch volume extraction (Gemini API issue): {e}")
        if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
            print("Quota exceeded - using basic regex extraction for volumes")
            # Apply basic fallback volume extraction without AI
            import re
            fallback_volumes = []
            for title in titles:
                # Use regex patterns to find common volume formats
                volume = None
                title_lower = title.lower()
                
                ml_match = re.search(r'(\d+(?:\.\d+)?)\s*ml', title_lower)
                if ml_match:
                    volume = float(ml_match.group(1))

                else:
                    l_match = re.search(r'(\d+(?:\.\d+)?)\s*l\b', title_lower)
                    if l_match:
                        volume = float(l_match.group(1)) * 1000
                    else:
                        oz_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:fl\s*)?oz', title_lower)
                        if oz_match:
                            volume = float(oz_match.group(1)) * 29.5735 
                        else:
                            g_match = re.search(r'(\d+(?:\.\d+)?)\s*g\b', title_lower)
                            if g_match:
                                volume = float(g_match.group(1))
                
                fallback_volumes.append(volume)
            
            print(f"Applied fallback regex extraction for {len(titles)} titles")
            return fallback_volumes
        else:
            print("Non-quota error occurred, returning None volumes")
            return [None] * len(titles)

def batch_extract_fragrances(product_descriptions: list[str]) -> list[list[str] | None]:
    if not product_descriptions:
        return []
    
    # Convert descriptions array to string representation for Gemini
    descriptions_str = str(product_descriptions)
    
    prompt = f"""Extract fragrances from each product description in this array. For each description:
1. Look for fragrance indicators like scent names, essential oils, or aromatic ingredients
2. Common fragrances include: jasmine, lemon, vanilla, cinnamon, sandalwood, amber, lavender, eucalyptus, tea tree, peppermint, rose, bergamot, citrus, coconut, etc.
3. Extract fragrance names only (not "fragrance-free" or "unscented")
4. Return fragrances as lowercase strings
5. If no fragrances are found in a description, use an empty list []
6. Return a 2D array where each inner list contains fragrances for one product
7. Maintain the same order as the input descriptions

Input descriptions array: {descriptions_str}

Return ONLY a Python 2D list of fragrance lists, no markdown formatting or additional text. Example: [["vanilla", "coconut"], [], ["eucalyptus", "tea tree"]]"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.0,
                thinking_config=types.ThinkingConfig(thinking_budget=0)
            )
        )
        
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith("```python"):
            response_text = response_text[9:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse the response
        fragrances_2d = ast.literal_eval(response_text)
        
        # Validate that we got back the same number of fragrance lists
        if len(fragrances_2d) != len(product_descriptions):
            print(f"Warning: Batch fragrance extraction returned {len(fragrances_2d)} lists for {len(product_descriptions)} descriptions. Please check if Gemini API quota was exceeded.")
            return [None] * len(product_descriptions)  # Return None array if mismatch
        
        # Convert empty lists to None
        processed_fragrances = []
        for fragrance_list in fragrances_2d:
            if not fragrance_list or len(fragrance_list) == 0:
                processed_fragrances.append(None)
            else:
                processed_list = [str(fragrance).lower().strip() for fragrance in fragrance_list if fragrance]
                processed_fragrances.append(processed_list if processed_list else None)
        
        print(f"Successfully batch-extracted fragrances for {len(product_descriptions)} products")
        print("fragrants:", processed_fragrances)
        return processed_fragrances
        
    except Exception as e:
        print(f"Error in batch fragrance extraction (Gemini API issue): {e}")
        return [None] * len(product_descriptions)
    
# # remove gendered language
# def remove_gendered_language(text: str) -> str:
#     prompt = f"Rewrite the following text to remove any mentions of gender and well as brand names. For example, \"Dove Women+Care Pure Fresh 2-in-1 Shampoo + Conditioner with plant-based cleansers & moisturizers Orange & Sage for strong, healthy-looking hair 517 ml\" becomes \"Care Pure Fresh 2-in-1 Shampoo + Conditioner with plant-based cleansers & moisturizers Orange & Sage for strong, healthy-looking hair 517 ml\" and \"Every Man Jack 2-in-1 Daily Shampoo + Conditioner - Pacific Cypress | Nourishing For All Hair Types, Naturally Derived, Cruelty-Free Shampoo and Conditioner Set for Men | 710 mL - 1 Bottle\" becomes \"2-in-1 Daily Shampoo + Conditioner - Pacific Cypress | Nourishing For All Hair Types, Naturally Derived, Cruelty-Free Shampoo and Conditioner Set | 710 mL - 1 Bottle\"\n\nText: {text}\n\nRewritten Text:"
#     response = client.models.generate_content(
#         model="gemini-2.5-flash", 
#         contents=prompt,
#         config=types.GenerateContentConfig(
#             temperature=0.0
#         )
#     )
#     print("Text without gendered language:", response.text)
#     return response.text.strip()

# remove_gendered_language("Harry's Shave Cream - Soothing Shave Cream for Men with Eucalyptus - Conditioning & Hydrating - Dermatologist-Tested - Gentle on Sensitive Skin - 3.4 oz - 2 Pack")
# create_alternative_query("https://www.amazon.ca/Olay-Cooling-White-Strawberry-Bodywash/dp/B01N6H32IR/ref=sr_1_13?crid=1VHRY7PK1RQ77&dib=eyJ2IjoiMSJ9.fXSbFC-4s_4P6Xkwxd3c7M1RiPQsHn0hfZOyg8YzXjmyf6LGpWfbHDdcXhYZGLSy7SaE0qxTdfjLhaFNY5UT1APyIrfBqTRQVGh7OhticmzN6hAkqYSYZ1A6yDGtn8gsXUjpO_UaITmr-1gaWBqMTGVNmfxzVYussJh5hEqe4oemzCtQcJwXtF5ccMQuligG-_B_ZL0cWUgDPODNFhit7u6KRZP_iEhRMYRMXFkvBIEAvpasNrhsAa7vKjUqmgsN_qsBt-fLyOegrE32_d1I9a10qFu23vG2K6fXu27WGSk.EX22oMNJD02EQBlAJzEgAwWHGvmmvxQBFSmPlfHas1M&dib_tag=se&keywords=body+wash&qid=1758998427&s=beauty&sprefix=body+,beauty,100&sr=1-13&th=1", "ACHIEVE VISIBLY IMPROVED SKIN IN JUST 14 DAYS: Enjoy visibly smooth and radiant skin with Olay Fresh Radiance Body Wash in 2 weeks 24/7 FRESHNESS: Olay Fresh Radiance Body Wash leaves your skin feeling renewed and looking healthy after every shower FORMULATED WITH SKIN-LOVING INGREDIENTS: Our essence-infused blend with Vitamin B3 & Antioxidant provides gentle and effective cleansing without drying your skin* (*vs regular bar soap) DESIGNED FOR ALL SKIN TYPES: This body wash is made with plant-based cleansers and free of parabens & phthalates TRUSTED FORMULA: Powered by over 70 years of industry-leading skin research, our Body Wash delivers the care and quality your skin deserves")
# extract_volume("Botanic Hearth Eucalyptus Tea Tree Body Wash | Shower Gel - 16 fl oz | for Men and Women | Antifungal, Moisturizing & Soothing Formula with Natural Oils", "Botanic Hearth Tea Tree Eucalyptus Body Wash is present with 100% Pure Tea Tree Oil Methodically formulated with botanical extracts and other powerful ingredients Helps seamlessly dissolve tension during shower with its invigorating, natural scent The Foot and Body Wash helps wash away and defend impurities from the skin surface Botanic Heart products are not tested on animals.")
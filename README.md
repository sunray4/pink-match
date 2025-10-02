# Pink Match

## Inspiration
Did you know that women often pay more for products that are nearly identical to those marketed to men? This is called the Pink Tax, and it unfairly impacts millions of women worldwide, from razors to shampoos, personal care products and more.

On average, women pay 7% more for equivalent products, costing thousands of dollars over a lifetime (NYC Department of Consumer Affairs). We wanted to tackle this problem... and that’s how PinkMatch was born.

## What it does
PinkMatch is a web app that exposes the hidden cost of the pink tax by showing users fairer product alternatives. A user pastes a link to a product marketed to women, and our system instantly returns gender-neutral or men’s alternatives that are similar in ingredients, fragrance and description, but typically at a more affordable price.

## How we built it
Frontend: Designed in Figma and built with Next.js
Data: We scraped product listings from Amazon using Oxylabs and cleaned/structured them with the Gemini API
NLP: TF-IDF with Cosine Similarity to detect overlap in product descriptions. Sentence Transformers (Hugging Face’s all-MiniLM-L6-v2) was used to generate semantic embeddings of descriptions and fragrances, enabling more meaningful similarity matching
Backend: Built in Python, integrating NLP pipelines to process queries and return matches

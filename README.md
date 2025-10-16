# Pink Match

![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![nextjs](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![fastapi](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white)
![hugging face](https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black)
![google gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

#### [Live Website!!](https://pinkmatch.sunray4.hackclub.app/)

#### [figma design](https://www.figma.com/design/znHjr90pu3uQtFkug199cu/PinkMatch--TechNova-2025?node-id=7-115&t=7BseKiNO2oPQBejD-0)
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

## How to run the project

### Frontend
```bash
cd frontend
npm i
npm run dev
```

### Backend
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
fastapi run main.py
```

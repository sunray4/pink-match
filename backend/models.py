from pydantic import BaseModel
class Product(BaseModel):
    asin: str
    title: str
    description: str
    rating: float
    price: float
    ingredients: list[str]
    volume_ml: float | None = None
    unit_price: float | None = None  # price per 100mL
    fragrances: list[str] | None = None
    similarity_score: float | None = None
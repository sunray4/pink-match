from models import Product

database = [
    # -------------------------
    # Razors
    # -------------------------
    Product(
        asin="RAZOR001",
        title="Men's Mint Razor",
        description="Cooling razor with mint strip",
        ingredients=["stainless steel blades", "aloe strip", "plastic handle"],
        fragrances=["mint"],
        price=9.99,
        volume_ml=1.0,
        rating=4.2,
        unit_price=999.0  # price per 100mL
    ),

    Product(
        asin="RAZOR002",
        title="Men's Lavender Comfort Razor",
        description="Gentle razor with lavender-infused strip",
        ingredients=["stainless steel blades", "aloe strip", "plastic handle"],
        fragrances=["lavender"],
        price=11.50,
        volume_ml=1.0,
        rating=4.5,
        unit_price=1150.0
    ),

    Product(
        asin="RAZOR003",
        title="Men's Coconut Fresh Razor",
        description="Moisturizing razor with coconut oil strip",
        ingredients=["stainless steel blades", "aloe strip", "plastic handle"],
        fragrances=["coconut"],
        price=10.49,
        volume_ml=1.0,
        rating=4.3,
        unit_price=1049.0
    ),

    Product(
        asin="RAZOR004",
        title="Men's Rose Breeze Razor",
        description="Soft shave razor with rose essence",
        ingredients=["stainless steel blades", "aloe strip", "plastic handle"],
        fragrances=["rose"],
        price=12.00,
        volume_ml=1.0,
        rating=4.1,
        unit_price=1200.0
    ),

    Product(
        asin="RAZOR005",
        title="Men's Herbal Shave Razor",
        description="Refreshing herbal scent for sensitive skin",
        ingredients=["stainless steel blades", "aloe strip", "plastic handle"],
        fragrances=["herbal"],
        price=10.99,
        volume_ml=1.0,
        rating=4.4,
        unit_price=1099.0
    ),

    # -------------------------
    # Shampoos (example)
    # -------------------------
    Product(
        asin="SHAMPOO001",
        title="Men's Mint Shampoo",
        description="Cooling shampoo with mint extract",
        ingredients=["water", "sodium laureth sulfate", "peppermint oil", "glycerin"],
        fragrances=["mint"],
        price=13.00,
        volume_ml=250.0,
        rating=4.0,
        unit_price=5.20  # $13.00 / 250mL * 100
    ),

    Product(
        asin="SHAMPOO002",
        title="Men's Lavender Smooth Shampoo",
        description="Gentle shampoo with lavender oil",
        ingredients=["water", "sodium laureth sulfate", "lavender oil", "glycerin"],
        fragrances=["lavender"],
        price=13.50,
        volume_ml=250.0,
        rating=4.6,
        unit_price=5.40
    ),

    Product(
        asin="SHAMPOO003",
        title="Men's Coconut Fresh Shampoo",
        description="Moisturizing shampoo with coconut oil",
        ingredients=["water", "sodium laureth sulfate", "coconut oil", "glycerin"],
        fragrances=["coconut"],
        price=13.20,
        volume_ml=250.0,
        rating=4.2,
        unit_price=5.28
    ),
]

new_product = Product(
    asin="TEST001",
    title="Luxury Women's Rose Razor",
    description="5-blade razor with aloe strip for sensitive skin",
    ingredients=["stainless steel blades", "aloe strip", "plastic handle"],
    fragrances=["rose"],
    price=15.99,
    volume_ml=1.0,
    rating=4.7,
    unit_price=1599.0
)
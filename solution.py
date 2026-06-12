products = [
    {"name": "Notebook", "stock": 15},
    {"name": "Pen", "stock": 5},
    {"name": "Eraser", "stock": 3},
    {"name": "Marker", "stock": 12},
    {"name": "Stapler", "stock": 8}
]

print("Products with stock less than 10:")
for i in products:
    if i["stock"] < 10:
        print(f"{i['name']} - Stock: {i['stock']}")

# Nutrition catalog scan data contract

The `food_drink/nutrition-catalog-scan` starter declares a single generated product API in
`manifest.data.apis` plus one runtime REST data source in `manifest.dataSources`.

Generated API declarations cover:

- `nutritionProducts` at `/v1/nutrition/products`

The generated collection models the current `nutrition_products` table shape, including:

- `barcode`
- `normalizedBarcode`
- `barcodeType`
- `name`
- `brand`
- `packageLabel`
- `nutritionFacts`
- `imageRefs`
- `createdByUserId`
- `createdAt`
- `updatedAt`
- `deletedAt`

Runtime data-source operations target `https://api.ankhorage.com/v1/nutrition` and include:

- `nutrition.health` at `/health`
- `nutrition.products.list` at `/products`
- `nutrition.products.getById` at `/products/:id`
- `nutrition.products.getByBarcode` at `/products/by-barcode/:barcode`
- `nutrition.products.create` at `/products`
- `nutrition.products.update` at `/products/:id`
- `nutrition.products.delete` at `/products/:id`

The generated app remains a restricted scanner app. All generated product API declarations require
auth because the whole app uses global Supabase auth.

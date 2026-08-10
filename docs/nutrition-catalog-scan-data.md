# Nutrition catalog scan data contract

The `food_drink/nutrition-catalog-scan` starter uses the canonical ADM 5 data model.

`manifest.generatedApis['nutrition-products']` is the desired state for the DB-backed product CRUD surface. It owns the `nutrition_products` collection and the canonical operations `products.list`, `products.read`, `products.create`, `products.update`, and `products.delete`.

`manifest.dataSources['nutrition-products']` is derived through `@ankhorage/data-sources` and is the runtime/binding projection for that generated API. The starter does not duplicate generated operation normalization.

`manifest.dataSources['nutrition-api']` is a separate external REST source containing only behavior outside the initial generated CRUD contract: health and barcode lookup (`nutrition.products.getByBarcode`).

The removed `manifest.data.apis` domain and legacy `kind: 'rest'` source discriminator are not emitted.

Generated database operations return list arrays and resource records directly. Template bindings therefore use the direct result shape instead of legacy HTTP wrapper paths such as `products` or `product.*`.

---
"@ankhorage/templates": patch
---

Align the nutrition scanner starter with the cleaned product-centric nutrition API.

Generated nutrition scanner apps now target the single-table `nutrition_products` MVP contract, use direct product CRUD and barcode lookup endpoints, handle duplicate barcode conflicts, and remove stale capture/challenge/review/store-observation assumptions.

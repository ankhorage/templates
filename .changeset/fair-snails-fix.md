---
"@ankhorage/templates": patch
---

Fix the nutrition scanner starter's Expo Router tab anchor and web startup routing.

Generated nutrition scanner apps now anchor the tabs layout to the visible `products` tab, keep `/` as a hidden fallback route, preserve `/products` as the signed-in landing path, and avoid invalid `index` tab anchors during Expo Router startup.

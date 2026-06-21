---
'@ankhorage/templates': patch
---

Remove the nutrition scanner starter's hidden root fallback route and make the visible products tab the top-level initial route. Root `/` startup remains generator-owned while the authenticated landing path stays `/products`.

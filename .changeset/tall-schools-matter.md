---
"@ankhorage/templates": patch
---

Restore the nutrition scanner starter's stable web startup route.

Generated nutrition scanner apps now use the hidden `/` root route as the top-level tabs initial route again, which keeps Expo Router startup aligned with the nested Products stack and avoids the post-sign-in navigation loop and maximum update depth crash on web.

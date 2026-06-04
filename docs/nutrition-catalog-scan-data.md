# Nutrition catalog scan data contract

The `food_drink/nutrition-catalog-scan` starter declares its challenge domain model through `manifest.data.apis`.

Generated API declarations currently cover:

- `nutritionProducts` at `/v1/nutrition/products`
- `nutritionProductCaptures` at `/v1/nutrition/products/captures`
- `nutritionScanChallenges` at `/v1/nutrition/challenges`
- `nutritionScanEvents` at `/v1/nutrition/scan-events`

Each entry is a generated collection API contract. The template is still UI-first: downstream infra/API generation is responsible for implementing migrations, handlers, permissions, and leaderboard aggregation.

The app remains a restricted challenge app. All declared API entries require auth because the whole generated app uses global Supabase auth.

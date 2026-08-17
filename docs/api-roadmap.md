# Canonical API template ownership

Templates persist application APIs only through `ankh.config.json -> infra.apis[]`.

API bindings reference canonical operations by `apiId`, `endpointId`, and `operationId`. Templates must not project APIs into `dataSources`, restore `generatedApis`, or route API operations through database adapters.

The Nutrition catalog scanner is the Phase 1 reference template: it uses the external REST API at `https://api.ankhorage.com/v1/nutrition` for product list, read, barcode lookup, create, update, and delete operations.

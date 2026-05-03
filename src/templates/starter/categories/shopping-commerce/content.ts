export const shoppingCommerceContent = {
  browse: {
    eyebrow: 'Marketplace',
    title: 'Browse featured finds',
    description: 'Start with categories, promoted items, and trust signals for commerce apps.',
    sections: [
      {
        title: 'Featured inventory',
        description: 'Give shoppers a clear first route for products and categories.',
        cards: [
          {
            eyebrow: 'Featured',
            title: 'Compact travel pack',
            description: 'A product card placeholder with price, availability, and seller context.',
          },
          {
            eyebrow: 'Category',
            title: 'Home office essentials',
            description: 'Use category cards to shape browsing before real catalog data exists.',
          },
        ],
      },
    ],
  },
  search: {
    eyebrow: 'Search',
    title: 'Filters and saved searches',
    description: 'Prepare query, sorting, saved-search, and refinement states.',
    sections: [
      {
        title: 'Discovery controls',
        description: 'Model the filters a marketplace shopper expects.',
        cards: [
          {
            eyebrow: 'Filter',
            title: 'Price and availability',
            description: 'Reserve space for price ranges, stock, shipping, and location.',
          },
          {
            eyebrow: 'Saved search',
            title: 'Ergonomic desk setup',
            description: 'A starter row for alerts and recurring discovery.',
          },
        ],
      },
    ],
  },
  sell: {
    eyebrow: 'Seller tools',
    title: 'Create a new listing',
    description: 'Prepare a seller flow for listing drafts, media, pricing, and shipping.',
    sections: [
      {
        title: 'Listing checklist',
        description: 'Keep seller setup concrete without adding form runtime behavior.',
        cards: [
          {
            eyebrow: 'Draft',
            title: 'Add product photos',
            description: 'A placeholder task for media, title, and description completeness.',
          },
          {
            eyebrow: 'Pricing',
            title: 'Set price and shipping',
            description: 'Reserve space for offers, fulfillment, and handling time.',
          },
        ],
      },
    ],
  },
  orders: {
    eyebrow: 'Orders',
    title: 'Purchases and sales',
    description: 'Track buyer orders, seller fulfillment, disputes, and receipts.',
    sections: [
      {
        title: 'Order activity',
        description: 'Seed both purchase and seller order states.',
        cards: [
          {
            eyebrow: 'Purchase',
            title: 'Desk lamp arriving Tuesday',
            description: 'A buyer-facing order row with status and delivery metadata.',
          },
          {
            eyebrow: 'Sale',
            title: 'Backpack ready to ship',
            description: 'A seller-facing row for packing, labels, and payout state.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Account',
    title: 'Trust and preferences',
    description: 'Represent buyer preferences, seller reputation, and account trust details.',
  },
} as const;

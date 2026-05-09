export const financeMoneyContent = {
  overview: {
    eyebrow: 'Cash overview',
    title: 'Balances and upcoming activity',
    description: 'Seed the dashboard with a cash snapshot, upcoming bills, and budget status.',
    sections: [
      {
        title: 'Snapshot',
        description: 'Model what matters on day one: balances, bills, and status.',
        cards: [
          {
            eyebrow: 'Balance',
            title: 'Total balance',
            description: 'A placeholder for total balance across accounts and liquidity buckets.',
          },
          {
            eyebrow: 'Upcoming',
            title: 'Next bill due',
            description: 'Reserve this for scheduled payments and cashflow alerts.',
          },
        ],
      },
    ],
  },
  accounts: {
    eyebrow: 'Accounts',
    title: 'Account list and details',
    description: 'Keep accounts grouped by type with quick health and ownership metadata.',
    sections: [
      {
        title: 'Account groups',
        description: 'Model the account categories a finance app needs.',
        cards: [
          {
            eyebrow: 'Checking',
            title: 'Primary account',
            description: 'A placeholder account card with balance, institution, and status.',
          },
          {
            eyebrow: 'Savings',
            title: 'Emergency fund',
            description: 'Reserve for goals, interest rate, and withdrawal constraints.',
          },
        ],
      },
    ],
  },
  transactions: {
    eyebrow: 'Activity',
    title: 'Transactions and categories',
    description: 'Prepare the activity feed for filtering, receipts, and reconciliation.',
    sections: [
      {
        title: 'Recent activity',
        description: 'Model transactions with category, merchant, and status signals.',
        cards: [
          {
            eyebrow: 'Card',
            title: 'Grocery run',
            description: 'A placeholder transaction card with category and receipt link.',
          },
          {
            eyebrow: 'Transfer',
            title: 'Savings transfer',
            description: 'Reserve for internal transfers and scheduled rules.',
          },
        ],
      },
    ],
  },
  budget: {
    eyebrow: 'Budget',
    title: 'Plan and limits',
    description: 'Start with budgets, category caps, and health indicators.',
    sections: [
      {
        title: 'Budget health',
        description: 'Model the budget signals a user expects without implementing computation.',
        cards: [
          {
            eyebrow: 'Category',
            title: 'Food & dining',
            description: 'A placeholder budget category with limit and progress signal.',
          },
          {
            eyebrow: 'Category',
            title: 'Transport',
            description: 'Reserve for recurring spend, subscriptions, and alerts.',
          },
        ],
      },
    ],
  },
  insights: {
    eyebrow: 'Insights',
    title: 'Trends and summaries',
    description: 'Reserve space for spending trends, savings rate, and projections.',
    sections: [
      {
        title: 'Analytics placeholders',
        description: 'Model insight modules without building the analytics engine.',
        cards: [
          {
            eyebrow: 'Trend',
            title: 'Monthly spend',
            description: 'A placeholder for charts, breakdowns, and comparison periods.',
          },
          {
            eyebrow: 'Summary',
            title: 'Top categories',
            description: 'Reserve for category ranking and actionable suggestions.',
          },
        ],
      },
    ],
  },
} as const;

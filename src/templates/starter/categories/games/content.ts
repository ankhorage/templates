export const gamesContent = {
  home: {
    eyebrow: 'Player hub',
    title: 'Daily loop',
    description: 'Seed the home screen with daily quests, rewards, and session continuity.',
    sections: [
      {
        title: 'Session highlights',
        description: 'Model the content blocks a player expects each day.',
        cards: [
          {
            eyebrow: 'Reward',
            title: 'Daily bonus',
            description: 'A placeholder for streak rewards, boosts, and limited-time items.',
          },
          {
            eyebrow: 'Challenge',
            title: 'Complete a quest',
            description: 'Reserve for personalized quest suggestions and progress.',
          },
        ],
      },
    ],
  },
  quests: {
    eyebrow: 'Quests',
    title: 'Active challenges',
    description: 'Organize quests by difficulty and reward type before wiring progression logic.',
    sections: [
      {
        title: 'Quest queue',
        description: 'Model quest cards with objectives, rewards, and timers.',
        cards: [
          {
            eyebrow: 'Daily',
            title: 'Win a match',
            description: 'A placeholder quest with reward and objective count.',
          },
          {
            eyebrow: 'Weekly',
            title: 'Complete milestones',
            description: 'Reserve for multi-step quests and collaboration objectives.',
          },
        ],
      },
    ],
  },
  inventory: {
    eyebrow: 'Inventory',
    title: 'Items and loadouts',
    description: 'Seed the inventory with item categories and upgrade affordances.',
    sections: [
      {
        title: 'Item types',
        description: 'Model items, currency, and upgrades without implementing game balance.',
        cards: [
          {
            eyebrow: 'Gear',
            title: 'Starter loadout',
            description: 'A placeholder item with rarity, stats, and upgrade path.',
          },
          {
            eyebrow: 'Currency',
            title: 'Coins and gems',
            description: 'Reserve for wallets, purchases, and earnable rewards.',
          },
        ],
      },
    ],
  },
  friends: {
    eyebrow: 'Social',
    title: 'Friends and squads',
    description: 'Model party invites, presence, and social challenges.',
    sections: [
      {
        title: 'Presence',
        description: 'Keep online status and invitations visible without building matchmaking.',
        cards: [
          {
            eyebrow: 'Online',
            title: 'Squad invite',
            description: 'A placeholder for party invites, chat, and quick join.',
          },
          {
            eyebrow: 'Challenge',
            title: 'Weekly competition',
            description: 'Reserve for leaderboards, shared quests, and rewards.',
          },
        ],
      },
    ],
  },
  profile: {
    eyebrow: 'Player profile',
    title: 'Preferences and controls',
    description: 'Model controls, notifications, and account defaults for a player.',
  },
} as const;


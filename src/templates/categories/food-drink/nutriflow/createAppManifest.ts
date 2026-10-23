import type { AppManifest, ComponentDataBindingRegistry, UiNode } from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

import { BASE_INFRA } from '../../../../internal/defaults';

/*** Return the complete portable NutriFlow nutrition companion manifest. */
export default function createAppManifest(): AppManifest {
  const diagnostics = validateNavigatorManifest(manifest.navigator, {
    platform: 'ios',
    expoRouterVersion: '57.0.18',
  });
  if (diagnostics.some((diagnostic) => diagnostic.severity === 'error')) {
    throw new Error(diagnostics.map((diagnostic) => diagnostic.message).join(' '));
  }
  return structuredClone(manifest);
}

/*** Create a semantic heading within NutriFlow's shared screen hierarchy. */
function heading(id: string, value: string, level: 1 | 2 | 3 = 2): UiNode {
  return { id, type: 'Heading', props: { text: value, level, size: `h${level}` } };
}

/*** Create concise supportive copy without duplicating the owner Text shape. */
function copy(id: string, value: string, variant: 'body' | 'bodySmall' | 'lead' = 'body'): UiNode {
  return { id, type: 'Text', props: { text: value, variant } };
}

/*** Create a route-backed primary action for a portable local flow. */
function action(id: string, label: string): UiNode {
  return { id, type: 'Button', props: { children: label, variant: 'solid', size: 'l' } };
}

/*** Render a bundled recipe image through the portable runtime media contract. */
function recipeImage(id: string, mediaId: string, alt: string): UiNode {
  return {
    id,
    type: 'Image',
    props: { source: { mediaId }, alt, fit: 'cover', aspectRatio: 1 },
  };
}

/*** Bind a supported interactive component event to a canonical Navigator route. */
function navigateBinding(
  componentId: string,
  componentType: string,
  route: string,
  event = 'press',
): ComponentDataBindingRegistry[string] {
  return {
    componentId,
    componentType,
    events: {
      [event]: [
        {
          target: {
            capability: 'navigator.navigate',
            input: { route: { kind: 'literal', value: route } },
          },
        },
      ],
    },
  };
}

const bindings: ComponentDataBindingRegistry = {
  'home-log-meal': navigateBinding('home-log-meal', 'Button', '/log'),
  'home-plan': navigateBinding('home-plan', 'Button', '/plan'),
  'home-recipes': navigateBinding('home-recipes', 'MediaCard', '/recipes'),
  'log-search-recipes': navigateBinding('log-search-recipes', 'Button', '/recipes'),
  'log-manual-entry': navigateBinding('log-manual-entry', 'Button', '/recipes'),
  'log-add-recent': navigateBinding('log-add-recent', 'Button', '/'),
  'recipes-green-bowl': navigateBinding(
    'recipes-green-bowl',
    'MediaExplorer',
    '/recipe-details',
    'activate',
  ),
  'recipes-details': navigateBinding('recipes-details', 'Button', '/recipe-details'),
  'recipe-add-plan': navigateBinding('recipe-add-plan', 'Button', '/plan'),
  'plan-add-meal': navigateBinding('plan-add-meal', 'Button', '/recipes'),
  'progress-plan': navigateBinding('progress-plan', 'Button', '/plan'),
  'profile-community': navigateBinding('profile-community', 'Button', '/community'),
  'profile-settings': navigateBinding('profile-settings', 'Button', '/settings'),
  'community-home': navigateBinding('community-home', 'Button', '/'),
  'settings-profile': navigateBinding('settings-profile', 'Button', '/profile'),
};

const manifest = {
  metadata: {
    name: 'NutriFlow',
    slug: 'nutriflow',
    version: '1.0.0',
    category: 'food_drink',
    themeId: 'nutriflow',
  },
  themes: {
    nutriflow: {
      id: 'nutriflow',
      name: 'NutriFlow',
      light: { primaryColor: '#2F7D4A', harmony: 'analogous' },
      dark: { primaryColor: '#5BBF7B', harmony: 'analogous' },
      tokens: {
        spacing: { none: 0, xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 },
        radii: { none: 0, s: 8, m: 16, l: 24, full: 9999 },
      },
    },
  },
  activeThemeId: 'nutriflow',
  activeThemeMode: 'light',
  settings: { localization: { defaultLocale: 'en', locales: ['en'] } },
  infra: structuredClone(BASE_INFRA),
  navigator: {
    type: 'stack',
    implementation: 'native',
    options: { headerShown: false },
    initialRouteName: '(tabs)',
    routes: [
      {
        name: '(tabs)',
        navigator: {
          type: 'tabs',
          implementation: 'headless',
          presentation: 'bottom',
          initialRouteName: 'home',
          routes: [
            {
              name: 'home',
              path: '/',
              label: 'Home',
              screenId: 'home',
              icon: { source: { mediaId: 'nav-home' } },
            },
            {
              name: 'log',
              path: '/log',
              label: 'Log',
              screenId: 'log-meal',
              icon: { source: { mediaId: 'nav-log' } },
            },
            {
              name: 'recipes',
              path: '/recipes',
              label: 'Recipes',
              screenId: 'recipes',
              icon: { source: { mediaId: 'nav-recipes' } },
            },
            {
              name: 'progress',
              path: '/progress',
              label: 'Progress',
              screenId: 'progress',
              icon: { source: { mediaId: 'nav-progress' } },
            },
            {
              name: 'profile',
              path: '/profile',
              label: 'Profile',
              screenId: 'profile',
              icon: { source: { mediaId: 'nav-profile' } },
            },
          ],
        },
      },
      { name: 'plan', path: '/plan', screenId: 'plan' },
      { name: 'community', path: '/community', screenId: 'community' },
      { name: 'recipe-details', path: '/recipe-details', screenId: 'recipe-details' },
      { name: 'settings', path: '/settings', screenId: 'settings' },
    ],
  },
  screens: {
    home: {
      id: 'home',
      name: 'Home',
      title: 'Good morning, Maya',
      description: 'A calm daily meal overview.',
      root: {
        id: 'home-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('home-title', 'Good morning, Maya', 1),
          copy('home-support', 'A thoughtful meal is already a good start.', 'lead'),
          {
            id: 'home-progress',
            type: 'ProgressRing',
            props: {
              value: 3,
              max: 4,
              centerValue: '3',
              centerLabel: 'meals logged',
              accessibilityLabel: 'Three meals logged today',
            },
          },
          {
            id: 'home-macros',
            type: 'Card',
            props: {
              title: 'Today at a glance',
              description: 'Sample meal notes, not a medical target.',
              tone: 'secondary',
            },
            children: [
              {
                id: 'home-protein',
                type: 'MetricCard',
                props: {
                  label: 'Protein',
                  value: 'Balanced',
                  description: 'from today’s meals',
                  compact: true,
                },
              },
              {
                id: 'home-fibre',
                type: 'MetricCard',
                props: {
                  label: 'Fibre',
                  value: 'Varied',
                  description: 'from plants and grains',
                  compact: true,
                },
              },
            ],
          },
          heading('home-meals', 'Today’s meals'),
          {
            id: 'home-breakfast',
            type: 'Card',
            props: { title: 'Breakfast', description: 'Berry overnight oats · sample entry' },
            children: [recipeImage('home-breakfast-image', 'berry-oats', 'Berry overnight oats')],
          },
          {
            id: 'home-lunch',
            type: 'Card',
            props: { title: 'Lunch', description: 'Green grain bowl · sample entry' },
            children: [recipeImage('home-lunch-image', 'green-bowl', 'Green grain bowl')],
          },
          action('home-log-meal', 'Log a meal'),
          action('home-plan', 'View today’s plan'),
          heading('home-discover', 'Make the next meal easy'),
          {
            id: 'home-recipes',
            type: 'MediaCard',
            props: {
              title: 'Simple bowls for busy days',
              description: 'Browse local sample recipes',
              imageSource: { mediaId: 'green-bowl' },
              imageLabel: 'Green grain bowl',
            },
          },
        ],
      },
    },
    'log-meal': {
      id: 'log-meal',
      name: 'Log Meal',
      title: 'Log a meal',
      description: 'Search, scan, or use a local sample entry.',
      root: {
        id: 'log-meal-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('log-meal-title', 'Log a meal', 1),
          {
            id: 'log-meal-modes',
            type: 'Tabs',
            props: { defaultValue: 'search', accessibilityLabel: 'Meal logging modes' },
            children: [
              {
                id: 'log-meal-tab-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  {
                    id: 'log-search-tab',
                    type: 'Tab',
                    props: { value: 'search', label: 'Search' },
                  },
                  { id: 'log-scan-tab', type: 'Tab', props: { value: 'scan', label: 'Scan' } },
                  {
                    id: 'log-quick-tab',
                    type: 'Tab',
                    props: { value: 'quick', label: 'Quick add' },
                  },
                ],
              },
              {
                id: 'log-search-panel',
                type: 'TabPanel',
                props: { value: 'search' },
                children: [
                  {
                    id: 'log-search',
                    type: 'SearchInput',
                    props: { placeholder: 'Search local sample foods', disabled: true },
                  },
                  copy(
                    'log-search-note',
                    'Search is ready for a connected food source; this portable starter shows sample entries.',
                  ),
                  action('log-search-recipes', 'Browse sample recipes'),
                ],
              },
              {
                id: 'log-scan-panel',
                type: 'TabPanel',
                props: { value: 'scan' },
                children: [
                  {
                    id: 'log-scanner',
                    type: 'BarcodeScannerView',
                    props: {
                      permissionStatus: 'unavailable',
                      title: 'Scanner unavailable',
                      description: 'This starter has no camera adapter configured.',
                      overlayTitle: 'Use search instead',
                      overlayDescription: 'Barcode scans need a host camera capability.',
                      manualEntryLabel: 'Browse sample recipes',
                    },
                  },
                  action('log-manual-entry', 'Browse sample recipes'),
                ],
              },
              {
                id: 'log-quick-panel',
                type: 'TabPanel',
                props: { value: 'quick' },
                children: [
                  {
                    id: 'log-recent',
                    type: 'Card',
                    props: {
                      title: 'Recent sample',
                      description: 'Berry overnight oats · serving note saved locally',
                    },
                    children: [
                      recipeImage('log-recent-image', 'berry-oats', 'Berry overnight oats'),
                    ],
                  },
                  action('log-add-recent', 'View sample day'),
                ],
              },
            ],
          },
        ],
      },
    },
    recipes: {
      id: 'recipes',
      name: 'Recipes',
      title: 'Recipes',
      description: 'Image-forward local recipe discovery.',
      root: {
        id: 'recipes-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('recipes-title', 'Recipes', 1),
          {
            id: 'recipes-search',
            type: 'SearchInput',
            props: { placeholder: 'Search local sample recipes', disabled: true },
          },
          {
            id: 'recipes-filter',
            type: 'ChipGroup',
            props: {
              disabled: true,
              items: [
                { value: 'quick', label: 'Quick' },
                { value: 'vegetable', label: 'Vegetable' },
                { value: 'fish', label: 'Fish' },
              ],
            },
          },
          {
            id: 'recipes-green-bowl',
            type: 'MediaExplorer',
            props: {
              selectionMode: 'single',
              tileSize: 148,
              items: [
                {
                  id: 'green-bowl-recipe',
                  kind: 'image',
                  name: 'Green grain bowl',
                  thumbnailUri: { mediaId: 'green-bowl' },
                },
                {
                  id: 'salmon-recipe',
                  kind: 'image',
                  name: 'Lemon herb salmon',
                  thumbnailUri: { mediaId: 'lemon-salmon' },
                },
                {
                  id: 'oats-recipe',
                  kind: 'image',
                  name: 'Berry overnight oats',
                  thumbnailUri: { mediaId: 'berry-oats' },
                },
              ],
              emptyText: 'No local sample recipes match this filter.',
            },
          },
          {
            id: 'recipes-featured',
            type: 'Card',
            props: { title: 'Green grain bowl', description: '35 minutes · local sample recipe' },
            children: [
              recipeImage('recipes-featured-image', 'green-bowl', 'Green grain bowl'),
              action('recipes-details', 'View recipe'),
            ],
          },
        ],
      },
    },
    plan: {
      id: 'plan',
      name: 'Plan',
      title: 'Meal plan',
      description: 'A deterministic sample daily meal plan.',
      root: {
        id: 'plan-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('plan-title', 'Meal plan', 1),
          {
            id: 'plan-modes',
            type: 'Tabs',
            props: { defaultValue: 'daily', accessibilityLabel: 'Meal plan modes' },
            children: [
              {
                id: 'plan-tab-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  { id: 'plan-daily-tab', type: 'Tab', props: { value: 'daily', label: 'Daily' } },
                  {
                    id: 'plan-weekly-tab',
                    type: 'Tab',
                    props: { value: 'weekly', label: 'Weekly' },
                  },
                  { id: 'plan-goals-tab', type: 'Tab', props: { value: 'goals', label: 'Goals' } },
                ],
              },
              {
                id: 'plan-daily-panel',
                type: 'TabPanel',
                props: { value: 'daily' },
                children: [
                  copy('plan-date', 'Sample Tuesday · local starter plan'),
                  {
                    id: 'plan-breakfast',
                    type: 'Card',
                    props: {
                      title: 'Breakfast',
                      description: 'Berry overnight oats · sample meal',
                    },
                    children: [
                      recipeImage('plan-breakfast-image', 'berry-oats', 'Berry overnight oats'),
                    ],
                  },
                  {
                    id: 'plan-lunch',
                    type: 'Card',
                    props: { title: 'Lunch', description: 'Green grain bowl · sample meal' },
                    children: [recipeImage('plan-lunch-image', 'green-bowl', 'Green grain bowl')],
                  },
                  {
                    id: 'plan-dinner',
                    type: 'Card',
                    props: { title: 'Dinner', description: 'Lemon herb salmon · sample meal' },
                    children: [
                      recipeImage('plan-dinner-image', 'lemon-salmon', 'Lemon herb salmon'),
                    ],
                  },
                  action('plan-add-meal', 'Browse recipes to add'),
                ],
              },
              {
                id: 'plan-weekly-panel',
                type: 'TabPanel',
                props: { value: 'weekly' },
                children: [
                  copy(
                    'plan-weekly-copy',
                    'The starter keeps one sample day visible until you connect your own planning data.',
                  ),
                ],
              },
              {
                id: 'plan-goals-panel',
                type: 'TabPanel',
                props: { value: 'goals' },
                children: [
                  copy(
                    'plan-goals-copy',
                    'Set personal preferences with a qualified professional when needed; this starter does not prescribe nutrition goals.',
                  ),
                ],
              },
            ],
          },
        ],
      },
    },
    progress: {
      id: 'progress',
      name: 'Progress',
      title: 'Progress',
      description: 'Truthful local progress states without health claims.',
      root: {
        id: 'progress-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('progress-title', 'Progress', 1),
          {
            id: 'progress-range',
            type: 'Tabs',
            props: { defaultValue: 'week', accessibilityLabel: 'Progress ranges' },
            children: [
              {
                id: 'progress-tab-list',
                type: 'TabList',
                props: { fill: true },
                children: [
                  { id: 'progress-week-tab', type: 'Tab', props: { value: 'week', label: 'Week' } },
                  {
                    id: 'progress-month-tab',
                    type: 'Tab',
                    props: { value: 'month', label: 'Month' },
                  },
                  { id: 'progress-year-tab', type: 'Tab', props: { value: 'year', label: 'Year' } },
                ],
              },
              {
                id: 'progress-week-panel',
                type: 'TabPanel',
                props: { value: 'week' },
                children: [
                  {
                    id: 'progress-ring',
                    type: 'ProgressRing',
                    props: {
                      value: 4,
                      max: 7,
                      centerValue: '4',
                      centerLabel: 'days noted',
                      accessibilityLabel: 'Four sample days noted this week',
                    },
                  },
                  {
                    id: 'progress-average',
                    type: 'MetricCard',
                    props: {
                      label: 'Weekly rhythm',
                      value: '4 days',
                      description: 'sample entries, not a target',
                      tone: 'success',
                    },
                  },
                  copy(
                    'progress-empty',
                    'No connected history yet. Add meals over time to see your own patterns.',
                  ),
                  action('progress-plan', 'Open meal plan'),
                ],
              },
              {
                id: 'progress-month-panel',
                type: 'TabPanel',
                props: { value: 'month' },
                children: [copy('progress-month-empty', 'No monthly sample history is available.')],
              },
              {
                id: 'progress-year-panel',
                type: 'TabPanel',
                props: { value: 'year' },
                children: [copy('progress-year-empty', 'No yearly sample history is available.')],
              },
            ],
          },
        ],
      },
    },
    community: {
      id: 'community',
      name: 'Community',
      title: 'Community',
      description: 'A supportive local sample feed.',
      root: {
        id: 'community-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('community-title', 'Community', 1),
          {
            id: 'community-filter',
            type: 'ChipGroup',
            props: {
              disabled: true,
              items: [
                { value: 'latest', label: 'Latest' },
                { value: 'ideas', label: 'Meal ideas' },
                { value: 'saved', label: 'Saved' },
              ],
            },
          },
          {
            id: 'community-post',
            type: 'Card',
            props: {
              title: 'Maya’s green bowl',
              description:
                'A local example post · reactions and comments need a connected community service.',
            },
            children: [recipeImage('community-post-image', 'green-bowl', 'Green grain bowl')],
          },
          copy(
            'community-offline',
            'Community is offline in this portable starter. Your local meal plan remains available.',
          ),
          action('community-home', 'Return home'),
        ],
      },
    },
    profile: {
      id: 'profile',
      name: 'Profile',
      title: 'Profile',
      description: 'Local preferences and privacy entry point.',
      root: {
        id: 'profile-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('profile-title', 'Maya Chen', 1),
          copy('profile-intro', 'NutriFlow starter profile · local sample data', 'lead'),
          {
            id: 'profile-streak',
            type: 'MetricCard',
            props: {
              label: 'Meal notes',
              value: '4 days',
              description: 'local sample activity',
              tone: 'success',
            },
          },
          heading('profile-preferences', 'Preferences'),
          {
            id: 'profile-dietary',
            type: 'Card',
            props: {
              title: 'Dietary preferences',
              description: 'No preferences set in this portable starter.',
            },
          },
          {
            id: 'profile-notifications',
            type: 'Switch',
            props: { children: 'Meal planning reminders', checked: false, disabled: true },
          },
          copy(
            'profile-integrations',
            'Connected apps are unavailable until a real integration is configured.',
          ),
          action('profile-community', 'Open community'),
          action('profile-settings', 'Privacy and settings'),
        ],
      },
    },
    'recipe-details': {
      id: 'recipe-details',
      name: 'Recipe details',
      title: 'Green grain bowl',
      description: 'A local sample recipe detail.',
      root: {
        id: 'recipe-details-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('recipe-details-title', 'Green grain bowl', 1),
          recipeImage('recipe-details-image', 'green-bowl', 'Green grain bowl'),
          copy('recipe-details-meta', '35 minutes · local sample recipe'),
          copy(
            'recipe-details-copy',
            'A flexible bowl with grains, greens, roasted vegetables, and a simple dressing.',
          ),
          action('recipe-add-plan', 'View meal plan'),
        ],
      },
    },
    settings: {
      id: 'settings',
      name: 'Settings',
      title: 'Privacy and settings',
      description: 'Portable profile controls.',
      root: {
        id: 'settings-root',
        type: 'Screen',
        props: { width: 'narrow', scroll: true },
        children: [
          heading('settings-title', 'Privacy and settings', 1),
          copy(
            'settings-copy',
            'NutriFlow stores only the portable sample state until you configure a service.',
          ),
          {
            id: 'settings-notifications',
            type: 'Switch',
            props: { children: 'Meal reminders', checked: false, disabled: true },
          },
          copy(
            'settings-privacy',
            'No health service, account connection, or medical profile is configured.',
          ),
          action('settings-profile', 'Back to profile'),
        ],
      },
    },
  },
  dataBindings: bindings,
  media: {
    assets: {
      'green-bowl': {
        id: 'green-bowl',
        name: 'Green grain bowl',
        kind: 'image',
        contentType: 'image/png',
        source: { kind: 'bundled', path: 'assets/images/green-bowl.png' },
        metadata: { width: 1254, height: 1254 },
      },
      'lemon-salmon': {
        id: 'lemon-salmon',
        name: 'Lemon herb salmon',
        kind: 'image',
        contentType: 'image/png',
        source: { kind: 'bundled', path: 'assets/images/lemon-salmon.png' },
        metadata: { width: 1254, height: 1254 },
      },
      'berry-oats': {
        id: 'berry-oats',
        name: 'Berry overnight oats',
        kind: 'image',
        contentType: 'image/png',
        source: { kind: 'bundled', path: 'assets/images/berry-oats.png' },
        metadata: { width: 1254, height: 1254 },
      },
      'nav-home': {
        id: 'nav-home',
        name: 'Home navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/home.svg' },
      },
      'nav-log': {
        id: 'nav-log',
        name: 'Log navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/log.svg' },
      },
      'nav-recipes': {
        id: 'nav-recipes',
        name: 'Recipes navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/recipes.svg' },
      },
      'nav-progress': {
        id: 'nav-progress',
        name: 'Progress navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/progress.svg' },
      },
      'nav-profile': {
        id: 'nav-profile',
        name: 'Profile navigation icon',
        kind: 'image',
        contentType: 'image/svg+xml',
        source: { kind: 'bundled', path: 'assets/images/svg/profile.svg' },
      },
    },
  },
} satisfies AppManifest;

import type {
  AppManifest,
  BindingExpression,
  ComponentDataBindingRegistry,
  UiNode,
} from '@ankhorage/contracts';
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

/*** Create one local-food confirmation before its in-memory meal-log update. */
function mealLogSummary(input: MealLogSummaryInput) {
  return {
    id: `log-${input.id}`,
    name: `${input.title} sample preview`,
    title: input.title,
    description: `Sample serving preview: ${input.serving}, ${input.energy}.`,
    root: {
      id: `log-${input.id}-root`,
      type: 'Screen',
      props: { width: 'default', scroll: true },
      children: [
        heading(`log-${input.id}-title`, input.title, 1),
        recipeImage(`log-${input.id}-image`, input.mediaId, input.title),
        {
          id: `log-${input.id}-serving`,
          type: 'MetricCard',
          props: {
            label: 'Serving',
            value: input.serving,
            description: `${input.energy} · local sample`,
          },
        },
        copy(
          `log-${input.id}-note`,
          'Add this local sample to today for this session. Personal entries are not persisted.',
        ),
        action(input.actionId, 'Add sample meal'),
      ],
    },
  };
}

type MealLogSummaryInput = {
  readonly actionId: string;
  readonly energy: string;
  readonly id: string;
  readonly mediaId: string;
  readonly serving: string;
  readonly title: string;
};

/*** Create one media-backed recipe detail screen for a specific local sample. */
function recipeDetail(input: RecipeDetailInput) {
  return {
    id: `recipe-details-${input.id}`,
    name: `${input.title} recipe details`,
    title: input.title,
    description: 'A local sample recipe detail.',
    root: {
      id: `recipe-details-${input.id}-root`,
      type: 'Screen',
      props: { width: 'default', scroll: true },
      children: [
        heading(`recipe-details-${input.id}-title`, input.title, 1),
        recipeImage(`recipe-details-${input.id}-image`, input.mediaId, input.title),
        copy(`recipe-details-${input.id}-meta`, input.meta),
        copy(`recipe-details-${input.id}-copy`, input.copy),
        action('recipe-add-plan', 'View meal plan'),
      ],
    },
  };
}

/*** Create the success confirmation for the sample meal selected by the preceding update. */
function mealAddedConfirmation(input: MealLogSummaryInput) {
  return {
    id: `log-added-${input.id}`,
    name: `${input.title} added`,
    title: `${input.title} added`,
    description: 'An in-memory sample meal confirmation.',
    root: {
      id: `log-added-${input.id}-root`,
      type: 'Screen',
      props: { width: 'narrow', scroll: true },
      children: [
        heading(`log-added-${input.id}-title`, `${input.title} added`, 1),
        copy(
          `log-added-${input.id}-copy`,
          `${input.title} was added to this session's meal log. Entries are not persisted.`,
        ),
        action('log-added-home', 'View today’s meals'),
      ],
    },
  };
}

type RecipeDetailInput = {
  readonly copy: string;
  readonly id: string;
  readonly mediaId: string;
  readonly meta: string;
  readonly title: string;
};

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

/*** Bind one local sample to Runtime's atomic append before its success-only confirmation. */
function addSampleMealBinding(input: MealLogSummaryInput): ComponentDataBindingRegistry[string] {
  return {
    componentId: input.actionId,
    componentType: 'Button',
    events: {
      press: [
        {
          target: {
            capability: 'state.update',
            input: {
              path: { kind: 'literal', value: 'nutriflow.meals' },
              update: {
                kind: 'object',
                fields: {
                  kind: { kind: 'literal', value: 'append' },
                  value: {
                    kind: 'object',
                    fields: {
                      energy: { kind: 'literal', value: input.energy },
                      serving: { kind: 'literal', value: input.serving },
                      title: { kind: 'literal', value: input.title },
                    },
                  },
                },
              },
            },
            result: 'meal-log-update',
          },
        },
        {
          when: {
            source: { capability: 'state.update', result: 'meal-log-update' },
            operator: 'exists',
          },
          target: {
            capability: 'navigator.navigate',
            input: { route: { kind: 'literal', value: `/log/added/${input.id}` } },
          },
        },
      ],
    },
  };
}

/*** Read NutriFlow's single session-only meal collection, initially empty for a new Runtime session. */
function mealCollection(): BindingExpression {
  return {
    kind: 'fallback',
    value: { capability: 'state.nutriflow', path: 'meals' },
    fallback: { kind: 'literal', value: [] },
  };
}

/*** Derive the logged-meal count from NutriFlow's canonical collection through Runtime. */
function mealCount(): BindingExpression {
  return { kind: 'transform', value: mealCollection(), transforms: ['length'] };
}

/*** Read one repeated meal field from the current Runtime repeat item. */
function repeatedMealField(path: string): BindingExpression {
  return { capability: 'context.meal', path };
}

const bindings: ComponentDataBindingRegistry = {
  'home-log-meal': navigateBinding('home-log-meal', 'Button', '/log'),
  'home-plan': navigateBinding('home-plan', 'Button', '/plan'),
  'home-recipes': navigateBinding('home-recipes', 'MediaCard', '/recipes'),
  'log-search': navigateBinding('log-search', 'SearchInput', '/log/results', 'submit'),
  'log-search-results': navigateBinding('log-search-results', 'Button', '/log/results'),
  'log-manual-entry': navigateBinding('log-manual-entry', 'Button', '/log/results'),
  'log-add-recent': navigateBinding('log-add-recent', 'Button', '/log/berry-oats'),
  'log-result-berry-oats': navigateBinding('log-result-berry-oats', 'Button', '/log/berry-oats'),
  'log-result-green-bowl': navigateBinding('log-result-green-bowl', 'Button', '/log/green-bowl'),
  'log-result-lemon-salmon': navigateBinding(
    'log-result-lemon-salmon',
    'Button',
    '/log/lemon-salmon',
  ),
  'log-add-berry-oats': addSampleMealBinding({
    id: 'berry-oats',
    title: 'Berry overnight oats',
    serving: '1 bowl',
    energy: '320 kcal',
    mediaId: 'berry-oats',
    actionId: 'log-add-berry-oats',
  }),
  'log-add-green-bowl': addSampleMealBinding({
    id: 'green-bowl',
    title: 'Green grain bowl',
    serving: '1 bowl',
    energy: '480 kcal',
    mediaId: 'green-bowl',
    actionId: 'log-add-green-bowl',
  }),
  'log-add-lemon-salmon': addSampleMealBinding({
    id: 'lemon-salmon',
    title: 'Lemon herb salmon',
    serving: '1 plate',
    energy: '540 kcal',
    mediaId: 'lemon-salmon',
    actionId: 'log-add-lemon-salmon',
  }),
  'log-added-home': navigateBinding('log-added-home', 'Button', '/'),
  'recipes-green-bowl': navigateBinding('recipes-green-bowl', 'MediaCard', '/recipes/green-bowl'),
  'recipes-lemon-salmon': navigateBinding(
    'recipes-lemon-salmon',
    'MediaCard',
    '/recipes/lemon-salmon',
  ),
  'recipes-berry-oats': navigateBinding('recipes-berry-oats', 'MediaCard', '/recipes/berry-oats'),
  'recipe-add-plan': navigateBinding('recipe-add-plan', 'Button', '/plan'),
  'plan-add-meal': navigateBinding('plan-add-meal', 'Button', '/recipes'),
  'progress-plan': navigateBinding('progress-plan', 'Button', '/plan'),
  'profile-community': navigateBinding('profile-community', 'Button', '/community'),
  'profile-settings': navigateBinding('profile-settings', 'Button', '/settings'),
  'community-home': navigateBinding('community-home', 'Button', '/'),
  'settings-profile': navigateBinding('settings-profile', 'Button', '/profile'),
  'home-progress': {
    componentId: 'home-progress',
    componentType: 'ProgressRing',
    props: {
      value: { value: mealCount() },
      centerValue: { value: mealCount() },
      centerLabel: { value: { kind: 'literal', value: 'Meals logged' } },
    },
  },
  'home-support': {
    componentId: 'home-support',
    componentType: 'Text',
    props: {
      text: { value: mealCount() },
    },
  },
  'home-meal': {
    componentId: 'home-meal',
    componentType: 'Card',
    props: {
      title: { value: repeatedMealField('title') },
      description: { value: repeatedMealField('serving') },
      accessibilityLabel: { value: repeatedMealField('title') },
    },
  },
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
  state: { provider: 'legend', persistence: false },
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
      { name: 'log-results', path: '/log/results', screenId: 'log-results' },
      { name: 'log-berry-oats', path: '/log/berry-oats', screenId: 'log-berry-oats' },
      { name: 'log-green-bowl', path: '/log/green-bowl', screenId: 'log-green-bowl' },
      { name: 'log-lemon-salmon', path: '/log/lemon-salmon', screenId: 'log-lemon-salmon' },
      {
        name: 'log-added-berry-oats',
        path: '/log/added/berry-oats',
        screenId: 'log-added-berry-oats',
      },
      {
        name: 'log-added-green-bowl',
        path: '/log/added/green-bowl',
        screenId: 'log-added-green-bowl',
      },
      {
        name: 'log-added-lemon-salmon',
        path: '/log/added/lemon-salmon',
        screenId: 'log-added-lemon-salmon',
      },
      { name: 'plan', path: '/plan', screenId: 'plan' },
      { name: 'community', path: '/community', screenId: 'community' },
      {
        name: 'recipe-details-green-bowl',
        path: '/recipes/green-bowl',
        screenId: 'recipe-details-green-bowl',
      },
      {
        name: 'recipe-details-lemon-salmon',
        path: '/recipes/lemon-salmon',
        screenId: 'recipe-details-lemon-salmon',
      },
      {
        name: 'recipe-details-berry-oats',
        path: '/recipes/berry-oats',
        screenId: 'recipe-details-berry-oats',
      },
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
              centerLabel: 'Meals logged',
              accessibilityLabel: 'Meals logged in this session',
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
                  description: 'from today’s sample meals',
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
            id: 'home-meal-list',
            type: 'List',
            props: {
              accessibilityLabel: 'Meals logged in this session',
              emptyText: 'No meals logged yet. Add a local sample to begin.',
            },
            repeat: { source: mealCollection(), itemAlias: 'meal' },
            children: [{ id: 'home-meal', type: 'Card', props: {} }],
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
      title: 'Preview a meal',
      description: 'Browse local samples; food search and scanning are not configured.',
      root: {
        id: 'log-meal-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('log-meal-title', 'Preview a meal', 1),
          {
            id: 'log-meal-modes',
            type: 'Tabs',
            props: { defaultValue: 'search', accessibilityLabel: 'Meal preview modes' },
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
                    props: { placeholder: 'Search local sample foods' },
                  },
                  copy(
                    'log-search-note',
                    'Submit a search to browse the portable starter’s local sample foods.',
                  ),
                  action('log-search-results', 'Browse sample foods'),
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
                      description: 'Scanner integration is not configured in this starter.',
                      overlayTitle: 'Use local sample foods instead',
                      overlayDescription: 'Barcode scans need a host camera capability.',
                      manualEntryLabel: 'Browse sample foods',
                    },
                  },
                  action('log-manual-entry', 'Browse sample foods'),
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
                      description: 'Berry overnight oats · 1 bowl · 320 kcal',
                    },
                    children: [
                      recipeImage('log-recent-image', 'berry-oats', 'Berry overnight oats'),
                    ],
                  },
                  action('log-add-recent', 'Review serving'),
                ],
              },
            ],
          },
        ],
      },
    },
    'log-results': {
      id: 'log-results',
      name: 'Sample food results',
      title: 'Sample food results',
      description: 'Deterministic local foods for the portable starter.',
      root: {
        id: 'log-results-root',
        type: 'Screen',
        props: { width: 'default', scroll: true },
        children: [
          heading('log-results-title', 'Sample food results', 1),
          copy(
            'log-results-copy',
            'These local samples keep the meal-log flow usable without a food service.',
          ),
          {
            id: 'log-results-berry-oats-card',
            type: 'Card',
            props: { title: 'Berry overnight oats', description: '1 bowl · 320 kcal' },
            children: [
              recipeImage('log-results-berry-oats-image', 'berry-oats', 'Berry overnight oats'),
              action('log-result-berry-oats', 'Choose serving'),
            ],
          },
          {
            id: 'log-results-green-bowl-card',
            type: 'Card',
            props: { title: 'Green grain bowl', description: '1 bowl · 480 kcal' },
            children: [
              recipeImage('log-results-green-bowl-image', 'green-bowl', 'Green grain bowl'),
              action('log-result-green-bowl', 'Choose serving'),
            ],
          },
          {
            id: 'log-results-lemon-salmon-card',
            type: 'Card',
            props: { title: 'Lemon herb salmon', description: '1 plate · 540 kcal' },
            children: [
              recipeImage('log-results-lemon-salmon-image', 'lemon-salmon', 'Lemon herb salmon'),
              action('log-result-lemon-salmon', 'Choose serving'),
            ],
          },
        ],
      },
    },
    'log-berry-oats': mealLogSummary({
      id: 'berry-oats',
      title: 'Berry overnight oats',
      serving: '1 bowl',
      energy: '320 kcal',
      mediaId: 'berry-oats',
      actionId: 'log-add-berry-oats',
    }),
    'log-green-bowl': mealLogSummary({
      id: 'green-bowl',
      title: 'Green grain bowl',
      serving: '1 bowl',
      energy: '480 kcal',
      mediaId: 'green-bowl',
      actionId: 'log-add-green-bowl',
    }),
    'log-lemon-salmon': mealLogSummary({
      id: 'lemon-salmon',
      title: 'Lemon herb salmon',
      serving: '1 plate',
      energy: '540 kcal',
      mediaId: 'lemon-salmon',
      actionId: 'log-add-lemon-salmon',
    }),
    'log-added-berry-oats': mealAddedConfirmation({
      id: 'berry-oats',
      title: 'Berry overnight oats',
      serving: '1 bowl',
      energy: '320 kcal',
      mediaId: 'berry-oats',
      actionId: 'log-add-berry-oats',
    }),
    'log-added-green-bowl': mealAddedConfirmation({
      id: 'green-bowl',
      title: 'Green grain bowl',
      serving: '1 bowl',
      energy: '480 kcal',
      mediaId: 'green-bowl',
      actionId: 'log-add-green-bowl',
    }),
    'log-added-lemon-salmon': mealAddedConfirmation({
      id: 'lemon-salmon',
      title: 'Lemon herb salmon',
      serving: '1 plate',
      energy: '540 kcal',
      mediaId: 'lemon-salmon',
      actionId: 'log-add-lemon-salmon',
    }),
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
            type: 'MediaCard',
            props: {
              title: 'Green grain bowl',
              description: '35 minutes · local sample recipe',
              imageSource: { mediaId: 'green-bowl' },
              imageLabel: 'Green grain bowl',
            },
          },
          {
            id: 'recipes-lemon-salmon',
            type: 'MediaCard',
            props: {
              title: 'Lemon herb salmon',
              description: '30 minutes · local sample recipe',
              imageSource: { mediaId: 'lemon-salmon' },
              imageLabel: 'Lemon herb salmon',
            },
          },
          {
            id: 'recipes-berry-oats',
            type: 'MediaCard',
            props: {
              title: 'Berry overnight oats',
              description: '10 minutes · local sample recipe',
              imageSource: { mediaId: 'berry-oats' },
              imageLabel: 'Berry overnight oats',
            },
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
                  action('plan-add-meal', 'Browse sample recipes'),
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
                    'No connected history yet. Connect a meal service to see your own patterns.',
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
    'recipe-details-green-bowl': recipeDetail({
      id: 'green-bowl',
      title: 'Green grain bowl',
      mediaId: 'green-bowl',
      meta: '35 minutes · local sample recipe',
      copy: 'A flexible bowl with grains, greens, roasted vegetables, and a simple dressing.',
    }),
    'recipe-details-lemon-salmon': recipeDetail({
      id: 'lemon-salmon',
      title: 'Lemon herb salmon',
      mediaId: 'lemon-salmon',
      meta: '30 minutes · local sample recipe',
      copy: 'A bright baked salmon plate with herbs, lemon, and seasonal vegetables.',
    }),
    'recipe-details-berry-oats': recipeDetail({
      id: 'berry-oats',
      title: 'Berry overnight oats',
      mediaId: 'berry-oats',
      meta: '10 minutes · local sample recipe',
      copy: 'A make-ahead oat bowl with berries, yogurt, and a handful of seeds.',
    }),
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
            'NutriFlow includes portable sample content until you configure a service.',
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

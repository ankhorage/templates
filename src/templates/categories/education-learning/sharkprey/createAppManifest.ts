import type {
  AppManifest,
  BindingValueTransform,
  ComponentDataBinding,
  EventBinding,
} from '@ankhorage/contracts';
import { validateNavigatorManifest } from '@ankhorage/navigator';

/*** Create SharkPrey's portable ZORA screen composition with owner-validated navigation. */
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

function createAnswerNavigationBinding(correct: boolean, verdict: string): EventBinding {
  const answerOperation = {
    apiId: 'poker-training',
    endpointId: 'tasks',
    operationId: 'checkPokerTrainingTaskAnswer',
  } as const;

  return {
    target: { kind: 'action', type: 'navigate' },
    when: {
      source: { kind: 'operation', operation: answerOperation, path: 'correct' },
      operator: 'eq',
      value: correct,
    },
    input: {
      route: { kind: 'literal', value: '/answer-explanation' },
      params: {
        kind: 'object',
        fields: {
          taskId: {
            kind: 'source',
            source: { kind: 'operation', operation: answerOperation, path: 'taskId' },
          },
          selectedOptionLabel: {
            kind: 'source',
            source: { kind: 'context', path: 'option.label' },
          },
          correctOptionValue: {
            kind: 'source',
            source: { kind: 'operation', operation: answerOperation, path: 'correctOptionValue' },
          },
          explanation: {
            kind: 'source',
            source: { kind: 'operation', operation: answerOperation, path: 'explanation' },
          },
          verdict: { kind: 'literal', value: verdict },
        },
      },
    },
  };
}

function createOperationTextBinding(
  componentId: string,
  path: string,
  operationId: string,
  transforms?: readonly BindingValueTransform[],
): ComponentDataBinding {
  return {
    componentId,
    componentType: 'Text',
    props: {
      text: {
        source: {
          kind: 'operation',
          operation: { apiId: 'poker-training', endpointId: 'tasks', operationId },
          path,
        },
        fallback: { value: '' },
        ...(transforms ? { transforms } : {}),
      },
    },
  };
}

function createRouteTextBinding(componentId: string, path: string): ComponentDataBinding {
  return {
    componentId,
    componentType: 'Text',
    props: {
      text: {
        source: { kind: 'context', path: `route.params.${path}` },
        fallback: { value: '' },
      },
    },
  };
}

function createTrainingDifficultyBinding(
  componentId: string,
  difficulty: number,
): ComponentDataBinding {
  const listOperation = {
    apiId: 'poker-training',
    endpointId: 'tasks',
    operationId: 'listPokerTrainingTasks',
  } as const;

  return {
    componentId,
    componentType: 'Button',
    events: {
      press: [
        {
          target: { kind: 'operation', operation: listOperation },
          input: {
            gameCategory: {
              kind: 'source',
              source: { kind: 'context', path: 'route.params.gameCategory' },
            },
            tableSize: {
              kind: 'source',
              source: { kind: 'context', path: 'route.params.tableSize' },
            },
            street: {
              kind: 'source',
              source: { kind: 'context', path: 'route.params.street' },
            },
            difficulty: { kind: 'literal', value: difficulty },
            limit: { kind: 'literal', value: 1 },
          },
        },
        {
          target: { kind: 'action', type: 'navigate' },
          when: {
            source: { kind: 'operation', operation: listOperation, path: '0.id' },
            operator: 'exists',
          },
          input: {
            route: { kind: 'literal', value: '/decision-table' },
            params: {
              kind: 'object',
              fields: {
                taskId: {
                  kind: 'source',
                  source: { kind: 'operation', operation: listOperation, path: '0.id' },
                },
              },
            },
          },
        },
      ],
    },
  };
}

const manifest: AppManifest = {
  metadata: {
    name: 'SharkPrey',
    slug: 'sharkprey',
    version: '1.0.0',
    category: 'education_learning',
    themeId: 'sharkprey',
  },
  themes: {
    sharkprey: {
      id: 'sharkprey',
      name: 'SharkPrey',
      light: {
        primaryColor: '#0060FF',
        harmony: 'monochromatic',
      },
      dark: {
        primaryColor: '#0060FF',
        harmony: 'monochromatic',
      },
      tokens: {
        spacing: {
          none: 0,
          xs: 4,
          s: 8,
          m: 16,
          l: 24,
          xl: 24,
          xxl: 40,
        },
        radii: {
          none: 0,
          s: 6,
          m: 8,
          l: 10,
          full: 9999,
        },
        typography: {
          headings: {
            '1': {
              size: 32,
              lineHeight: 38,
              weight: 'bold',
            },
            '2': {
              size: 24,
              lineHeight: 30,
              weight: 'bold',
            },
            '3': {
              size: 18,
              lineHeight: 24,
              weight: 'semiBold',
            },
          },
        },
      },
      recipes: {
        components: {
          Button: {
            color: 'secondary',
            size: 'l',
          },
          RadioGroup: {
            color: 'secondary',
            size: 'l',
            gap: 's',
          },
        },
      },
    },
  },
  activeThemeId: 'sharkprey',
  dataBindings: {
    'setup-game': {
      componentId: 'setup-game',
      componentType: 'RadioGroup',
      events: {
        valueChange: [
          {
            target: { kind: 'action', type: 'navigate' },
            input: {
              route: { kind: 'literal', value: '/training-setup/table' },
              params: {
                kind: 'object',
                fields: {
                  gameCategory: {
                    kind: 'source',
                    source: { kind: 'event', path: 'payload.value' },
                  },
                },
              },
            },
          },
        ],
      },
    },
    'setup-table': {
      componentId: 'setup-table',
      componentType: 'RadioGroup',
      events: {
        valueChange: [
          {
            target: { kind: 'action', type: 'navigate' },
            input: {
              route: { kind: 'literal', value: '/training-setup/street' },
              params: {
                kind: 'object',
                fields: {
                  gameCategory: {
                    kind: 'source',
                    source: { kind: 'context', path: 'route.params.gameCategory' },
                  },
                  tableSize: {
                    kind: 'source',
                    source: { kind: 'event', path: 'payload.value' },
                  },
                },
              },
            },
          },
        ],
      },
    },
    'setup-street': {
      componentId: 'setup-street',
      componentType: 'RadioGroup',
      events: {
        valueChange: [
          {
            target: { kind: 'action', type: 'navigate' },
            input: {
              route: { kind: 'literal', value: '/training-setup/difficulty' },
              params: {
                kind: 'object',
                fields: {
                  gameCategory: {
                    kind: 'source',
                    source: { kind: 'context', path: 'route.params.gameCategory' },
                  },
                  tableSize: {
                    kind: 'source',
                    source: { kind: 'context', path: 'route.params.tableSize' },
                  },
                  street: {
                    kind: 'source',
                    source: { kind: 'event', path: 'payload.value' },
                  },
                },
              },
            },
          },
        ],
      },
    },
    'setup-difficulty-1': createTrainingDifficultyBinding('setup-difficulty-1', 1),
    'setup-difficulty-2': createTrainingDifficultyBinding('setup-difficulty-2', 2),
    'setup-difficulty-3': createTrainingDifficultyBinding('setup-difficulty-3', 3),
    'setup-difficulty-4': createTrainingDifficultyBinding('setup-difficulty-4', 4),
    'setup-difficulty-5': createTrainingDifficultyBinding('setup-difficulty-5', 5),
    'decision-poker-table': {
      componentId: 'decision-poker-table',
      componentType: 'PokerTrainingTable',
      props: {
        task: {
          source: {
            kind: 'operation',
            operation: {
              apiId: 'poker-training',
              endpointId: 'tasks',
              operationId: 'getPokerTrainingTaskById',
            },
            path: 'task',
          },
          fallback: { value: {} },
          loading: {
            state: 'loading',
            fallback: { value: {} },
            message: 'Loading training task.',
          },
          empty: {
            state: 'empty',
            fallback: { value: {} },
            message: 'No published training task is available.',
          },
          error: {
            state: 'error',
            fallback: { value: {} },
            message: 'The training task could not be loaded.',
          },
        },
      },
    },
    'decision-question': {
      componentId: 'decision-question',
      componentType: 'Heading',
      props: {
        text: {
          source: {
            kind: 'operation',
            operation: {
              apiId: 'poker-training',
              endpointId: 'tasks',
              operationId: 'getPokerTrainingTaskById',
            },
            path: 'task.prompt',
          },
          fallback: { value: 'No task loaded.' },
          loading: {
            state: 'loading',
            fallback: { value: 'Loading training task…' },
          },
          empty: {
            state: 'empty',
            fallback: { value: 'No published training task is available.' },
          },
          error: {
            state: 'error',
            fallback: { value: 'The training task could not be loaded.' },
          },
        },
      },
    },
    'decision-action': {
      componentId: 'decision-action',
      componentType: 'Text',
      props: {
        text: {
          source: {
            kind: 'operation',
            operation: {
              apiId: 'poker-training',
              endpointId: 'tasks',
              operationId: 'getPokerTrainingTaskById',
            },
            path: 'task.historyText',
          },
          fallback: { value: '' },
        },
      },
    },
    'decision-category': {
      componentId: 'decision-category',
      componentType: 'Text',
      props: {
        text: {
          source: {
            kind: 'operation',
            operation: {
              apiId: 'poker-training',
              endpointId: 'tasks',
              operationId: 'getPokerTrainingTaskById',
            },
            path: 'task.street',
          },
          fallback: { value: '' },
          transforms: ['uppercase'],
        },
      },
    },
    'decision-answer-button': {
      componentId: 'decision-answer-button',
      componentType: 'Button',
      props: {
        children: {
          source: { kind: 'context', path: 'option.label' },
          fallback: { value: 'Choose answer' },
        },
      },
      events: {
        press: [
          {
            target: {
              kind: 'operation',
              operation: {
                apiId: 'poker-training',
                endpointId: 'tasks',
                operationId: 'checkPokerTrainingTaskAnswer',
              },
            },
            input: {
              taskId: {
                kind: 'source',
                source: {
                  kind: 'operation',
                  operation: {
                    apiId: 'poker-training',
                    endpointId: 'tasks',
                    operationId: 'getPokerTrainingTaskById',
                  },
                  path: 'task.id',
                },
              },
              selectedOptionValue: {
                kind: 'source',
                source: { kind: 'context', path: 'option.value' },
              },
            },
          },
          createAnswerNavigationBinding(true, 'Correct'),
          createAnswerNavigationBinding(false, 'Not quite'),
        ],
      },
    },
    'review-poker-table': {
      componentId: 'review-poker-table',
      componentType: 'PokerTrainingTable',
      props: {
        task: {
          source: {
            kind: 'operation',
            operation: {
              apiId: 'poker-training',
              endpointId: 'tasks',
              operationId: 'getPokerTrainingTaskById',
            },
            path: 'task',
          },
          fallback: { value: {} },
          loading: {
            state: 'loading',
            fallback: { value: {} },
            message: 'Loading reviewed hand.',
          },
          empty: {
            state: 'empty',
            fallback: { value: {} },
            message: 'The reviewed hand is unavailable.',
          },
          error: {
            state: 'error',
            fallback: { value: {} },
            message: 'The reviewed hand could not be loaded.',
          },
        },
      },
    },
    'review-category': createOperationTextBinding(
      'review-category',
      'task.street',
      'getPokerTrainingTaskById',
      ['uppercase'],
    ),
    'review-verdict': createRouteTextBinding('review-verdict', 'verdict'),
    'review-chosen-value': createRouteTextBinding('review-chosen-value', 'selectedOptionLabel'),
    'review-best-value': createRouteTextBinding('review-best-value', 'correctOptionValue'),
    'review-why-copy': createRouteTextBinding('review-why-copy', 'explanation'),
  },
  splashScreen: {
    backgroundColor: '#040404',
    image: { mediaId: 'sharkprey-splash' },
    imageWidth: 280,
    resizeMode: 'contain',
    dark: {
      backgroundColor: '#040404',
      image: { mediaId: 'sharkprey-splash' },
    },
  },
  infra: {
    apis: {
      'poker-training': {
        id: 'poker-training',
        name: 'Poker training',
        origin: 'external',
        protocol: 'rest',
        baseUrl: 'https://api.ankhorage.com/v1/poker',
        openApi: { url: 'https://api.ankhorage.com/openapi.json' },
        endpoints: {
          tasks: {
            id: 'tasks',
            kind: 'http',
            path: '/training/tasks',
            operations: {
              listPokerTrainingTasks: {
                id: 'listPokerTrainingTasks',
                endpointId: 'tasks',
                protocol: 'http',
                intent: 'read',
                method: 'GET',
                path: '/training/tasks',
                request: {
                  parameters: [
                    {
                      name: 'gameCategory',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'tableSize',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'street',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'difficulty',
                      location: 'query',
                      schema: { type: 'integer' },
                    },
                    {
                      name: 'tags',
                      location: 'query',
                      schema: { type: 'string' },
                    },
                    {
                      name: 'limit',
                      location: 'query',
                      schema: { type: 'integer' },
                    },
                  ],
                },
                response: {
                  status: 200,
                  contentType: 'application/json',
                  schema: { type: 'array', items: { type: 'object' } },
                },
              },
              getPokerTrainingTaskById: {
                id: 'getPokerTrainingTaskById',
                endpointId: 'tasks',
                protocol: 'http',
                intent: 'read',
                method: 'GET',
                path: '/training/tasks/{taskId}',
                request: {
                  parameters: [
                    {
                      name: 'taskId',
                      location: 'path',
                      required: true,
                      schema: { type: 'string', format: 'uuid' },
                    },
                  ],
                },
                response: {
                  status: 200,
                  contentType: 'application/json',
                  schema: {
                    type: 'object',
                    required: ['task', 'options'],
                    properties: {
                      task: { type: 'object' },
                      options: { type: 'array', items: { type: 'object' } },
                    },
                  },
                },
              },
              getPokerTrainingTaskBySlug: {
                id: 'getPokerTrainingTaskBySlug',
                endpointId: 'tasks',
                protocol: 'http',
                intent: 'read',
                method: 'GET',
                path: '/training/tasks/by-slug/{slug}',
                request: {
                  parameters: [
                    {
                      name: 'slug',
                      location: 'path',
                      required: true,
                      schema: { type: 'string' },
                    },
                  ],
                },
                response: {
                  status: 200,
                  contentType: 'application/json',
                  schema: {
                    type: 'object',
                    required: ['task', 'options'],
                    properties: {
                      task: { type: 'object' },
                      options: { type: 'array', items: { type: 'object' } },
                    },
                  },
                },
              },
              checkPokerTrainingTaskAnswer: {
                id: 'checkPokerTrainingTaskAnswer',
                endpointId: 'tasks',
                protocol: 'http',
                intent: 'action',
                method: 'POST',
                path: '/training/tasks/{taskId}/answer',
                request: {
                  contentType: 'application/json',
                  parameters: [
                    {
                      name: 'taskId',
                      location: 'path',
                      required: true,
                      schema: { type: 'string', format: 'uuid' },
                    },
                    {
                      name: 'selectedOptionValue',
                      location: 'body',
                      required: true,
                      schema: { type: 'string' },
                    },
                  ],
                  schema: {
                    type: 'object',
                    required: ['selectedOptionValue'],
                    properties: { selectedOptionValue: { type: 'string' } },
                  },
                },
                response: {
                  status: 200,
                  contentType: 'application/json',
                  schema: {
                    type: 'object',
                    required: [
                      'taskId',
                      'selectedOptionValue',
                      'correct',
                      'correctOptionValue',
                      'explanation',
                    ],
                    properties: {
                      taskId: { type: 'string', format: 'uuid' },
                      selectedOptionValue: { type: 'string' },
                      correct: { type: 'boolean' },
                      correctOptionValue: { type: 'string' },
                      explanation: { type: 'string' },
                      selectedOptionExplanation: { type: ['string', 'null'] },
                      correctOptionExplanation: { type: ['string', 'null'] },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    environments: {
      local: {
        deployment: {
          compute: { provider: 'local' },
          runtime: { provider: 'minikube' },
        },
        database: {
          provider: 'supabase',
          tier: 'dev',
        },
        objectStorage: {
          provider: 'supabase',
          buckets: { media: true },
        },
        secretStore: {
          provider: 'supabase-vault',
        },
        auth: {
          provider: 'supabase',
          scope: 'global',
          flow: {
            signInRoute: 'sign-in',
            signUpRoute: 'sign-up',
            signOutRoute: 'sign-out',
            forgotPasswordRoute: 'forgot-password',
            postSignInRoute: 'onboarding',
            unauthorizedRoute: 'sign-in',
          },
          signIn: {
            identifiers: ['email'],
          },
          signUp: {
            requiredFields: ['email', 'password'],
            optionalFields: ['firstName', 'lastName'],
            signUpPolicy: 'autoSignIn',
          },
          profile: {
            fields: ['email', 'firstName', 'lastName'],
          },
        },
      },
    },
    modules: {},
  },
  state: {
    provider: 'legend',
    persistence: false,
  },
  settings: {
    localization: {
      defaultLocale: 'en',
      locales: ['en'],
    },
  },
  navigator: {
    type: 'stack',
    implementation: 'native',
    options: {
      headerShown: false,
    },
    initialRouteName: 'onboarding',
    routes: [
      {
        name: 'onboarding',
        screenId: 'onboarding',
      },
      {
        name: '(tabs)',
        navigator: {
          type: 'tabs',
          implementation: 'headless',
          presentation: 'responsive',
          responsive: {
            compact: 'bottom',
            medium: 'rail',
            expanded: 'sidebar',
          },
          initialRouteName: '(train)',
          routes: [
            {
              name: '(train)',
              path: '/training-setup',
              label: 'Train',
              icon: {
                source: {
                  mediaId: 'sharkprey-train-icon',
                },
              },
              navigator: {
                type: 'stack',
                implementation: 'native',
                options: {
                  headerShown: false,
                },
                initialRouteName: 'training-setup',
                routes: [
                  {
                    name: 'training-setup',
                    path: '/training-setup',
                    screenId: 'training-setup',
                  },
                  {
                    name: 'training-table-size',
                    path: '/training-setup/table',
                    screenId: 'training-table-size',
                  },
                  {
                    name: 'training-street',
                    path: '/training-setup/street',
                    screenId: 'training-street',
                  },
                  {
                    name: 'training-difficulty',
                    path: '/training-setup/difficulty',
                    screenId: 'training-difficulty',
                  },
                  {
                    name: 'decision-table',
                    path: '/decision-table',
                    screenId: 'decision-table',
                  },
                  {
                    name: 'answer-explanation',
                    path: '/answer-explanation',
                    screenId: 'answer-explanation',
                  },
                  {
                    name: 'session-summary',
                    path: '/session-summary',
                    screenId: 'session-summary',
                  },
                ],
              },
            },
            {
              name: 'history',
              path: '/history',
              label: 'History',
              screenId: 'hand-history',
              icon: {
                source: {
                  mediaId: 'sharkprey-history-icon',
                },
              },
            },
            {
              name: 'stats',
              path: '/stats',
              label: 'Stats',
              screenId: 'stats',
              icon: {
                source: {
                  mediaId: 'sharkprey-stats-icon',
                },
              },
            },
            {
              name: 'learn',
              path: '/learn',
              label: 'Learn',
              screenId: 'learn',
              icon: {
                source: {
                  mediaId: 'sharkprey-learn-icon',
                },
              },
            },
            {
              name: 'settings',
              path: '/settings',
              label: 'Settings',
              screenId: 'settings',
              icon: {
                source: {
                  mediaId: 'sharkprey-settings-icon',
                },
              },
            },
          ],
        },
      },
    ],
  },
  screens: {
    onboarding: {
      id: 'onboarding',
      name: 'Where are you starting?',
      title: 'Where are you starting?',
      description: 'Live poker training backed by the production Ankhorage gateway.',
      root: {
        id: 'onboarding-screen',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'onboarding-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'onboarding-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'onboarding-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'onboarding-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'onboarding-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'onboarding-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'onboarding-title',
                type: 'Heading',
                props: {
                  text: 'Where are you starting?',
                  level: 1,
                  size: 'h1',
                },
                style: {
                  fontSize: 40,
                  lineHeight: 42,
                },
              },
              {
                id: 'onboarding-copy',
                type: 'View',
                props: {},
                style: {
                  gap: 0,
                },
                children: [
                  {
                    id: 'onboarding-intro',
                    type: 'Text',
                    props: {
                      text: 'Improve your game. Become the shark.',
                    },
                    style: {
                      fontSize: 14,
                      lineHeight: 21,
                    },
                  },
                  {
                    id: 'onboarding-detail',
                    type: 'Text',
                    props: {
                      text: 'Train one decision at a time—with feedback that explains why.',
                    },
                    style: {
                      fontSize: 14,
                      lineHeight: 21,
                    },
                  },
                ],
              },
              {
                id: 'onboarding-level',
                type: 'RadioGroup',
                props: {
                  options: [
                    {
                      value: 'new',
                      label: 'New to NLHE',
                      iconSource: {
                        mediaId: 'sharkprey-graduation-icon',
                      },
                    },
                    {
                      value: 'ranges',
                      label: 'Learning the ranges',
                      iconSource: {
                        mediaId: 'sharkprey-stats-icon',
                      },
                    },
                    {
                      value: 'experienced',
                      label: 'Experienced player',
                      iconSource: {
                        mediaId: 'sharkprey-star-icon',
                      },
                    },
                  ],
                  defaultValue: 'ranges',
                  presentation: 'card',
                  columns: 1,
                  contentOrientation: 'horizontal',
                  color: 'secondary',
                  size: 'l',
                  gap: 'm',
                },
              },
              {
                id: 'onboarding-rules',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'onboarding-rules-icon',
                    type: 'Icon',
                    props: {
                      source: {
                        mediaId: 'sharkprey-learn-icon',
                      },
                      size: 20,
                      color: '#0060FF',
                    },
                  },
                  {
                    id: 'onboarding-rules-link',
                    type: 'Button',
                    props: {
                      children: 'New to NLHE? Learn the rules',
                      color: 'secondary',
                      variant: 'ghost',
                      size: 'l',
                      onPress: {
                        type: 'navigate',
                        payload: {
                          route: '/learn',
                        },
                      },
                      fullWidth: true,
                    },
                    style: {
                      minHeight: 48,
                    },
                  },
                ],
                style: {
                  gap: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              },
              {
                id: 'onboarding-footer',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'onboarding-start',
                    type: 'Button',
                    props: {
                      children: 'Start assessment',
                      color: 'secondary',
                      variant: 'solid',
                      size: 'l',
                      onPress: {
                        type: 'navigate',
                        payload: {
                          route: '/training-setup',
                        },
                      },
                      fullWidth: true,
                    },
                    style: {
                      minHeight: 48,
                    },
                  },
                ],
                style: {
                  gap: 12,
                  marginTop: 'auto',
                },
              },
            ],
            style: {
              gap: 20,
              minHeight: 772,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    'training-setup': {
      id: 'training-setup',
      name: 'Choose a game',
      title: 'Choose a game',
      description: 'Choose which production poker-training category to practice.',
      root: {
        id: 'training-setup-screen',
        type: 'Screen',
        props: { width: 'narrow', scroll: true },
        children: [
          {
            id: 'training-setup-content',
            type: 'View',
            props: {},
            style: { gap: 20, paddingTop: 20 },
            children: [
              {
                id: 'training-setup-title',
                type: 'Heading',
                props: { text: 'What do you want to train?', level: 1, size: 'h1' },
              },
              {
                id: 'training-setup-copy',
                type: 'Text',
                props: { text: 'Every choice is backed by the live 600-hand training catalog.' },
              },
              {
                id: 'setup-game',
                type: 'RadioGroup',
                props: {
                  options: [
                    { value: 'mtt', label: 'MTT' },
                    { value: 'sng', label: 'Sit & Go' },
                    { value: 'cash', label: 'Cash Game' },
                  ],
                  presentation: 'card',
                  columns: 1,
                  contentOrientation: 'horizontal',
                  color: 'secondary',
                  size: 'l',
                  gap: 'm',
                },
              },
            ],
          },
        ],
      },
    },
    'training-table-size': {
      id: 'training-table-size',
      name: 'Choose table size',
      title: 'Choose table size',
      root: {
        id: 'training-table-size-screen',
        type: 'Screen',
        props: { width: 'narrow', scroll: true },
        children: [
          {
            id: 'training-table-size-content',
            type: 'View',
            props: {},
            style: { gap: 20, paddingTop: 20 },
            children: [
              {
                id: 'training-table-size-title',
                type: 'Heading',
                props: { text: 'How many players?', level: 1, size: 'h1' },
              },
              {
                id: 'setup-table',
                type: 'RadioGroup',
                props: {
                  options: [
                    { value: '6max', label: '6-max' },
                    { value: '9max', label: '9-max' },
                  ],
                  presentation: 'card',
                  columns: 1,
                  contentOrientation: 'horizontal',
                  color: 'secondary',
                  size: 'l',
                  gap: 'm',
                },
              },
            ],
          },
        ],
      },
    },
    'training-street': {
      id: 'training-street',
      name: 'Choose street',
      title: 'Choose street',
      root: {
        id: 'training-street-screen',
        type: 'Screen',
        props: { width: 'narrow', scroll: true },
        children: [
          {
            id: 'training-street-content',
            type: 'View',
            props: {},
            style: { gap: 20, paddingTop: 20 },
            children: [
              {
                id: 'training-street-title',
                type: 'Heading',
                props: { text: 'Which street?', level: 1, size: 'h1' },
              },
              {
                id: 'setup-street',
                type: 'RadioGroup',
                props: {
                  options: [
                    { value: 'preflop', label: 'Preflop' },
                    { value: 'flop', label: 'Flop' },
                    { value: 'turn', label: 'Turn' },
                    { value: 'river', label: 'River' },
                  ],
                  presentation: 'card',
                  columns: 1,
                  contentOrientation: 'horizontal',
                  color: 'secondary',
                  size: 'l',
                  gap: 'm',
                },
              },
            ],
          },
        ],
      },
    },
    'training-difficulty': {
      id: 'training-difficulty',
      name: 'Choose difficulty',
      title: 'Choose difficulty',
      root: {
        id: 'training-difficulty-screen',
        type: 'Screen',
        props: { width: 'narrow', scroll: true },
        children: [
          {
            id: 'training-difficulty-content',
            type: 'View',
            props: {},
            style: { gap: 16, paddingTop: 20 },
            children: [
              {
                id: 'training-difficulty-title',
                type: 'Heading',
                props: { text: 'How hard?', level: 1, size: 'h1' },
              },
              {
                id: 'setup-difficulty-1',
                type: 'Button',
                props: { children: 'Level 1 · Fundamentals', fullWidth: true },
              },
              {
                id: 'setup-difficulty-2',
                type: 'Button',
                props: { children: 'Level 2 · Standard spots', fullWidth: true },
              },
              {
                id: 'setup-difficulty-3',
                type: 'Button',
                props: { children: 'Level 3 · Intermediate', fullWidth: true },
              },
              {
                id: 'setup-difficulty-4',
                type: 'Button',
                props: { children: 'Level 4 · Advanced', fullWidth: true },
              },
              {
                id: 'setup-difficulty-5',
                type: 'Button',
                props: { children: 'Level 5 · Expert', fullWidth: true },
              },
            ],
          },
        ],
      },
    },
    'decision-table': {
      id: 'decision-table',
      name: 'Your decision',
      title: 'Your decision',
      dataLoaders: [
        {
          kind: 'operation',
          operation: {
            apiId: 'poker-training',
            endpointId: 'tasks',
            operationId: 'getPokerTrainingTaskById',
          },
          input: {
            taskId: {
              kind: 'source',
              source: { kind: 'context', path: 'route.params.taskId' },
            },
          },
        },
      ],
      description:
        'Loads one published poker training task with its answer options and evaluates every selection through the poker API before review.',
      root: {
        id: 'decision-table-screen',
        type: 'Screen',
        props: {
          width: 'wide',
          scroll: true,
        },
        children: [
          {
            id: 'decision-table-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'decision-table-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'decision-table-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'decision-table-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'decision-table-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'decision-table-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'decision-table-title',
                type: 'Heading',
                props: {
                  text: 'Your decision',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'decision-category',
                type: 'Text',
                props: {
                  text: 'Loading street…',
                  variant: 'body',
                  emphasis: 'muted',
                },
              },
              {
                id: 'decision-table-space',
                type: 'Grid',
                props: {},
                children: [
                  {
                    id: 'decision-poker-table',
                    type: 'PokerTrainingTable',
                    props: {
                      shape: 'oval',
                      cardSize: 'small',
                      colorScheme: {
                        tableFelt: '#06150e',
                        tableBorder: '#202a25',
                        tableInnerBorder: '#3f5147',
                        cardBack: '#141a17',
                        cardBackBorder: '#4b5952',
                        cardSurface: '#f7f8f5',
                        cardText: '#080a09',
                        redSuitText: '#d42e35',
                        seatSurface: '#0e1410',
                        seatBorder: '#344239',
                        seatSelectedBorder: '#0060ff',
                        tokenSurface: '#e0e7e1',
                        tokenText: '#0c100e',
                      },
                    },
                  },
                ],
                style: {
                  gap: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 36,
                },
              },
              {
                id: 'decision-action',
                type: 'Text',
                props: {
                  text: 'Loading action history…',
                  variant: 'body',
                  align: 'center',
                  emphasis: 'muted',
                },
              },
              {
                id: 'decision-question',
                type: 'Heading',
                props: {
                  text: 'Loading decision…',
                  level: 2,
                  size: 'h2',
                  align: 'center',
                },
              },
              {
                id: 'decision-answers',
                type: 'FlatList',
                props: {
                  horizontal: true,
                  showsScrollIndicator: false,
                  emptyText: 'No answer options are available for this task.',
                  accessibilityLabel: 'Answer options',
                },
                repeat: {
                  source: {
                    kind: 'operation',
                    operation: {
                      apiId: 'poker-training',
                      endpointId: 'tasks',
                      operationId: 'getPokerTrainingTaskById',
                    },
                    path: 'options',
                  },
                  itemAlias: 'option',
                  keyPath: 'id',
                },
                children: [
                  {
                    id: 'decision-answer-option',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'decision-answer-button',
                        type: 'Button',
                        props: {
                          children: 'Choose answer',
                          color: 'secondary',
                          variant: 'outline',
                          size: 's',
                        },
                        style: {
                          minHeight: 48,
                          minWidth: 150,
                        },
                      },
                    ],
                    style: {
                      paddingRight: 12,
                    },
                  },
                ],
                style: {
                  minHeight: 48,
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    'answer-explanation': {
      id: 'answer-explanation',
      name: 'Review the decision',
      title: 'Review the decision',
      description:
        'Reloads the reviewed task and renders the submitted answer outcome returned by the poker API.',
      dataLoaders: [
        {
          kind: 'operation',
          operation: {
            apiId: 'poker-training',
            endpointId: 'tasks',
            operationId: 'getPokerTrainingTaskById',
          },
          input: {
            taskId: {
              kind: 'source',
              source: { kind: 'context', path: 'route.params.taskId' },
            },
          },
        },
      ],
      root: {
        id: 'answer-explanation-screen',
        type: 'Screen',
        props: {
          width: 'wide',
          scroll: true,
        },
        children: [
          {
            id: 'answer-explanation-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'answer-explanation-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'answer-explanation-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'answer-explanation-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'answer-explanation-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'answer-explanation-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'answer-explanation-title',
                type: 'Heading',
                props: {
                  text: 'Review the decision',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'review-category',
                type: 'Text',
                props: {
                  text: 'Street',
                  variant: 'body',
                  emphasis: 'muted',
                },
              },
              {
                id: 'review-table-space',
                type: 'Grid',
                props: {},
                children: [
                  {
                    id: 'review-poker-table',
                    type: 'PokerTrainingTable',
                    props: {
                      shape: 'oval',
                      cardSize: 'small',
                      colorScheme: {
                        tableFelt: '#06150e',
                        tableBorder: '#202a25',
                        tableInnerBorder: '#3f5147',
                        cardBack: '#141a17',
                        cardBackBorder: '#4b5952',
                        cardSurface: '#f7f8f5',
                        cardText: '#080a09',
                        redSuitText: '#d42e35',
                        seatSurface: '#0e1410',
                        seatBorder: '#344239',
                        seatSelectedBorder: '#0060ff',
                        tokenSurface: '#e0e7e1',
                        tokenText: '#0c100e',
                      },
                    },
                  },
                ],
                style: {
                  paddingHorizontal: 12,
                  paddingVertical: 24,
                },
              },
              {
                id: 'review-outcome',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'review-result-label',
                    type: 'Text',
                    props: {
                      text: 'Result',
                      variant: 'caption',
                      emphasis: 'muted',
                    },
                  },
                  {
                    id: 'review-verdict',
                    type: 'Text',
                    props: {
                      text: 'Result unavailable',
                      variant: 'body',
                      weight: 'bold',
                    },
                    style: {
                      fontSize: 20,
                    },
                  },
                  {
                    id: 'review-chosen-label',
                    type: 'Text',
                    props: {
                      text: 'Your answer',
                      variant: 'caption',
                      emphasis: 'muted',
                    },
                  },
                  {
                    id: 'review-chosen-value',
                    type: 'Text',
                    props: {
                      text: 'Answer unavailable',
                      variant: 'body',
                      weight: 'semiBold',
                    },
                  },
                  {
                    id: 'review-best-label',
                    type: 'Text',
                    props: {
                      text: 'Correct answer',
                      variant: 'caption',
                      emphasis: 'muted',
                    },
                  },
                  {
                    id: 'review-best-value',
                    type: 'Text',
                    props: {
                      text: 'Answer unavailable',
                      variant: 'body',
                      color: 'success',
                      weight: 'semiBold',
                    },
                  },
                ],
                style: {
                  gap: 8,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'review-why',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'review-why-title',
                    type: 'Heading',
                    props: {
                      text: 'Why',
                      level: 2,
                      size: 'h3',
                    },
                  },
                  {
                    id: 'review-why-copy',
                    type: 'Text',
                    props: {
                      text: 'Explanation unavailable.',
                      variant: 'body',
                    },
                  },
                ],
                style: {
                  gap: 12,
                },
              },
              {
                id: 'review-footer',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'review-next',
                    type: 'Button',
                    props: {
                      children: 'Choose next hand',
                      color: 'secondary',
                      variant: 'solid',
                      size: 'l',
                      onPress: {
                        type: 'navigate',
                        payload: {
                          route: '/training-setup',
                        },
                      },
                      fullWidth: true,
                    },
                    style: {
                      minHeight: 48,
                    },
                  },
                ],
                style: {
                  gap: 12,
                  marginTop: 'auto',
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    'session-summary': {
      id: 'session-summary',
      name: 'Session complete',
      title: 'Session complete',
      description: 'Reference design populated with sample training content.',
      root: {
        id: 'session-summary-screen',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'session-summary-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'session-summary-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'session-summary-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'session-summary-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'session-summary-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'session-summary-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'session-summary-title',
                type: 'Heading',
                props: {
                  text: 'Session complete',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'summary-accuracy',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'summary-accuracy-progress',
                    type: 'ProgressRing',
                    props: {
                      value: 70,
                      max: 100,
                      color: 'secondary',
                      trackColor: 'neutral',
                      size: 192,
                      thickness: 12,
                      accessibilityLabel: 'Accuracy',
                      accessibilityValueText: '70 percent',
                    },
                  },
                  {
                    id: 'summary-accuracy-center',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'summary-accuracy-number',
                        type: 'Text',
                        props: {
                          text: '70%',
                          variant: 'body',
                          weight: 'bold',
                          align: 'center',
                        },
                        style: {
                          fontSize: 64,
                          lineHeight: 76,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  width: 192,
                  height: 192,
                  alignSelf: 'center',
                },
              },
              {
                id: 'summary-total',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'summary-correct',
                    type: 'Heading',
                    props: {
                      text: '7 of 10 correct',
                      level: 2,
                      size: 'h2',
                      align: 'center',
                    },
                  },
                  {
                    id: 'summary-percent',
                    type: 'Text',
                    props: {
                      text: '70% accuracy',
                      variant: 'body',
                      align: 'center',
                      emphasis: 'muted',
                    },
                  },
                ],
                style: {
                  gap: 4,
                },
              },
              {
                id: 'summary-scores',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'summary-score-0',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'summary-score-title-0',
                        type: 'Text',
                        props: {
                          text: 'Strongest',
                          variant: 'body',
                          align: 'center',
                        },
                        style: {
                          color: '#22c55e',
                        },
                      },
                      {
                        id: 'summary-score-icon-wrap-0',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'summary-score-icon-0',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'sharkprey-trend-icon',
                              },
                              size: 48,
                              color: '#22c55e',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          alignItems: 'center',
                        },
                      },
                      {
                        id: 'summary-score-category-0',
                        type: 'Text',
                        props: {
                          text: 'Preflop ranges',
                          variant: 'body',
                          align: 'center',
                        },
                      },
                      {
                        id: 'summary-score-divider-0',
                        type: 'Divider',
                        props: {},
                      },
                      {
                        id: 'summary-score-value-0',
                        type: 'Text',
                        props: {
                          text: '86',
                          variant: 'body',
                          weight: 'bold',
                          align: 'center',
                        },
                        style: {
                          fontSize: 34,
                          lineHeight: 42,
                          color: '#22c55e',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      padding: 16,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#22c55e',
                      backgroundColor: '#101410',
                      flex: 1,
                    },
                  },
                  {
                    id: 'summary-score-1',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'summary-score-title-1',
                        type: 'Text',
                        props: {
                          text: 'Needs work',
                          variant: 'body',
                          align: 'center',
                        },
                        style: {
                          color: '#f59e0b',
                        },
                      },
                      {
                        id: 'summary-score-icon-wrap-1',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'summary-score-icon-1',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'sharkprey-target-icon',
                              },
                              size: 48,
                              color: '#f59e0b',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          alignItems: 'center',
                        },
                      },
                      {
                        id: 'summary-score-category-1',
                        type: 'Text',
                        props: {
                          text: 'Bet sizing',
                          variant: 'body',
                          align: 'center',
                        },
                      },
                      {
                        id: 'summary-score-divider-1',
                        type: 'Divider',
                        props: {},
                      },
                      {
                        id: 'summary-score-value-1',
                        type: 'Text',
                        props: {
                          text: '61',
                          variant: 'body',
                          weight: 'bold',
                          align: 'center',
                        },
                        style: {
                          fontSize: 34,
                          lineHeight: 42,
                          color: '#f59e0b',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      padding: 16,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: '#f59e0b',
                      backgroundColor: '#101410',
                      flex: 1,
                    },
                  },
                ],
                style: {
                  gap: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              },
              {
                id: 'summary-adaptive',
                type: 'Text',
                props: {
                  text: 'Your next session will adapt to these results.',
                  variant: 'body',
                  align: 'center',
                  emphasis: 'muted',
                },
              },
              {
                id: 'summary-practice',
                type: 'Button',
                props: {
                  children: 'Practice bet sizing',
                  color: 'secondary',
                  variant: 'solid',
                  size: 'l',
                  onPress: {
                    type: 'navigate',
                    payload: {
                      route: '/training-setup',
                    },
                  },
                  fullWidth: true,
                },
                style: {
                  minHeight: 48,
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    'hand-history': {
      id: 'hand-history',
      name: 'History',
      title: 'History',
      description:
        'The supplied three history items are sample content; filtering requires an application-owned data source.',
      root: {
        id: 'hand-history-screen',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'hand-history-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'hand-history-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'hand-history-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'hand-history-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'hand-history-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'hand-history-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'hand-history-title',
                type: 'Heading',
                props: {
                  text: 'History',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'history-filter',
                type: 'RadioGroup',
                props: {
                  options: [
                    {
                      value: 'all',
                      label: 'All',
                    },
                    {
                      value: 'correct',
                      label: 'Correct',
                    },
                    {
                      value: 'review',
                      label: 'Review',
                    },
                  ],
                  defaultValue: 'all',
                  presentation: 'card',
                  columns: 3,
                  contentOrientation: 'horizontal',
                  color: 'secondary',
                  size: 'm',
                  gap: 's',
                },
              },
              {
                id: 'history-recent',
                type: 'Heading',
                props: {
                  text: 'Recent decisions',
                  level: 2,
                  size: 'h3',
                },
              },
              {
                id: 'history-hand-0',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'history-hand-row-0',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'history-hand-copy-0',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'history-hand-title-0',
                            type: 'Text',
                            props: {
                              text: 'A♠ Q♦ · Q♥ 7♣ 2♠',
                              variant: 'body',
                              weight: 'semiBold',
                            },
                            style: {
                              fontSize: 19,
                            },
                          },
                          {
                            id: 'history-hand-answer-0',
                            type: 'Text',
                            props: {
                              text: 'Bet ~75% → Bet ~33%',
                              variant: 'body',
                            },
                          },
                          {
                            id: 'history-hand-category-0',
                            type: 'Text',
                            props: {
                              text: 'C-bet sizing',
                              variant: 'body',
                              emphasis: 'muted',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                      {
                        id: 'history-hand-result-0',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'history-hand-icon-0',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'sharkprey-incorrect-icon',
                              },
                              size: 36,
                              color: '#ef4444',
                            },
                          },
                          {
                            id: 'history-hand-status-0',
                            type: 'Text',
                            props: {
                              text: 'Incorrect',
                              variant: 'body',
                              color: 'error',
                              align: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          alignItems: 'center',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'history-hand-1',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'history-hand-row-1',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'history-hand-copy-1',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'history-hand-title-1',
                            type: 'Text',
                            props: {
                              text: 'A♣ K♠ · Preflop',
                              variant: 'body',
                              weight: 'semiBold',
                            },
                            style: {
                              fontSize: 19,
                            },
                          },
                          {
                            id: 'history-hand-answer-1',
                            type: 'Text',
                            props: {
                              text: 'Raise 2.5 BB',
                              variant: 'body',
                            },
                          },
                          {
                            id: 'history-hand-category-1',
                            type: 'Text',
                            props: {
                              text: 'Preflop ranges',
                              variant: 'body',
                              emphasis: 'muted',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                      {
                        id: 'history-hand-result-1',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'history-hand-icon-1',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'sharkprey-correct-icon',
                              },
                              size: 36,
                              color: '#22c55e',
                            },
                          },
                          {
                            id: 'history-hand-status-1',
                            type: 'Text',
                            props: {
                              text: 'Correct',
                              variant: 'body',
                              color: 'success',
                              align: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          alignItems: 'center',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'history-hand-2',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'history-hand-row-2',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'history-hand-copy-2',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'history-hand-title-2',
                            type: 'Text',
                            props: {
                              text: 'K♥ Q♣ · Turn',
                              variant: 'body',
                              weight: 'semiBold',
                            },
                            style: {
                              fontSize: 19,
                            },
                          },
                          {
                            id: 'history-hand-answer-2',
                            type: 'Text',
                            props: {
                              text: 'Check',
                              variant: 'body',
                            },
                          },
                          {
                            id: 'history-hand-category-2',
                            type: 'Text',
                            props: {
                              text: 'Pot control',
                              variant: 'body',
                              emphasis: 'muted',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                      {
                        id: 'history-hand-result-2',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'history-hand-icon-2',
                            type: 'Icon',
                            props: {
                              source: {
                                mediaId: 'sharkprey-correct-icon',
                              },
                              size: 36,
                              color: '#22c55e',
                            },
                          },
                          {
                            id: 'history-hand-status-2',
                            type: 'Text',
                            props: {
                              text: 'Correct',
                              variant: 'body',
                              color: 'success',
                              align: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          alignItems: 'center',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    stats: {
      id: 'stats',
      name: 'Your game',
      title: 'Your game',
      description: 'Reference design populated with sample training content.',
      root: {
        id: 'stats-screen',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'stats-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'stats-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'stats-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'stats-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'stats-title',
                type: 'Heading',
                props: {
                  text: 'Your game',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'stats-overall',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'stats-overall-row',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-ring',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'stats-ring-progress',
                            type: 'ProgressRing',
                            props: {
                              value: 72,
                              max: 100,
                              color: 'secondary',
                              trackColor: 'neutral',
                              size: 94,
                              thickness: 8,
                              accessibilityLabel: 'Accuracy',
                              accessibilityValueText: '72 percent',
                            },
                          },
                          {
                            id: 'stats-ring-center',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-ring-number',
                                type: 'Text',
                                props: {
                                  text: '72',
                                  variant: 'body',
                                  weight: 'bold',
                                  align: 'center',
                                },
                                style: {
                                  fontSize: 38,
                                  lineHeight: 48,
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              position: 'absolute',
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          width: 94,
                          height: 94,
                          alignSelf: 'center',
                        },
                      },
                      {
                        id: 'stats-overall-copy',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'stats-overall-title',
                            type: 'Text',
                            props: {
                              text: 'Overall',
                              variant: 'body',
                              weight: 'semiBold',
                            },
                            style: {
                              fontSize: 20,
                            },
                          },
                          {
                            id: 'stats-overall-caption',
                            type: 'Text',
                            props: {
                              text: 'Based on 100 decisions',
                              variant: 'body',
                              emphasis: 'muted',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'stats-section-0',
                type: 'Heading',
                props: {
                  text: 'Strengths',
                  level: 2,
                  size: 'h3',
                },
              },
              {
                id: 'stats-metric-0-0',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'stats-metric-row-0-0',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-metric-icon-0-0',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-cards-icon',
                          },
                          size: 40,
                          color: '#22c55e',
                        },
                      },
                      {
                        id: 'stats-metric-content-0-0',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'stats-metric-top-0-0',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-name-0-0',
                                type: 'Text',
                                props: {
                                  text: 'Preflop ranges',
                                  variant: 'body',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-value-0-0',
                                type: 'Text',
                                props: {
                                  text: '86',
                                  variant: 'body',
                                  weight: 'bold',
                                },
                                style: {
                                  fontSize: 22,
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                          {
                            id: 'stats-metric-bar-0-0',
                            type: 'Progress',
                            props: {
                              value: 86,
                              max: 100,
                              color: 'success',
                              size: 's',
                            },
                          },
                          {
                            id: 'stats-metric-range-0-0',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-min-0-0',
                                type: 'Text',
                                props: {
                                  text: '0',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-max-0-0',
                                type: 'Text',
                                props: {
                                  text: '100',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 6,
                          flex: 1,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'stats-metric-0-1',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'stats-metric-row-0-1',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-metric-icon-0-1',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-position-icon',
                          },
                          size: 40,
                          color: '#22c55e',
                        },
                      },
                      {
                        id: 'stats-metric-content-0-1',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'stats-metric-top-0-1',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-name-0-1',
                                type: 'Text',
                                props: {
                                  text: 'Position',
                                  variant: 'body',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-value-0-1',
                                type: 'Text',
                                props: {
                                  text: '74',
                                  variant: 'body',
                                  weight: 'bold',
                                },
                                style: {
                                  fontSize: 22,
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                          {
                            id: 'stats-metric-bar-0-1',
                            type: 'Progress',
                            props: {
                              value: 74,
                              max: 100,
                              color: 'success',
                              size: 's',
                            },
                          },
                          {
                            id: 'stats-metric-range-0-1',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-min-0-1',
                                type: 'Text',
                                props: {
                                  text: '0',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-max-0-1',
                                type: 'Text',
                                props: {
                                  text: '100',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 6,
                          flex: 1,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'stats-section-1',
                type: 'Heading',
                props: {
                  text: 'Weaknesses',
                  level: 2,
                  size: 'h3',
                },
              },
              {
                id: 'stats-metric-1-0',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'stats-metric-row-1-0',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-metric-icon-1-0',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-target-icon',
                          },
                          size: 40,
                          color: '#f59e0b',
                        },
                      },
                      {
                        id: 'stats-metric-content-1-0',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'stats-metric-top-1-0',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-name-1-0',
                                type: 'Text',
                                props: {
                                  text: 'Bet sizing',
                                  variant: 'body',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-value-1-0',
                                type: 'Text',
                                props: {
                                  text: '61',
                                  variant: 'body',
                                  weight: 'bold',
                                },
                                style: {
                                  fontSize: 22,
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                          {
                            id: 'stats-metric-bar-1-0',
                            type: 'Progress',
                            props: {
                              value: 61,
                              max: 100,
                              color: 'warning',
                              size: 's',
                            },
                          },
                          {
                            id: 'stats-metric-range-1-0',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-min-1-0',
                                type: 'Text',
                                props: {
                                  text: '0',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-max-1-0',
                                type: 'Text',
                                props: {
                                  text: '100',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 6,
                          flex: 1,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'stats-metric-1-1',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'stats-metric-row-1-1',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'stats-metric-icon-1-1',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-warning-icon',
                          },
                          size: 40,
                          color: '#f59e0b',
                        },
                      },
                      {
                        id: 'stats-metric-content-1-1',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'stats-metric-top-1-1',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-name-1-1',
                                type: 'Text',
                                props: {
                                  text: 'Bluffing',
                                  variant: 'body',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-value-1-1',
                                type: 'Text',
                                props: {
                                  text: '58',
                                  variant: 'body',
                                  weight: 'bold',
                                },
                                style: {
                                  fontSize: 22,
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                          {
                            id: 'stats-metric-bar-1-1',
                            type: 'Progress',
                            props: {
                              value: 58,
                              max: 100,
                              color: 'warning',
                              size: 's',
                            },
                          },
                          {
                            id: 'stats-metric-range-1-1',
                            type: 'View',
                            props: {},
                            children: [
                              {
                                id: 'stats-metric-min-1-1',
                                type: 'Text',
                                props: {
                                  text: '0',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                                style: {
                                  flex: 1,
                                },
                              },
                              {
                                id: 'stats-metric-max-1-1',
                                type: 'Text',
                                props: {
                                  text: '100',
                                  variant: 'caption',
                                  emphasis: 'muted',
                                },
                              },
                            ],
                            style: {
                              gap: 12,
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                          },
                        ],
                        style: {
                          gap: 6,
                          flex: 1,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'stats-practice',
                type: 'Button',
                props: {
                  children: 'Practice bet sizing',
                  color: 'secondary',
                  variant: 'solid',
                  size: 'l',
                  onPress: {
                    type: 'navigate',
                    payload: {
                      route: '/training-setup',
                    },
                  },
                  fullWidth: true,
                },
                style: {
                  minHeight: 48,
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    learn: {
      id: 'learn',
      name: 'Learn',
      title: 'Learn',
      description:
        'The supplied lesson list is a sample. Lesson actions remain unbound until content destinations exist.',
      root: {
        id: 'learn-screen',
        type: 'Screen',
        props: {
          width: 'default',
          scroll: true,
        },
        children: [
          {
            id: 'learn-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'learn-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'learn-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'learn-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'learn-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'learn-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'learn-title',
                type: 'Heading',
                props: {
                  text: 'Learn',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'learn-rules',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'learn-rules-row',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'learn-rules-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-fundamentals-icon',
                          },
                          size: 82,
                          color: '#f59e0b',
                        },
                      },
                      {
                        id: 'learn-rules-content',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'learn-rules-eyebrow',
                            type: 'Text',
                            props: {
                              text: 'NEW TO NLHE?',
                              variant: 'eyebrow',
                              color: 'warning',
                            },
                          },
                          {
                            id: 'learn-rules-title',
                            type: 'Heading',
                            props: {
                              text: 'Start with the rules',
                              level: 2,
                              size: 'h3',
                            },
                          },
                          {
                            id: 'learn-rules-copy',
                            type: 'Text',
                            props: {
                              text: 'Learn the essentials, then put them into practice.',
                              variant: 'body',
                              emphasis: 'muted',
                            },
                          },
                          {
                            id: 'learn-explore',
                            type: 'Button',
                            props: {
                              children: 'Explore fundamentals',
                              color: 'neutral',
                              variant: 'outline',
                              size: 'l',
                              fullWidth: true,
                            },
                            style: {
                              minHeight: 48,
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'learn-recommended',
                type: 'Heading',
                props: {
                  text: 'Recommended for you',
                  level: 2,
                  size: 'h3',
                },
              },
              {
                id: 'learn-cbet',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'learn-cbet-top',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'learn-cbet-copy',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'learn-cbet-eyebrow',
                            type: 'Text',
                            props: {
                              text: 'BET SIZING',
                              variant: 'eyebrow',
                              color: 'secondary',
                            },
                          },
                          {
                            id: 'learn-cbet-title',
                            type: 'Heading',
                            props: {
                              text: 'Continuation-bet sizing',
                              level: 2,
                              size: 'h3',
                            },
                          },
                          {
                            id: 'learn-cbet-subtitle',
                            type: 'Text',
                            props: {
                              text: 'Why a small bet does more',
                              variant: 'body',
                              emphasis: 'muted',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                      {
                        id: 'learn-cbet-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-target-icon',
                          },
                          size: 54,
                          color: '#0060FF',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                  {
                    id: 'learn-cbet-count',
                    type: 'Text',
                    props: {
                      text: '2 of 5 lessons',
                      variant: 'body',
                      emphasis: 'muted',
                    },
                  },
                  {
                    id: 'learn-cbet-progress',
                    type: 'Progress',
                    props: {
                      value: 40,
                      max: 100,
                      color: 'secondary',
                      size: 's',
                    },
                  },
                  {
                    id: 'learn-continue',
                    type: 'Button',
                    props: {
                      children: 'Continue lesson',
                      color: 'secondary',
                      variant: 'solid',
                      size: 'l',
                      fullWidth: true,
                    },
                    style: {
                      minHeight: 48,
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'learn-more',
                type: 'Heading',
                props: {
                  text: 'More fundamentals',
                  level: 2,
                  size: 'h3',
                },
              },
              {
                id: 'learn-fundamental-0',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'learn-fundamental-row-0',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'learn-fundamental-icon-0',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-cards-icon',
                          },
                          size: 36,
                          color: '#0060FF',
                        },
                      },
                      {
                        id: 'learn-fundamental-title-0',
                        type: 'Text',
                        props: {
                          text: 'Hand rankings',
                          variant: 'body',
                        },
                        style: {
                          flex: 1,
                        },
                      },
                      {
                        id: 'learn-fundamental-time-0',
                        type: 'Text',
                        props: {
                          text: '5 min',
                          variant: 'caption',
                          emphasis: 'muted',
                        },
                      },
                      {
                        id: 'learn-fundamental-chevron-0',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'learn-fundamental-1',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'learn-fundamental-row-1',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'learn-fundamental-icon-1',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-position-icon',
                          },
                          size: 36,
                          color: '#0060FF',
                        },
                      },
                      {
                        id: 'learn-fundamental-title-1',
                        type: 'Text',
                        props: {
                          text: 'Position at the table',
                          variant: 'body',
                        },
                        style: {
                          flex: 1,
                        },
                      },
                      {
                        id: 'learn-fundamental-time-1',
                        type: 'Text',
                        props: {
                          text: '6 min',
                          variant: 'caption',
                          emphasis: 'muted',
                        },
                      },
                      {
                        id: 'learn-fundamental-chevron-1',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 12,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
    settings: {
      id: 'settings',
      name: 'Settings',
      title: 'Settings',
      description:
        'Preference rows, connection and reset retain the supplied design. Account operations and confirmation destinations are not supplied.',
      root: {
        id: 'settings-screen',
        type: 'Screen',
        props: {
          width: 'narrow',
          scroll: true,
        },
        children: [
          {
            id: 'settings-content',
            type: 'View',
            props: {},
            children: [
              {
                id: 'settings-brand',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'settings-brand-mark',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-brand-mark-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey shark',
                        },
                        style: {
                          position: 'absolute',
                          width: 123,
                          height: 82,
                          left: -34,
                          top: -5,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 57,
                      height: 50,
                      overflow: 'hidden',
                    },
                  },
                  {
                    id: 'settings-brand-word',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-brand-word-image',
                        type: 'Image',
                        props: {
                          source: {
                            mediaId: 'sharkprey-logo',
                          },
                          alt: 'SharkPrey',
                        },
                        style: {
                          position: 'absolute',
                          width: 162,
                          height: 108,
                          left: -22,
                          top: -72,
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      width: 122,
                      height: 27,
                      overflow: 'hidden',
                      marginTop: 16,
                    },
                  },
                ],
                style: {
                  gap: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                },
              },
              {
                id: 'settings-title',
                type: 'Heading',
                props: {
                  text: 'Settings',
                  level: 1,
                  size: 'h1',
                },
              },
              {
                id: 'settings-preferences-title',
                type: 'Text',
                props: {
                  text: 'PREFERENCES',
                  variant: 'eyebrow',
                  emphasis: 'muted',
                },
              },
              {
                id: 'settings-preferences',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'settings-row-0',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-icon-0',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-appearance-icon',
                          },
                          size: 26,
                          color: '#0060FF',
                        },
                      },
                      {
                        id: 'settings-label-0',
                        type: 'Text',
                        props: {
                          text: 'Appearance',
                          variant: 'body',
                          weight: 'semiBold',
                        },
                        style: {
                          flex: 1,
                        },
                      },
                      {
                        id: 'settings-value-0',
                        type: 'Text',
                        props: {
                          text: 'System',
                          variant: 'bodySmall',
                          emphasis: 'muted',
                        },
                      },
                      {
                        id: 'settings-chevron-0',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      minHeight: 42,
                    },
                  },
                  {
                    id: 'settings-divider-1',
                    type: 'Divider',
                    props: {},
                  },
                  {
                    id: 'settings-row-1',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-icon-1',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-cards-icon',
                          },
                          size: 26,
                          color: '#0060FF',
                        },
                      },
                      {
                        id: 'settings-label-1',
                        type: 'Text',
                        props: {
                          text: 'Card deck',
                          variant: 'body',
                          weight: 'semiBold',
                        },
                        style: {
                          flex: 1,
                        },
                      },
                      {
                        id: 'settings-value-1',
                        type: 'Text',
                        props: {
                          text: 'SharkPrey Classic',
                          variant: 'bodySmall',
                          emphasis: 'muted',
                        },
                      },
                      {
                        id: 'settings-chevron-1',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      minHeight: 42,
                    },
                  },
                  {
                    id: 'settings-divider-2',
                    type: 'Divider',
                    props: {},
                  },
                  {
                    id: 'settings-row-2',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-icon-2',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-globe-icon',
                          },
                          size: 26,
                          color: '#0060FF',
                        },
                      },
                      {
                        id: 'settings-label-2',
                        type: 'Text',
                        props: {
                          text: 'Language',
                          variant: 'body',
                          weight: 'semiBold',
                        },
                        style: {
                          flex: 1,
                        },
                      },
                      {
                        id: 'settings-value-2',
                        type: 'Text',
                        props: {
                          text: 'English',
                          variant: 'bodySmall',
                          emphasis: 'muted',
                        },
                      },
                      {
                        id: 'settings-chevron-2',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      minHeight: 42,
                    },
                  },
                  {
                    id: 'settings-divider-3',
                    type: 'Divider',
                    props: {},
                  },
                  {
                    id: 'settings-row-3',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-icon-3',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-haptics-icon',
                          },
                          size: 26,
                          color: '#0060FF',
                        },
                      },
                      {
                        id: 'settings-label-3',
                        type: 'Text',
                        props: {
                          text: 'Haptics',
                          variant: 'body',
                          weight: 'semiBold',
                        },
                        style: {
                          flex: 1,
                        },
                      },
                      {
                        id: 'settings-value-3',
                        type: 'Text',
                        props: {
                          text: 'On',
                          variant: 'bodySmall',
                          emphasis: 'muted',
                        },
                      },
                      {
                        id: 'settings-chevron-3',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      minHeight: 42,
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#303632',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'settings-data-title',
                type: 'Text',
                props: {
                  text: 'DATA',
                  variant: 'eyebrow',
                  emphasis: 'muted',
                },
              },
              {
                id: 'settings-reset',
                type: 'View',
                props: {},
                children: [
                  {
                    id: 'settings-reset-row',
                    type: 'View',
                    props: {},
                    children: [
                      {
                        id: 'settings-reset-icon',
                        type: 'Icon',
                        props: {
                          source: {
                            mediaId: 'sharkprey-reset-icon',
                          },
                          size: 30,
                          color: '#ef4444',
                        },
                      },
                      {
                        id: 'settings-reset-copy',
                        type: 'View',
                        props: {},
                        children: [
                          {
                            id: 'settings-reset-title',
                            type: 'Text',
                            props: {
                              text: 'Reset stats',
                              variant: 'body',
                              color: 'error',
                              weight: 'semiBold',
                            },
                          },
                          {
                            id: 'settings-reset-description',
                            type: 'Text',
                            props: {
                              text: 'Erase all progress and category scores',
                              variant: 'bodySmall',
                              emphasis: 'muted',
                            },
                          },
                        ],
                        style: {
                          gap: 12,
                          flex: 1,
                        },
                      },
                      {
                        id: 'settings-reset-chevron',
                        type: 'Text',
                        props: {
                          text: '›',
                          variant: 'body',
                        },
                      },
                    ],
                    style: {
                      gap: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  },
                ],
                style: {
                  gap: 12,
                  padding: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#ef4444',
                  backgroundColor: '#101410',
                },
              },
              {
                id: 'settings-footer',
                type: 'Text',
                props: {
                  text: 'SharkPrey · Improve your game. Become the shark.',
                  variant: 'caption',
                  align: 'center',
                  emphasis: 'muted',
                },
                style: {
                  marginTop: 'auto',
                },
              },
            ],
            style: {
              gap: 16,
              minHeight: 710,
              paddingHorizontal: 10,
              paddingTop: 14,
            },
          },
        ],
      },
    },
  },
  activeThemeMode: 'dark',
  media: {
    assets: {
      'sharkprey-train-icon': {
        id: 'sharkprey-train-icon',
        name: 'train icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/train.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-history-icon': {
        id: 'sharkprey-history-icon',
        name: 'history icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/history.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-stats-icon': {
        id: 'sharkprey-stats-icon',
        name: 'stats icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/stats.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-learn-icon': {
        id: 'sharkprey-learn-icon',
        name: 'learn icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/learn.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-settings-icon': {
        id: 'sharkprey-settings-icon',
        name: 'settings icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/settings.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-logo': {
        id: 'sharkprey-logo',
        name: 'SharkPrey shark and graduation-cap logo',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/sharkprey-logo.png',
        },
        contentType: 'image/png',
        metadata: {
          originalFileName: '00-logo.png',
          width: 1536,
          height: 1024,
        },
      },
      'sharkprey-splash': {
        id: 'sharkprey-splash',
        name: 'SharkPrey Android-safe splash logo',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/sharkprey-splash.png',
        },
        contentType: 'image/png',
        metadata: {
          originalFileName: 'sharkprey-splash.png',
          width: 1024,
          height: 1024,
        },
      },
      'sharkprey-target-icon': {
        id: 'sharkprey-target-icon',
        name: 'target icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/target.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-reset-icon': {
        id: 'sharkprey-reset-icon',
        name: 'reset icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/reset.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-chip-icon': {
        id: 'sharkprey-chip-icon',
        name: 'chip icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/chip.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-position-icon': {
        id: 'sharkprey-position-icon',
        name: 'position icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/position.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-haptics-icon': {
        id: 'sharkprey-haptics-icon',
        name: 'haptics icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/haptics.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-correct-icon': {
        id: 'sharkprey-correct-icon',
        name: 'correct icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/correct.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-trophy-icon': {
        id: 'sharkprey-trophy-icon',
        name: 'trophy icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/trophy.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-warning-icon': {
        id: 'sharkprey-warning-icon',
        name: 'warning icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/warning.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-players-two-icon': {
        id: 'sharkprey-players-two-icon',
        name: 'players-two icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/players-two.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-players-four-icon': {
        id: 'sharkprey-players-four-icon',
        name: 'players-four icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/players-four.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-appearance-icon': {
        id: 'sharkprey-appearance-icon',
        name: 'appearance icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/appearance.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-fundamentals-icon': {
        id: 'sharkprey-fundamentals-icon',
        name: 'fundamentals icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/fundamentals.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-incorrect-icon': {
        id: 'sharkprey-incorrect-icon',
        name: 'incorrect icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/incorrect.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-star-icon': {
        id: 'sharkprey-star-icon',
        name: 'star icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/star.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-graduation-icon': {
        id: 'sharkprey-graduation-icon',
        name: 'graduation icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/graduation.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-globe-icon': {
        id: 'sharkprey-globe-icon',
        name: 'globe icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/globe.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-trend-icon': {
        id: 'sharkprey-trend-icon',
        name: 'trend icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/trend.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-cards-icon': {
        id: 'sharkprey-cards-icon',
        name: 'cards icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/cards.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
      'sharkprey-timer-icon': {
        id: 'sharkprey-timer-icon',
        name: 'timer icon',
        kind: 'image',
        source: {
          kind: 'bundled',
          path: 'assets/images/svg/timer.svg',
        },
        contentType: 'image/svg+xml',
        metadata: {
          width: 24,
          height: 24,
        },
      },
    },
  },
};

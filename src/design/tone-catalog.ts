export const ACCENT_TONE_FAMILIES = [
  'jewel',
  'pastel',
  'earthy',
  'muted',
  'vivid',
  'bright',
  'fluorescent',
  'neon',
  'ice',
  'metallic',
] as const;

export const FOUNDATION_TONE_FAMILIES = [
  'pastel',
  'ice',
  'neutral-light',
  'muted-light',
  'earthy-light',
  'neutral-dark',
  'jewel-dark',
] as const;

export type AccentToneFamily = (typeof ACCENT_TONE_FAMILIES)[number];
export type FoundationToneFamily = (typeof FOUNDATION_TONE_FAMILIES)[number];
export type TonePairId = `${AccentToneFamily}-on-${FoundationToneFamily}`;
export type TonePairClassification = 'recommended' | 'conditional' | 'unsafe';
export type ThemeMode = 'light' | 'dark';

export interface ToneTarget {
  readonly lightness: number;
  readonly chroma: number;
}

export interface TonePairDefinition {
  readonly id: TonePairId;
  readonly accent: AccentToneFamily;
  readonly foundation: FoundationToneFamily;
  readonly modes: readonly [ThemeMode];
  readonly classification: TonePairClassification;
  readonly accentTarget: ToneTarget;
  readonly foundationTarget: ToneTarget;
  readonly constraints: readonly string[];
  readonly decorativeFinish?: 'glow' | 'material';
  readonly flatFallbackTarget?: ToneTarget;
}

export const ACCENT_TONE_TARGETS: Readonly<Record<AccentToneFamily, ToneTarget>> = {
  jewel: { lightness: 0.53, chroma: 0.18 },
  pastel: { lightness: 0.885, chroma: 0.07 },
  earthy: { lightness: 0.6, chroma: 0.085 },
  muted: { lightness: 0.625, chroma: 0.055 },
  vivid: { lightness: 0.675, chroma: 0.23 },
  bright: { lightness: 0.8, chroma: 0.19 },
  fluorescent: { lightness: 0.81, chroma: 0.3 },
  neon: { lightness: 0.78, chroma: 0.3 },
  ice: { lightness: 0.94, chroma: 0.03 },
  metallic: { lightness: 0.53, chroma: 0.12 },
};

export const FOUNDATION_TONE_TARGETS: Readonly<Record<FoundationToneFamily, ToneTarget>> = {
  pastel: { lightness: 0.885, chroma: 0.07 },
  ice: { lightness: 0.94, chroma: 0.03 },
  'neutral-light': { lightness: 0.955, chroma: 0.012 },
  'muted-light': { lightness: 0.88, chroma: 0.038 },
  'earthy-light': { lightness: 0.86, chroma: 0.055 },
  'neutral-dark': { lightness: 0.14, chroma: 0.012 },
  'jewel-dark': { lightness: 0.24, chroma: 0.13 },
};

const CLASSIFICATION_MATRIX = {
  jewel: [
    'recommended',
    'recommended',
    'recommended',
    'recommended',
    'conditional',
    'recommended',
    'conditional',
  ],
  pastel: [
    'conditional',
    'conditional',
    'conditional',
    'conditional',
    'conditional',
    'recommended',
    'recommended',
  ],
  earthy: [
    'recommended',
    'recommended',
    'recommended',
    'recommended',
    'conditional',
    'recommended',
    'conditional',
  ],
  muted: [
    'recommended',
    'recommended',
    'recommended',
    'conditional',
    'conditional',
    'recommended',
    'conditional',
  ],
  vivid: [
    'recommended',
    'recommended',
    'recommended',
    'recommended',
    'conditional',
    'recommended',
    'recommended',
  ],
  bright: [
    'recommended',
    'recommended',
    'recommended',
    'recommended',
    'conditional',
    'recommended',
    'recommended',
  ],
  fluorescent: [
    'conditional',
    'conditional',
    'conditional',
    'conditional',
    'unsafe',
    'recommended',
    'recommended',
  ],
  neon: ['unsafe', 'unsafe', 'conditional', 'conditional', 'unsafe', 'recommended', 'recommended'],
  ice: [
    'conditional',
    'conditional',
    'conditional',
    'conditional',
    'conditional',
    'recommended',
    'recommended',
  ],
  metallic: [
    'conditional',
    'recommended',
    'recommended',
    'conditional',
    'conditional',
    'recommended',
    'recommended',
  ],
} as const satisfies Readonly<Record<AccentToneFamily, readonly TonePairClassification[]>>;

const FUNCTIONAL_CONSTRAINTS: Readonly<Record<TonePairClassification, readonly string[]>> = {
  recommended: ['Measure every functional foreground and adjacent-surface contrast.'],
  conditional: [
    'Constrain accent area and use measured neutral on-colors or border support.',
    'Do not use color as the only state or information cue.',
  ],
  unsafe: [
    'Restrict this pair to decorative micro-use unless measured correction changes its classification.',
    'Do not use this pair for interactive or informational roles.',
  ],
};

/*** Resolve one reviewed classification row without dynamic object access. */
function resolveClassificationRow(accent: AccentToneFamily): readonly TonePairClassification[] {
  if (accent === 'jewel') return CLASSIFICATION_MATRIX.jewel;
  if (accent === 'pastel') return CLASSIFICATION_MATRIX.pastel;
  if (accent === 'earthy') return CLASSIFICATION_MATRIX.earthy;
  if (accent === 'muted') return CLASSIFICATION_MATRIX.muted;
  if (accent === 'vivid') return CLASSIFICATION_MATRIX.vivid;
  if (accent === 'bright') return CLASSIFICATION_MATRIX.bright;
  if (accent === 'fluorescent') return CLASSIFICATION_MATRIX.fluorescent;
  if (accent === 'neon') return CLASSIFICATION_MATRIX.neon;
  if (accent === 'ice') return CLASSIFICATION_MATRIX.ice;
  return CLASSIFICATION_MATRIX.metallic;
}

/*** Resolve the canonical measurable target for one accent family. */
function resolveAccentTarget(accent: AccentToneFamily): ToneTarget {
  if (accent === 'jewel') return ACCENT_TONE_TARGETS.jewel;
  if (accent === 'pastel') return ACCENT_TONE_TARGETS.pastel;
  if (accent === 'earthy') return ACCENT_TONE_TARGETS.earthy;
  if (accent === 'muted') return ACCENT_TONE_TARGETS.muted;
  if (accent === 'vivid') return ACCENT_TONE_TARGETS.vivid;
  if (accent === 'bright') return ACCENT_TONE_TARGETS.bright;
  if (accent === 'fluorescent') return ACCENT_TONE_TARGETS.fluorescent;
  if (accent === 'neon') return ACCENT_TONE_TARGETS.neon;
  if (accent === 'ice') return ACCENT_TONE_TARGETS.ice;
  return ACCENT_TONE_TARGETS.metallic;
}

/*** Resolve the canonical measurable target for one foundation family. */
function resolveFoundationTarget(foundation: FoundationToneFamily): ToneTarget {
  if (foundation === 'pastel') return FOUNDATION_TONE_TARGETS.pastel;
  if (foundation === 'ice') return FOUNDATION_TONE_TARGETS.ice;
  if (foundation === 'neutral-light') return FOUNDATION_TONE_TARGETS['neutral-light'];
  if (foundation === 'muted-light') return FOUNDATION_TONE_TARGETS['muted-light'];
  if (foundation === 'earthy-light') return FOUNDATION_TONE_TARGETS['earthy-light'];
  if (foundation === 'neutral-dark') return FOUNDATION_TONE_TARGETS['neutral-dark'];
  return FOUNDATION_TONE_TARGETS['jewel-dark'];
}

/*** Resolve functional constraints for one reviewed classification. */
function resolveFunctionalConstraints(classification: TonePairClassification): readonly string[] {
  if (classification === 'recommended') return FUNCTIONAL_CONSTRAINTS.recommended;
  if (classification === 'conditional') return FUNCTIONAL_CONSTRAINTS.conditional;
  return FUNCTIONAL_CONSTRAINTS.unsafe;
}

/*** Resolve the mode implied by a foundation family. */
function resolveFoundationMode(foundation: FoundationToneFamily): ThemeMode {
  return foundation === 'neutral-dark' || foundation === 'jewel-dark' ? 'dark' : 'light';
}

/*** Add finish-specific constraints without pretending decorative effects are functional colors. */
function resolveFinish(
  accent: AccentToneFamily,
): Pick<TonePairDefinition, 'constraints' | 'decorativeFinish' | 'flatFallbackTarget'> {
  if (accent === 'neon') {
    return {
      constraints: ['Glow is decorative and must not carry state or focus.'],
      decorativeFinish: 'glow',
      flatFallbackTarget: ACCENT_TONE_TARGETS.neon,
    };
  }
  if (accent === 'metallic') {
    return {
      constraints: [
        'The material finish is decorative and requires this accessible flat fallback.',
      ],
      decorativeFinish: 'material',
      flatFallbackTarget: ACCENT_TONE_TARGETS.metallic,
    };
  }
  return { constraints: [] };
}

/*** Build one exhaustive catalog entry from the canonical family matrix. */
function createTonePairDefinition(
  accent: AccentToneFamily,
  foundation: FoundationToneFamily,
  foundationIndex: number,
): TonePairDefinition {
  const classification = resolveClassificationRow(accent).at(foundationIndex);
  if (!classification)
    throw new Error(`Missing tone classification for ${accent}-on-${foundation}.`);
  const finish = resolveFinish(accent);
  return {
    id: `${accent}-on-${foundation}`,
    accent,
    foundation,
    modes: [resolveFoundationMode(foundation)],
    classification,
    accentTarget: resolveAccentTarget(accent),
    foundationTarget: resolveFoundationTarget(foundation),
    constraints: [...resolveFunctionalConstraints(classification), ...finish.constraints],
    ...(finish.decorativeFinish ? { decorativeFinish: finish.decorativeFinish } : {}),
    ...(finish.flatFallbackTarget ? { flatFallbackTarget: finish.flatFallbackTarget } : {}),
  };
}

export const TONE_PAIR_CATALOG: readonly TonePairDefinition[] = ACCENT_TONE_FAMILIES.flatMap(
  (accent) =>
    FOUNDATION_TONE_FAMILIES.map((foundation, foundationIndex) =>
      createTonePairDefinition(accent, foundation, foundationIndex),
    ),
);

/*** Resolve a reviewed tone pair or report that the identifier is not canonical. */
export function resolveTonePair(id: string): TonePairDefinition | undefined {
  return TONE_PAIR_CATALOG.find((pair) => pair.id === id);
}

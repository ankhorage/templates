---
{
  'schema': 'zora-designer/v1',
  'documentKind': 'configuration',
  'status': 'resolved',
  'language': 'en',
  'source':
    {
      'mode': 'template',
      'inputs': ['interactive finance-money brief', 'generated mobile concept screen series'],
      'evidence':
        [
          {
            'id': 'concept-home',
            'kind': 'generated',
            'path': 'concepts/ebanking-mobile/home.png',
            'dimensions': [853, 1844],
            'order': 1,
          },
          {
            'id': 'concept-assets',
            'kind': 'generated',
            'path': 'concepts/ebanking-mobile/assets.png',
            'dimensions': [853, 1844],
            'order': 2,
          },
          {
            'id': 'concept-payments',
            'kind': 'generated',
            'path': 'concepts/ebanking-mobile/payments.png',
            'dimensions': [853, 1844],
            'order': 3,
          },
          {
            'id': 'concept-invest',
            'kind': 'generated',
            'path': 'concepts/ebanking-mobile/invest.png',
            'dimensions': [853, 1844],
            'order': 4,
          },
          {
            'id': 'concept-more',
            'kind': 'generated',
            'path': 'concepts/ebanking-mobile/more.png',
            'dimensions': [853, 1844],
            'order': 5,
          },
        ],
      'capabilityLimitations': ['Concept images are not runtime captures.'],
    },
  'config':
    {
      'category': { 'requested': 'finance_money', 'resolved': 'finance_money', 'origin': 'user' },
      'intent': { 'value': 'Secure, rigorous, trustworthy mobile e-banking', 'origin': 'user' },
      'platform': { 'value': 'mobile', 'origin': 'user' },
      'theme':
        {
          'primary': { 'value': '#047857', 'origin': 'user' },
          'harmony': { 'value': 'complementary', 'origin': 'user' },
          'lightTonePair': { 'value': 'jewel-on-neutral-light', 'origin': 'category-default' },
          'darkTonePair': { 'value': 'pastel-on-neutral-dark', 'origin': 'category-default' },
        },
      'typography':
        {
          'bodyCandidates': ['IBM Plex Sans'],
          'activation': 'advisory-until-loader-verified',
          'origin': 'category-default',
        },
      'advancedProfile':
        {
          'density': { 'value': 'compact', 'origin': 'category-default' },
          'shape': { 'value': 'neutral', 'origin': 'category-default' },
        },
    },
  'derivation':
    {
      'provenance': ['@ankhorage/templates 9.0.2', '@ankhorage/zora 4.0.0'],
      'diagnostics': [],
      'assumptions': ['Home is the initial route and More contains secondary account controls.'],
      'unsupported': [],
      'ownerRuntimeDrift': [],
    },
  'tokens':
    {
      'ownerComputed':
        {
          'lightSurface': '#fcf9fb',
          'darkSurface': '#090608',
          'lightBrandBase': '#00583c',
          'darkBrandBase': '#62a388',
        },
    },
  'components':
    {
      'recipeDecisions':
        {
          'Screen': 'narrow scrollable mobile screen',
          'SectionHeader': 'screen hierarchy',
          'Panel': 'grouped content surface',
          'Card': 'summary and activity item',
          'Button': 'quick action',
          'Notice': 'security status',
        },
      'stateRequirements':
        [
          'loading',
          'empty',
          'partial',
          'error',
          'offline',
          'success',
          'disabled',
          'pressed',
          'focus',
          'selected',
        ],
    },
  'screens':
    [
      {
        'id': 'home',
        'purpose': 'Balances, quick actions, and upcoming activity',
        'evidenceId': 'concept-home',
        'route': 'home',
      },
      {
        'id': 'assets',
        'purpose': 'Net worth, allocation, and linked accounts',
        'evidenceId': 'concept-assets',
        'route': 'assets',
      },
      {
        'id': 'payments',
        'purpose': 'Transfers, bills, scheduled payments, recipients',
        'evidenceId': 'concept-payments',
        'route': 'payments',
      },
      {
        'id': 'invest',
        'purpose': 'Portfolio value, returns, and diversified holdings',
        'evidenceId': 'concept-invest',
        'route': 'invest',
      },
      {
        'id': 'more',
        'purpose': 'Profile, security, support, and preferences',
        'evidenceId': 'concept-more',
        'route': 'more',
      },
    ],
  'validation':
    {
      'scope': 'composition',
      'status': 'pass',
      'gates':
        [
          { 'name': 'owner-compilation', 'status': 'pass' },
          { 'name': 'manifest-validation', 'status': 'pass' },
          { 'name': 'metadata-elements', 'status': 'pass' },
        ],
      'applicationGate': 'pass',
      'ownerRuntimeDrift': [],
      'blockers': [],
    },
  'audit':
    {
      'status': 'not-run',
      'score': null,
      'coverage': null,
      'applicableWeight': null,
      'assessedWeight': null,
      'rounding': 'half-up',
      'confidence': { 'value': null, 'label': null },
      'possibleRange': { 'lower': null, 'upper': null },
      'releaseGate': 'not-assessable',
      'releaseGateCriteria': [],
      'ruleResults': [],
      'findings': [],
      'risks': [],
      'passedRules': [],
      'notAssessable': [],
    },
  'openDecisions': [],
}
---

# ZORA Designer

## Design direction

## Resolved decisions and origins

## Color system

## Typography

## Layout, shape, elevation, and motion

## Component and interaction states

## Screen specifications

## Accessibility and validation

## Audit summary

## Findings and remediation

## Risks needing verification

## Not assessable

## Open decisions

## User notes

Five-tab mobile e-banking starter: Home, Assets, Payments, Invest, More.

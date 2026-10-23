import { expect, test } from 'bun:test';

import createSharkPreyManifest from '../src/templates/categories/education-learning/sharkprey/createAppManifest';
import createStillpathManifest from '../src/templates/categories/lifestyle/stillpath/createAppManifest';
import createChatManifest from '../src/templates/categories/social-community/chat/createAppManifest';

test('templates serialize their reviewed auth flows exactly', () => {
  const flows = {
    sharkprey: createSharkPreyManifest().infra.environments.local.auth?.flow,
    stillpath: createStillpathManifest().infra.environments.local.auth?.flow,
    chat: createChatManifest().infra.environments.local.auth?.flow,
  };

  expect(JSON.stringify(flows)).toBe(
    '{"sharkprey":{"signInRoute":"sign-in","signUpRoute":"sign-up","signOutRoute":"sign-out","forgotPasswordRoute":"forgot-password","postSignInRoute":"onboarding","unauthorizedRoute":"sign-in"},"stillpath":{"signInRoute":"sign-in","signUpRoute":"sign-up","signOutRoute":"sign-out","postSignInRoute":"/","unauthorizedRoute":"sign-in"},"chat":{"signInRoute":"sign-in","signUpRoute":"sign-up","signOutRoute":"sign-out","forgotPasswordRoute":"forgot-password","postSignInRoute":"/","unauthorizedRoute":"sign-in"}}',
  );
  const stillpathFlow = flows.stillpath;
  if (stillpathFlow === undefined) throw new Error('Stillpath auth flow is unavailable.');
  expect(Object.hasOwn(stillpathFlow, 'forgotPasswordRoute')).toBe(false);
});

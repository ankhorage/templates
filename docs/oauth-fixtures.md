# OAuth fixture setup

The first-party OAuth fixtures configure the logical application callback route
`auth/callback`. They never contain provider credentials or a complete deployment URL.
Studio resolves that route into the platform-specific redirect URI when it generates the app.

## Keep the two redirect layers separate

OAuth through Supabase uses two different redirect layers:

1. The provider redirects to Supabase Auth.
2. Supabase Auth redirects back to the generated application.

Do not register the application callback directly as the Google or Apple provider callback.

## Google provider console

Configure a Web application OAuth client in Google Auth Platform.

- Authorized JavaScript origin: the application origin, such as `https://app.example.com`.
- Authorized redirect URI: the callback shown on the Google provider page in the Supabase
  Dashboard.
- Hosted-project example: `https://<project-ref>.supabase.co/auth/v1/callback`.
- Local Supabase example: `http://127.0.0.1:54321/auth/v1/callback`.

When the Supabase project uses a custom Auth domain, use that domain's callback instead of the
`supabase.co` example.

Official reference:
[Supabase Login with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)

## Apple developer console

Configure Sign in with Apple for the App ID and Services ID used by the application.

For the Services ID Website URLs:

- Domain: the domain hosting Supabase Auth, commonly `<project-ref>.supabase.co`.
- Return URL: `https://<project-ref>.supabase.co/auth/v1/callback`.

Use the actual callback shown by the Supabase Apple provider configuration when a custom Auth
hostname is configured.

Official reference:
[Supabase Login with Apple](https://supabase.com/docs/guides/auth/social-login/auth-apple)

## Supabase redirect allow list

The application-facing redirect URI must be added to the Supabase Auth Redirect URLs list.
The fixture route resolves to values such as:

- Web: `https://app.example.com/auth/callback`.
- Local web: `http://localhost:<port>/auth/callback`.
- Native development or production build: `<generated-app-scheme>://auth/callback`.

Use the exact generated scheme from the app configuration. Prefer exact production redirect URLs;
reserve wildcard patterns for controlled local or preview environments.

Official references:

- [Supabase Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- [Supabase Native Mobile Deep Linking](https://supabase.com/docs/guides/auth/native-mobile-deep-linking)

## What the fixtures prove

The fixtures and their tests prove deterministic manifest generation, supported provider IDs,
logical credential references, canonical callback routing, and absence of secret-shaped fields.
They do not prove that an external Google or Apple tenant has been configured correctly, and they
do not perform live provider authentication.

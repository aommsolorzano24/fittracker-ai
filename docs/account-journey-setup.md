# My Journey accounts

This repository had no account provider, database, or billing integration. This PR integrates Supabase Auth and PostgreSQL using server-only environment variables. No service-role key is used by the app. Existing browser-local journey data is not imported: it cannot prove account ownership or Premium entitlement.

## Required owner setup

1. Create a Supabase project (or provide an existing project), then execute `supabase/migrations/202611170001_journey.sql` in its SQL editor.
2. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the application deployment, and in `.env.local` for local testing. Restart the app. Never commit real keys.
3. In Supabase Authentication, create two confirmed test users: one Premium and one Free. Keep passwords outside the repository.
4. As database administrator, grant only the Premium test user an entitlement, replacing the placeholder UUID:

   ```sql
   insert into public.premium_entitlements(user_id, active, expires_at)
   values ('PREMIUM_TEST_USER_UUID', true, now() + interval '7 days')
   on conflict (user_id) do update set active=true, expires_at=excluded.expires_at;
   ```

   The Free account needs no entitlement. Authenticated users cannot edit entitlements or tables directly. Production subscription provisioning must come from a trusted administrator or future verified billing webhook; no payment provider is configured by this PR.
5. Run `npm run build` and `npm start`. On a deployed site use HTTPS. Access-token sessions expire at the provider's expiry and then require sign-in again; refresh-token handling, registration and password recovery are not part of this PR.

## Real-account acceptance test

Set `NORDEN_TEST_URL`, `NORDEN_PREMIUM_EMAIL`, `NORDEN_PREMIUM_PASSWORD`, `NORDEN_FREE_EMAIL`, `NORDEN_FREE_PASSWORD` in your test environment. With Playwright available, run `node tests/account-journey.cjs`. The test uses separate browser contexts for the same Premium account, verifies one-day advancement across contexts, and checks a Free account's dashboard plus server denial. It switches the Premium test account's objective when needed to ensure an unfinished test block; use disposable test accounts only.

Without configured Supabase and test users, the app denies Premium access and reports that the account service is unconfigured. A real cross-browser persistence test cannot be reported as passed until this setup is complete.

## Authorization

Every request validates the access token with Supabase Auth. The RPC checks the authenticated user's current active, unexpired entitlement before returning or mutating progress. It scopes storage to `auth.uid()`, locks the row and checks a revision to prevent lost updates. Workout exercise data lives exclusively in server-imported code and is returned only after the RPC authorizes access. Clients cannot choose a user ID, submit arbitrary progress/history, or assert Premium status. Revoking Premium preserves data while denying access.

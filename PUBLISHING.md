# Publishing Checklist — Making the App Public & Multi-User

## 1. Authentication (biggest gap)
Supabase has built-in auth (email/password, Google OAuth, etc.) — it's just not wired up yet.
- Add a sign-up/sign-in screen
- Attach a `user_id` to every row in every table (`visits`, `essay_notes`, `custom_schools`, `settings`)

## 2. Row-Level Security in Supabase
Once `user_id` exists on rows, enable RLS policies in Supabase so users can only read/write their own data.
This is mostly a Supabase dashboard config change, not a code change.

## 3. API Key Security
The College Scorecard API key is hardcoded in `src/data/collegeScorecard.js` and exposed in the frontend bundle.
For a public app, put a small proxy in front of it — a Supabase Edge Function or a Vercel serverless function
that holds the key server-side and forwards requests.

## 4. Rethink localStorage
Currently localStorage is the primary store and Supabase is the backup. For multi-user, flip this:
Supabase becomes source of truth, localStorage is just a cache. The sync logic in `src/data/store.js`
needs to be auth-aware (only pull data for the logged-in user).

## 5. Hosting & Domain
Deploy to Vercel or Netlify (both support Vite out of the box, connect to a GitHub repo).
Then point a custom domain at it.

## 6. Move Built-in Schools to Supabase
The 53 schools in `src/data/schools.js` are hardcoded. Consider moving them into a shared read-only
Supabase table so the list can be updated without a redeploy.

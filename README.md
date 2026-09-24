# Richard Yates — Self Portraiture

A dark editorial web application for photographic self-portraiture projects.

## Stack

- Next.js App Router and TypeScript
- Supabase Postgres, Auth, and Storage
- Server-rendered public project pages
- Secure HTTP-only visitor access cookies

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a public storage bucket named `project-images` (or change the policy/bucket name in the schema).
4. Copy `.env.example` to `.env.local` and add your Supabase URL and anon key.
5. `npm install && npm run dev`
6. Create the first administrator in Supabase Auth, then add their UUID to `admin_users`.

The seed migration creates **The Red Room** using clearly marked abstract SVG placeholders. Replace these from the admin editor or Supabase Storage before publishing a real project.

## Security notes

The browser only receives the anon key. RLS protects project editing and visitor records. Visitor access is recorded through the server route and represented by a signed, HTTP-only cookie; no visitor credentials are stored. Add Turnstile credentials to the access route before public launch if abuse becomes material.

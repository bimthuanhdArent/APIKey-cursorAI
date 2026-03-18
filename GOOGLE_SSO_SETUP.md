# Google SSO setup – step by step

This app uses **NextAuth.js** with the **Google** provider. Follow these steps to configure Google Sign-In.

---

## 1. Create a Google Cloud project (if needed)

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown → **New Project**.
3. Name it (e.g. `dandi-app`) and click **Create**.

---

## 2. Configure the OAuth consent screen

1. In the left menu: **APIs & Services** → **OAuth consent screen**.
2. Choose **External** (or **Internal** for Google Workspace only) → **Create**.
3. Fill in:
   - **App name**: e.g. `Dandi`
   - **User support email**: your email
   - **Developer contact**: your email
4. Click **Save and Continue**.
5. **Scopes**: leave default, click **Save and Continue**.
6. **Test users** (if app is in Testing): add your Google account(s).  
   Click **Save and Continue** → **Back to Dashboard**.

---

## 3. Create OAuth 2.0 credentials

1. **APIs & Services** → **Credentials**.
2. **Create credentials** → **OAuth client ID**.
3. **Application type**: **Web application**.
4. **Name**: e.g. `Dandi Web Client`.
5. **Authorized JavaScript origins**:
   - Local: `http://localhost:3000`
   - Production: `https://your-domain.com`
6. **Authorized redirect URIs** (must match exactly):
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Click **Create**.
8. Copy the **Client ID** and **Client secret** (you’ll use them in the next step).

---

## 4. Environment variables

In the project root, add to `.env.local` (create it if it doesn’t exist):

```env
# Google OAuth (from Google Cloud Console → Credentials)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# NextAuth (generate a random string, e.g. `openssl rand -base64 32`)
NEXTAUTH_SECRET=your-random-secret

# Base URL of your app (required for OAuth redirects to work)
NEXTAUTH_URL=http://localhost:3000
# In production: NEXTAUTH_URL=https://your-domain.com
```

- **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET**: from step 3.
- **NEXTAUTH_SECRET**: must be a **random secret** (not a URL). Run in terminal:
  - Windows (PowerShell): `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) | ForEach-Object { [byte]$_ })`
  - Mac/Linux: `openssl rand -base64 32`
- **NEXTAUTH_URL**: set in production to your app URL (e.g. `https://your-domain.com`). Omit for local dev.

---

## 5. Run the app

```bash
cd dandi
npm run dev
```

Open `http://localhost:3000/dashboards` and use **Sign in with Google**. You should be redirected to Google and back after login.

---

## 6. Optional: production checklist

- [ ] Add production URL to **Authorized JavaScript origins** and **Authorized redirect URIs** in Google Cloud.
- [ ] Set `NEXTAUTH_URL` in your production env to the full app URL.
- [ ] If the app is in **Testing**, only test users can sign in; switch to **Production** when ready (may require verification for sensitive scopes).

---

## Summary of what was implemented

| Item | Location |
|------|----------|
| NextAuth config (Google provider, JWT session) | `lib/auth.ts` |
| Auth API route | `app/api/auth/[...nextauth]/route.ts` |
| Session provider | `app/providers/SessionProvider.tsx` (used in `app/layout.tsx`) |
| Login / Sign out in header | `app/dashboards/components/DashboardHeader.tsx` |
| Login card on dashboards | `app/dashboards/page.tsx` |
| NextAuth types | `types/next-auth.d.ts` |

Session is stored in a JWT (no DB required). To protect a page server-side, use `getServerSession(authOptions)` from `next-auth` in that route or layout.

---

## Troubleshooting

- **`error=OAuthSignin`** (redirects back to app without showing Google login): Usually caused by:
  1. **Wrong `NEXTAUTH_SECRET`** — It must be a random string (e.g. from `openssl rand -base64 32`), **not** your app URL. The URL goes in `NEXTAUTH_URL`.
  2. **Missing `NEXTAUTH_URL`** — Set it to `http://localhost:3000` for local dev so NextAuth can build the callback URL correctly.
  3. **Redirect URI mismatch** — In Google Cloud Console, the redirect URI must be exactly: `http://localhost:3000/api/auth/callback/google` (for production, use your production URL + `/api/auth/callback/google`).

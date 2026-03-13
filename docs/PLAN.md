# Traust smíði — Creation Plan

Construction/trades portfolio site. Bilingual (IS + EN). Contact/offer form with image uploads.

---

## Phase 1: Design Foundation ✅
- [x] Choose color palette (primary, secondary, accent, neutrals)
- [x] Define layout structure (header, hero, sections, footer)
- [x] Create logo for Traust smíði

## Phase 2: Project Setup ✅
- [x] Init Next.js project with TypeScript + pnpm
- [x] Install & configure Tailwind, shadcn/ui, Motion
- [x] Set up ESLint + Prettier
- [x] Set up next-intl (Icelandic first)
- [x] Configure Vercel Analytics

## Phase 3: Core Pages ✅
- [x] Home / Hero section
- [x] About (um okkur)
- [x] Portfolio / Projects (verkefni)
- [x] Services (þjónusta)

## Phase 4: Contact / Offer Form ✅
- [x] Build form UI (title, description, image uploads)
- [x] React Hook Form + client-side image compression
- [x] API route stubbed (`/api/contact`)

## Phase 5: Polish ✅
- [x] Zod schema + zodResolver on contact form (email mandatory)
- [x] OG image (1200×630) generated from logo
- [x] Favicon replaced with Traust smíði logo
- [x] Responsive / animation pass
- [x] Smooth scroll for anchor links
- [x] Locale prefix removed (no `/is` in URL)
- [x] SEO (meta tags, robots, sitemap)
- [x] English translations
- [x] Animations (fadeUp on all sections)

## Phase 6: Deploy to Vercel (test) ← CURRENT
- [ ] Push repo to GitHub
- [ ] Connect to Vercel, deploy on `.vercel.app` URL
- [ ] Verify everything works live

## Phase 7: Domain, Email & Resend
- [ ] Register/connect custom domain `traustsmidi.is`
- [ ] Set up email for receiving submissions
- [ ] Install `resend` package
- [ ] Configure Resend: API key, verified domain, env vars
- [ ] Uncomment Resend code in `/api/contact`
- [ ] Final QA

---

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State | React state |
| Animations | Motion |
| i18n | next-intl |
| Form validation | Zod + React Hook Form |
| Email | Resend |
| Image uploads | Client-side compression (base64) |
| Linting | ESLint + Prettier |
| Analytics | Vercel Analytics |
| Package manager | pnpm |
| Deployment | Vercel |

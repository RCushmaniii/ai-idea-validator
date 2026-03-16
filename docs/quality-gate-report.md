# Site Quality Gate Report — AI Idea Validator

**Date:** 2026-03-16
**Framework:** Next.js 15 (App Router)
**Bilingual:** Yes (EN/ES, context-based)
**Deployment:** Netlify
**Overall Score:** 23/43 (53%) — NEEDS WORK

---

## Scorecard

| Category | Score | Pct |
|----------|-------|-----|
| SEO & Meta | 6/8 | 75% |
| Bilingual / i18n | 2/7 | 29% |
| Visual Identity | 1/6 | 17% |
| Performance & Assets | 1/6 | 17% |
| Accessibility | 5/7 | 71% |
| Security | 4/5 | 80% |
| Cleanup | 4/4 | 100% |

---

## MUST FIX (before deploy)

### 1. Missing OG Image — VISUAL (FAIL)
- `/public/og-image.png` referenced in `layout.tsx` metadata but file does not exist
- Breaks all social media sharing (LinkedIn, Twitter, Facebook)
- **Fix:** Create 1200x630px branded OG image and place in `public/og-image.png`

### 2. No robots.txt — SEO (FAIL)
- No `public/robots.txt` or `src/app/robots.ts`
- Search engines can't discover sitemap
- **Fix:** Create `public/robots.txt` or `src/app/robots.ts`

### 3. No sitemap.xml — SEO (FAIL)
- No `public/sitemap.xml` or `src/app/sitemap.ts`
- Slower crawl discovery, no page priority signals
- **Fix:** Create `src/app/sitemap.ts` with all page URLs

### 4. No Favicon PNG Fallbacks — VISUAL (FAIL)
- SVG favicon exists and works, but no PNG fallback for older browsers
- **Fix:** Generate `favicon-32x32.png` and `favicon-16x16.png` from SVG

### 5. No Apple Touch Icon — VISUAL (FAIL)
- No `apple-touch-icon.png` (180x180) in `public/`
- iOS home screen shows no custom branding
- **Fix:** Create 180x180 PNG and add to `public/`

### 6. No site.webmanifest — VISUAL (FAIL)
- No PWA manifest file
- **Fix:** Create `public/site.webmanifest` with app name, icons, theme_color

### 7. No theme-color Meta — VISUAL (FAIL)
- Mobile browser chrome won't adopt brand color (#ea580c)
- **Fix:** Add `themeColor` to metadata in `layout.tsx`

### 8. No hreflang Tags — I18N (FAIL)
- Google cannot identify alternate language versions
- No `x-default` fallback
- **Fix:** Add hreflang alternates to metadata in `layout.tsx`

### 9. og:locale Hardcoded — I18N (FAIL)
- `og:locale: "en_US"` hardcoded in `layout.tsx`
- Spanish shares always show English locale
- **Fix:** Make og:locale dynamic based on language context

### 10. Hardcoded English Strings — I18N (FAIL)
- `Footer.tsx`: 9 inline ternary strings not in translations.ts
- `JsonUpload.tsx` lines 592-610: 4 score labels ("Copycat Risk", etc.) hardcoded in English
- `Header.tsx`: aria-labels and theme toggle text in English only
- **Fix:** Move all strings to translations.ts

### 11. Oversized Images — PERFORMANCE (FAIL)
- 6 PNG images exceed 500KB (549KB to 1.2MB)
- All PNGs, zero WebP conversion
- **Fix:** Convert to WebP, target 100-200KB each

### 12. No Next.js Image Component — PERFORMANCE (FAIL)
- Zero `<img>` tags in components, no optimization pipeline
- No lazy loading, no width/height attributes, no format negotiation
- **Fix:** Use `next/image` for all image rendering

### 13. No prefers-reduced-motion — A11Y (FAIL)
- Animations (transitions, smooth scroll) cannot be disabled
- **Fix:** Add `@media (prefers-reduced-motion: reduce)` to `globals.css`

### 14. Missing CSP Header — SECURITY (WARN)
- No Content-Security-Policy in `netlify.toml`
- Other security headers (X-Frame-Options, X-Content-Type-Options, etc.) present
- **Fix:** Add CSP header to `netlify.toml`

---

## SHOULD FIX (before launch marketing)

### 15. Pages Missing Unique Metadata — SEO (WARN)
- /faq, /contact, /docs, /privacy, /terms, /support use root default title/description
- **Fix:** Add explicit metadata exports to each page

### 16. html lang Hardcoded — I18N (WARN)
- `<html lang="en">` in layout.tsx, updated client-side via LanguageContext
- SSR always serves `lang="en"` regardless of language selection
- **Fix:** Consider server-side language detection or document limitation

### 17. Spanish Accent Marks — I18N (WARN)
- translations.ts has missing accents: "anos" should be "anos", "Espanol" should be "Espanol"
- **Fix:** Audit and fix all Spanish strings in translations.ts

### 18. No Preconnect Hints — PERFORMANCE (WARN)
- Missing `<link rel="preconnect">` for formspree.io
- **Fix:** Add preconnect in layout.tsx

---

## PASSES (no action needed)

- Canonical URLs (metadataBase configured)
- Twitter card metadata (summary_large_image)
- Heading hierarchy (proper h1-h6 nesting)
- Landmark regions (header, main, footer, nav)
- Form labels (proper htmlFor/id associations)
- Keyboard navigation (Enter key handlers, focusable elements)
- Focus styles (2px orange outline, 2px offset)
- Font loading (display: swap, latin subset)
- No exposed secrets in source code
- .env properly gitignored
- No .env in git history
- External links have rel="noopener noreferrer"
- Source maps disabled in production
- No console.log statements
- No TODO/FIXME comments
- No commented-out code blocks
- No unused dependencies

---

## Runtime Checks (Manual)

1. **Lighthouse** — Chrome DevTools, target >90 all scores
2. **axe DevTools** — test every page template in both EN and ES
3. **opengraph.xyz** — verify OG image after creation
4. **Mobile responsiveness** — test at 320px, 375px, 768px, 1024px, 1440px
5. **Google Rich Results Test** — paste each page URL

---

*Generated by Site Quality Gate skill, 2026-03-16*

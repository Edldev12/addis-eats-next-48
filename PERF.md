```md
# Addis Eats Performance Report

## Lighthouse Test

The performance test was run against the production build of Addis Eats.

- Route: `/menu`
- Build: Next.js production build
- Test tool: Lighthouse
- Test date: October 6, 2026
- Environment: Local production server (`npm run start`)

## Lighthouse Metrics

### Before Optimization

| Metric | Result |
|---|---:|
| Performance | 84 |
| FCP | 0.9s |
| LCP | 3.2s |
| TBT | 390ms |
| CLS | 0 |
| Speed Index | 1.6s |

### After Optimization

| Metric | Result |
|---|---:|
| Performance | 95 |
| FCP | 0.8s |
| LCP | 1.9s |
| TBT | 240ms |
| CLS | 0 |
| Speed Index | 0.8s |

## Improvements

- Performance score: **84 → 95**
- FCP: **0.9s → 0.8s**
- LCP: **3.2s → 1.9s**
- TBT: **390ms → 240ms**
- CLS remained **0**
- Speed Index: **1.6s → 0.8s**

## Optimizations

### 1. Optimized Images

All application images use Next.js `Image` instead of raw `<img>` elements.

Images include:

- Explicit `width` and `height`
- Responsive `sizes`
- Automatic image optimization
- `priority` on the first above-the-fold menu image only

### 2. Font Optimization

The application uses `next/font/google` with the Inter font.

```js
import { Inter } from "next/font/google";
```

The font is optimized and self-hosted by Next.js, avoiding an external font stylesheet request.

### 3. Third-Party Scripts

No third-party scripts are currently used by the application.

Therefore, no `next/script` conversion was necessary.

### 4. Environment Configuration

Added `.env.example` with placeholder values for required environment variables.

Real local environment files remain ignored through `.gitignore`:

```text
.env*.local
```

No real secrets are stored in the repository.

## Verification

The production build completed successfully:

```text
npm run build
```

The build generated static pages and static menu dish pages successfully.

Lighthouse was then run against:

```text
http://localhost:3000/menu
```

The optimized production build achieved a **95 Performance score**, with an LCP of **1.9 seconds** and zero cumulative layout shift.

## Notes

The Lighthouse run reports Total Blocking Time rather than a lab INP value. Therefore, no INP number has been invented or estimated.

The current optimized Lighthouse result is:

- Performance: **95**
- FCP: **0.8s**
- LCP: **1.9s**
- TBT: **240ms**
- CLS: **0**
- Speed Index: **0.8s**
```

Now save `PERF.md`, then run:

```powershell
git status
```

Send me the output. **Don't commit yet**—I'll check the status first.
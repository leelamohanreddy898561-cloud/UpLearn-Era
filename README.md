# UpLearn Era — Project Blueprint & README

> Educational website for the **UpLearn Era** YouTube brand — built for B.Tech
> students to learn **AI, Machine Learning, Python, AI tools and practical
> project development**.
>
> Visual/functional inspiration: educational AI-learning sites in general.
> All branding, copy, colors and imagery here are original to UpLearn Era.

---

## 1. What's in this workspace

This site is a **new project** inside `OPEN CODE`. Nothing outside this
folder was modified. For reference, the folder also contains unrelated
projects (`flipmart-react`, `nova-edu`, and loose HTML/JS demos) — leave them
untouched.

## 2. Technology stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **React 19** (function components + hooks) | Component reuse, fast UI updates |
| Build tool | **Vite 8** | Instant dev server, tiny production bundles |
| Routing | **React Router 7** | Clean URLs for 10+ pages |
| Styling | **Plain CSS with custom properties** (`src/index.css`) | Full control of the orange/blue palette + dark mode, zero runtime deps |
| Theming | `data-theme` on `<html>` + `localStorage` + OS preference | No light/dark flash on load |
| Icons | Inline SVG (`src/components/Icon.jsx`) | Crisp at any size, accessible, no icon-font download |
| Linting | oxlint | Fast, matches your other projects |
| Content | Editable data files in `src/data/*.js` | You update text/prices/links without touching components |

## 3. Sitemap

```
/                    Home — hero, stats, courses, videos ticker, projects, tools, prompts, quotes, CTA
/videos              Video library — topic chips + search
/images              Image gallery — category filter + full-screen lightbox
/courses             Courses — level filter + search
/courses/:id         Course detail — outcomes, curriculum accordion, sticky enrol box
/projects            Projects — difficulty filter, stack chips, repo/demo links
/ai-tools            AI tools directory — category filter + search
/prompts             Prompt library — search + one-click copy
/about               About — story, values, timeline, stats
/contact             Contact — info cards, validated form, FAQ
*                    404 page
```

## 4. Design language

- **Background:** white (light) / deep navy (dark).
- **Primary accent:** orange `#F97316` — buttons, active states, stats, highlights.
- **Secondary accent:** blue `#2563EB` — links, badges, chips used sparingly.
- **Typography:** Plus Jakarta Sans (headings) + Inter (body), system fallbacks.
- **Layout:** thin top bar → sticky header (sidebar toggle, brand, quick links,
  theme toggle, YouTube CTA) → **collapsible left sidebar** (icon rail ⇄ full
  menu, grouped Learn / Build / Connect) → main content → 4-column footer.
- **Motion:** 150–200 ms transitions, hover lift on cards, floating hero cards,
  pause-on-hover ticker — all disabled under `prefers-reduced-motion`.
- **Responsive:** 1180 / 1080 / 980 / 900 / 640 breakpoints; sidebar becomes a
  drawer on phones; grids reflow via `auto-fill`/`auto-fit`.
- **Accessibility:** focus-visible rings, aria labels on icon buttons,
  keyboard-operable lightbox (arrows + Escape), semantic headings.

## 5. File map

```
uplearn era/
├─ index.html                # meta, fonts, favicon
├─ package.json / vite.config.js
└─ src/
   ├─ main.jsx               # entry + no-flash theme
   ├─ App.jsx                # routes + scroll restoration
   ├─ index.css              # design tokens + every component style
   ├─ utils/theme.js         # light/dark persistence
   ├─ utils/format.js        # price/views/date helpers
   ├─ data/                  # ← EDIT THESE to update content
   │  ├─ site.js             #   name, links, nav groups, stats
   │  ├─ courses.js          #   courses + curriculum
   │  ├─ videos.js           #   video library
   │  ├─ images.js           #   gallery
   │  ├─ projects.js         #   projects
   │  ├─ tools.js            #   AI tools directory
   │  └─ prompts.js          #   prompt library
   ├─ components/
   │  ├─ Icon.jsx            # inline SVG icon set
   │  ├─ Layout.jsx          # header, footer, sidebar shell
   │  ├─ Sidebar.jsx         # collapsible navigation
   │  ├─ Cards.jsx           # Video/Course/Project/Tool/Prompt cards
   │  ├─ GalleryGrid.jsx     # gallery + lightbox
   │  ├─ ScrollingRow.jsx    # ticker row
   │  ├─ Toast.jsx           # copy/success toast hook
   │  └─ ui.jsx              # SectionHead, Pill, PageHead, Empty…
   └─ pages/                 # one file per route
```

## 6. Commands

```bash
cd "uplearn era"
npm install      # first time only
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
npm run lint     # oxlint
```

## 7. Editing checklist (before going live)

1. `src/data/site.js` — YouTube/Instagram/X links, email, tagline.
2. `src/data/courses.js` — real syllabi, prices, ratings.
3. `src/data/videos.js` — replace `yt` links with each video's URL.
4. `src/data/projects.js` — replace `repo`/`demo` `#` placeholders.
5. Thumbnails/gallery — currently CSS gradients (no image files needed).
   To use real images, add `src` fields to the data and swap the gradient
   divs in `Cards.jsx` / `GalleryGrid.jsx` for `<img>`.
6. Contact form — currently validates + logs locally; wire it to
   Formspree/EmailJS/your API before launch.
7. Deploy — `npm run build` then host `dist/` (Vercel / Netlify / Firebase).

## 8. Build phases (what was done)

1. Scaffold: Vite + React project, config, design tokens, theme utils.
2. App shell: sidebar + header + footer + routing + theme toggle + 404.
3. UI kit: buttons, pills, section heads, icons, toast.
4. Home page: all sections wired to data.
5. Videos + Images (filter + lightbox).
6. Courses list + detail (curriculum accordion, sticky enrol box).
7. Projects + AI Tools directory.
8. Prompt Library (search + copy-to-clipboard).
9. About + Contact (validated form + FAQ) + 404.
10. Polish: responsive audit, reduced motion, a11y, SEO meta, favicon.

# StoryCast

**Human stories. Shared with everyone.**

StoryCast is a small, accessible website for audio and video stories about Rwanda. Every story comes with a full transcript. The design follows the StoryCast Figma file (Home, About and Story Room).

## Pages

| Page | File | What it shows |
| --- | --- | --- |
| Home | `index.html` | Hero, featured story, filterable story cards (All / Audio / Video), accessibility banner |
| Story Room | `story.html?id=<story-id>` | Story details, audio reading preview, full transcript with download, related stories |
| About | `about.html` | Mission and accessibility promise |

Story ids: `kivu-quiet`, `woven-by-hand`, `kigali-after-dark`.

## Project structure

```
storycast/
├── index.html
├── story.html
├── about.html
├── script.js          # story data + page logic
├── pictures/          # local photos
├── scss/              # source styles (edit these)
│   ├── main.scss
│   ├── _variables.scss, _mixins.scss, _base.scss,
│   │   _layout.scss, _components.scss
│   └── pages/         # _home, _about, _story
└── css/styles.css     # compiled output (do not edit by hand)
```

## Getting started

You need [Node.js](https://nodejs.org).

```bash
npm install          # installs Sass
npm run build        # compiles scss/main.scss to css/styles.css
npm run watch        # recompiles on every change
```

Then open `index.html` in a browser, or use a local server such as VS Code Live Server (port 5501 is set in `.vscode/settings.json`).

## Editing content

All stories live in the `STORIES` array at the top of `script.js`. Each story has a type (`Audio` or `Video`), category, duration, title, summary, author, image, and transcript paragraphs. Add an object there and it appears on the Home page, in the Story Room and in related stories.

- **Images:** put photos in `pictures/` and set `image` to the path. If a photo is missing, a coloured placeholder is shown instead.
- **Video stories:** add a `video` embed URL to the story and the Story Room shows the player instead of the photo.

## Design tokens

Colours, fonts, radii and breakpoints are defined in `scss/_variables.scss`. Fonts are Playfair Display (headings) and Inter (body), loaded from Google Fonts.

## Accessibility

- Skip link and a clear landmark structure on every page
- Visible focus rings and keyboard-friendly navigation
- A full transcript for every story, with a download button
- Filters use `aria-pressed` and announce results to screen readers
- The audio preview uses the browser's built-in speech and shows progress
- Respects `prefers-reduced-motion`
- Layouts adapt from desktop to tablet and mobile widths


# MikeMonty.com

A small static personal website now built with [Eleventy](https://www.11ty.dev/).

The current design is a warm personal workshop/archive system: shared layouts, reusable cards, polished article pages, and Markdown content collections.

## Install

```sh
npm install
```

## Preview locally

```sh
npm run dev
```

Then visit the local URL Eleventy prints, usually [http://localhost:8080](http://localhost:8080).

## Build

```sh
npm run build
```

The generated static site is written to `_site/`.

## Add an essay

1. Create a Markdown file in `src/essays/`, such as `src/essays/my-new-essay.md`.
2. Add front matter with `title`, `description`, `intro`, `date`, `readingTime`, `permalink`, `tags: essays`, `navSection: essays`, and `layout: layouts/article.njk`.
3. Write the essay body in Markdown.

The home page latest list and essay index are generated from the essay collection.

## Add a yo-yo tutorial or video

- Add tutorials as Markdown files under `src/yoyo/tutorials/{difficulty}/`.
- Add videos as Markdown files under `src/yoyo/videos/`.
- Put tutorial/video images in `src/assets/images/...` and reference them with root-relative paths like `/assets/images/tutorials/example/step-1.jpg`.

Tutorial and video indexes are generated from Markdown collections.

Tutorial front matter should include `layout: layouts/tutorial.njk`, `title`, `description`, `intro`, `date`, `difficulty`, `difficulty_slug`, `order`, `youtubeId`, `youtubeUrl`, `duration_text`, `permalink`, `tags: tutorials`, and `navSection: yoyo`.

Video front matter should include `layout: layouts/yoyo-video.njk`, `title`, `description`, `intro`, `date`, `section`, `section_slug`, `youtubeId`, `youtubeUrl`, `duration_text`, `permalink`, `tags: yoyoVideos`, and `navSection: yoyo`.

## Images

- Header logo: `src/assets/images/logo.png`
- About portrait: `src/assets/images/mike.jpg`
- Other images: place them under `src/assets/images/` and reference them with root-relative paths such as `/assets/images/tutorials/example/step-1.jpg`.

The header constrains the logo display size in CSS, so the source file can be large. To enable the About portrait, add this front matter to `src/about.md` after placing the image:

```yaml
portraitImage: /assets/images/mike.jpg
portraitAlt: Michael Montgomery
```

## Important files

- `src/_includes/layouts/base.njk`: Shared HTML shell.
- `src/_includes/layouts/home.njk`: Homepage layout.
- `src/_includes/layouts/article.njk`: Essay/article layout.
- `src/_includes/layouts/tutorial.njk`: Yo-yo tutorial layout.
- `src/_includes/layouts/yoyo-video.njk`: Yo-yo video layout.
- `src/_includes/layouts/project.njk`: Future project detail layout.
- `src/_includes/partials/site-header.njk`: Main navigation.
- `src/_includes/partials/page-hero.njk`: Shared page intro component.
- `src/assets/css/style.css`: Site-wide design system.
- `src/essays/`: Essay Markdown.
- `src/yoyo/tutorials/`: Tutorial Markdown.
- `src/yoyo/videos/`: Yo-yo video Markdown.
- `src/projects/`: Project Markdown records and project index.
- `.eleventy.js`: Eleventy configuration.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `_site`
- Runtime variables: none required.

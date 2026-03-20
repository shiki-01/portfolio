# sv

## SEO setup (portfolio)

This project now includes site-wide SEO metadata, structured data, `robots.txt`, and `sitemap.xml`.

### Required environment variable

Set the production domain with a public env var:

```bash
PUBLIC_SITE_URL=https://your-domain.example
```

### Required OGP images

Place these files under `static/og/` (1200x630 recommended):

- `static/og/default-1200x630.png`
- `static/og/home-1200x630.png`
- `static/og/about-1200x630.png`
- `static/og/works-1200x630.png`
- `static/og/blogs-1200x630.png`

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

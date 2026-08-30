# joelhooks.com

Joel Hooks' personal site built with [Astro](https://astro.build).

Published at [joelhooks.com](https://joelhooks.com) via Vercel.

## Tech Stack

- [Astro](https://astro.build) 7.x - Static site framework
- [MDX](https://mdxjs.com) - Markdown with JSX support
- [React](https://react.dev) - UI components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Mux Player](https://www.mux.com/player) - Video embeds
- Content Collections with glob loader for blog posts

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── components/   # React and Astro components
│   ├── content/
│   │   └── blog/     # Blog posts (MDX)
│   ├── layouts/      # Page layouts
│   └── pages/        # Astro pages and routes
├── astro.config.mjs  # Astro configuration
└── content.config.ts # Content collections schema
```

## Development

This project uses pnpm for package management.

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server at localhost:4321
pnpm build            # Build for production
pnpm preview          # Preview production build locally
pnpm newPost          # Create a new blog post
```

## Requirements

- Node.js 22+
- pnpm 10+

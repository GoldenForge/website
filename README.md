# GoldenForge website

Website for [GoldenForge](https://github.com/GoldenForge/GoldenForge), a NeoForge fork bringing Paper (and other forks') performance patches to modded Minecraft servers.

Downloads are served straight from GitHub Actions artifacts via [nightly.link](https://nightly.link) — the supported versions are configured in [`src/lib/service/builds.ts`](src/lib/service/builds.ts).

## Development

Install dependencies with [bun](https://bun.sh/):

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Built with [Next.js](https://nextjs.org/docs) and [Tailwind CSS](https://tailwindcss.com/).

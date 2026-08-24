# quilon.run

The website for [Quilon](https://github.com/assapir/quilon) — a statically-typed
language with no control-flow keywords.

Currently a single coming-soon page. Static assets only, no framework and no build
step, served by Cloudflare Workers.

## Layout

```
public/
  index.html          the page
  styles.css          all of it; --claret at the top drives the accent
  icon.png            the logo, copied from editors/vscode/icon.png in the language repo
  js/
    main.js           highlights the sample on load
    quilon-grammar.js  ┐ vendored from assapir/blog, which ported them from
    quilon-highlight.js┘ editors/vscode/src/grammar.ts — same colours as the editor
```

## Develop

```bash
pnpm install
pnpm dev        # wrangler dev
pnpm deploy     # wrangler deploy
```

## Note on the highlighter

`quilon-grammar.js` and `quilon-highlight.js` are vendored copies, not a second
implementation — they are a browser port of the VS Code extension's grammar. If the
language gains syntax, update them from `assapir/blog` rather than editing here, so
the editor, the blog and this site stay in step.

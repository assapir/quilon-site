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
    quilon-grammar.js    vendored from the Quilon VS Code extension's TextMate grammar
    quilon-highlight.js browser port of its tokenizer, with site-specific colours
```

## Develop

```bash
pnpm install
pnpm dev        # wrangler dev
pnpm deploy     # wrangler deploy
```

## Note on the highlighter

Upstream: `assapir/quilon`, revision `552e8b34b346980e752b0d87aae3050abe5f281d`.

- `quilon-grammar.js` exports `editors/vscode/syntaxes/quilon.tmLanguage.json` as
  `QUILON_GRAMMAR`, omitting only `$schema` and descriptive `comment` fields.
  Keep all rules, scopes, captures, and their ordering identical to upstream.
- `quilon-highlight.js` is a browser port of `editors/vscode/src/grammar.ts`.
  Retain upstream tokenization behavior and Unicode regex flags; HTML escaping
  and scope-to-CSS mapping are site-specific. Collection and block punctuation
  both map to the site's operator colour.

When syncing, take both sources from the same upstream revision and update the
revision here and in the file headers. Do not add local grammar workarounds:
fix upstream first, then sync. No grammar generation or build step is required.

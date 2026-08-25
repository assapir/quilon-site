// Everything on quilon.run is a static asset except this: the star count behind
// the "Star on GitHub" link. It lives in a Worker rather than in the page so the
// number is fetched once an hour for the whole world, instead of once per
// visitor against GitHub's 60-an-hour unauthenticated budget.

const REPO = "assapir/quilon";
const TTL = 3600;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/stars") return env.ASSETS.fetch(request);
    if (request.method !== "GET") return new Response(null, { status: 405 });

    const stars = await starCount();
    if (stars === null) {
      // Nothing to serve and nothing to cache — the page hides the count and
      // the next visitor retries.
      return json({ stars: null }, 503, "no-store");
    }
    return json({ stars }, 200, `public, max-age=${TTL}`);
  },
};

async function starCount() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: {
        // GitHub rejects the request outright without a User-Agent.
        "user-agent": "quilon.run",
        accept: "application/vnd.github+json",
      },
      // The edge cache, not the origin, is what keeps us under the rate limit.
      cf: { cacheTtl: TTL, cacheEverything: true },
    });
    if (!res.ok) return null;
    const { stargazers_count } = await res.json();
    return typeof stargazers_count === "number" ? stargazers_count : null;
  } catch {
    return null;
  }
}

function json(body, status, cacheControl) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
  });
}

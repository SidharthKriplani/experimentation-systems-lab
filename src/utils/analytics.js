// ── Analytics wrapper ─────────────────────────────────────────────────────────
// Uses PostHog via CDN. Requires VITE_POSTHOG_KEY env var.
// App works identically with or without it — all calls fail silently.
// No personal data is collected. Event names and properties are logged to
// console in dev when the key is absent so you can see what would be tracked.

const KEY  = import.meta.env?.VITE_POSTHOG_KEY;
const HOST = import.meta.env?.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';
const IS_DEV = import.meta.env?.DEV;

export function initAnalytics() {
  if (!KEY) return;
  try {
    const s = document.createElement('script');
    s.src   = 'https://us-assets.i.posthog.com/static/array.js';
    s.async = true;
    s.onload = () => {
      try {
        window.posthog?.init(KEY, {
          api_host:         HOST,
          autocapture:      false,
          capture_pageview: false,
          persistence:      'localStorage+cookie',
          sanitize_properties: (props) => {
            // strip any accidental PII keys
            const safe = { ...props };
            delete safe.email; delete safe.name; delete safe.ip;
            return safe;
          },
        });
      } catch {}
    };
    document.head.appendChild(s);
  } catch {}
}

export function track(event, props = {}) {
  try {
    if (IS_DEV && !KEY) {
      console.debug('[analytics]', event, props);
      return;
    }
    window.posthog?.capture(event, props);
  } catch {}
}

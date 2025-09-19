// src/components/embeds/InstagramPost.tsx
import React from 'react';

export default function InstagramPost({ url }: { url: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const run = async () => {
      if (!ref.current) return;

      // Normalize: IG wants a trailing slash
      const permalink = url.endsWith('/') ? url : `${url}/`;

      // Inject blockquote fresh each time
      ref.current.innerHTML = `
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="${permalink}"
          data-instgrm-version="14"
          style="margin:0 auto; max-width:540px; width:100%;"
        ></blockquote>
      `;

      // Wait for the script to be present & loaded
      await loadInstagramScriptOnce();

      // Safely call process when available (some browsers attach a tick later)
      const tryProcess = () => window.instgrm?.Embeds?.process?.();
      tryProcess();

      // tiny retry in case the embed lib attached just after we called it
      const t = window.setTimeout(tryProcess, 50);
      return () => window.clearTimeout(t);
    };

    run();
  }, [url]);

  return (
    <div className="rounded-xl overflow-hidden border border-black/10">
      <div ref={ref} />
    </div>
  );
}

// keep in some utils file or next to the component
let igScriptReady: Promise<void> | null = null;

function loadInstagramScriptOnce() {
  if (window.instgrm?.Embeds?.process) return Promise.resolve();

  if (igScriptReady) return igScriptReady;

  igScriptReady = new Promise<void>((resolve) => {
    // already on the page?
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      // if it was already loaded before we attached, resolve soon
      setTimeout(() => resolve(), 0);
      return;
    }

    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });

  return igScriptReady;
}

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on route change.
 * - If there's a hash (#section), it scrolls that element into view.
 * - Uses useLayoutEffect to avoid a quick “old scroll position” flash.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      // Allow element to be in the DOM before scrolling to it
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

/**
 * Premium heading reveal — adds `.lv-inview` once when a heading enters
 * the viewport. Animation runs a single time (no re-trigger on scroll).
 * Character-by-character reveal is handled by wrapping text nodes into
 * per-character spans with staggered CSS custom properties.
 */

const SELECTOR = [
  "h1",
  "h2",
  "h3",
  ".edu-degree",
  ".work-info h4",
  ".what-content h3",
  ".myworks-card-info h3",
  ".header ul li a",
].join(",");

const SKIP_ATTR = "data-lv-skip";
const READY_ATTR = "data-lv-ready";

function splitChars(el: HTMLElement) {
  if (el.getAttribute(READY_ATTR)) return;
  // Skip if it contains block children (safer: only split pure-text headings)
  const hasElementChild = Array.from(el.childNodes).some(
    (n) => n.nodeType === 1 && !(n as HTMLElement).matches?.("span,em,strong,b,i")
  );
  if (hasElementChild) {
    el.setAttribute(READY_ATTR, "1");
    return;
  }
  const text = el.textContent ?? "";
  if (!text.trim()) return;

  const frag = document.createDocumentFragment();
  let i = 0;
  for (const ch of Array.from(text)) {
    if (ch === " ") {
      frag.appendChild(document.createTextNode(" "));
      continue;
    }
    const span = document.createElement("span");
    span.className = "lv-char";
    span.style.setProperty("--lv-i", String(i));
    span.textContent = ch;
    frag.appendChild(span);
    i++;
  }
  el.textContent = "";
  el.appendChild(frag);
  el.setAttribute(READY_ATTR, "1");
}

let observer: IntersectionObserver | null = null;

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add("lv-inview");
          observer?.unobserve(el);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  return observer;
}

function process(root: ParentNode = document) {
  const nodes = root.querySelectorAll<HTMLElement>(SELECTOR);
  const obs = ensureObserver();
  nodes.forEach((el) => {
    if (el.hasAttribute(SKIP_ATTR)) return;
    if (el.classList.contains("lv-enh")) return;
    // Skip Landing hero — it has its own GSAP intro animations
    if (el.closest(".landing-intro, .landing-info, .landing-h2-info, .landing-h2-info-1, .landing-h2-1, .landing-h2-2")) {
      return;
    }
    el.classList.add("lv-enh");
    splitChars(el);
    obs.observe(el);
  });
}

export function initPremiumHeadings() {
  if (typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const run = () => {
    process();
    // Re-scan periodically for late-mounted content (route changes, GSAP pins)
    const mo = new MutationObserver(() => process());
    mo.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    // slight delay so GSAP text splitters run first on the hero
    setTimeout(run, 300);
  }
}

"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FohMark } from "./foh/foh-mark";

export const RIBBON_KEY = "foh-demo-ribbon";

/** Runs in <head> before paint so a minimized ribbon never flashes open. */
export const ribbonBootScript = `try{if(localStorage.getItem("${RIBBON_KEY}")==="min")document.documentElement.dataset.fohRibbon="min"}catch(e){}`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-foh-ribbon"] });
  return () => observer.disconnect();
}
const isMinimized = () => document.documentElement.dataset.fohRibbon === "min";

function setMinimized(min: boolean) {
  if (min) document.documentElement.dataset.fohRibbon = "min";
  else delete document.documentElement.dataset.fohRibbon;
  try {
    if (min) localStorage.setItem(RIBBON_KEY, "min");
    else localStorage.removeItem(RIBBON_KEY);
  } catch {}
  requestAnimationFrame(() => {
    document.querySelector<HTMLElement>(min ? "[data-ribbon-expand]" : "[data-ribbon-minimize]")?.focus();
  });
}

const pillBase =
  "fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 z-50 items-center rounded-full border border-[#3A322B] bg-foh-ink font-sans text-foh-paper shadow-[0_14px_40px_rgb(0_0_0/0.5)] md:bottom-5 md:left-5";

/**
 * Front of House demo pill, matching the Sterling demo. It can be minimized to a
 * small tab but never removed. The footer's bottom padding reserves room for it.
 */
export function DemoRibbon() {
  const minimized = useSyncExternalStore(subscribe, isMinimized, () => false);

  return (
    <aside data-demo-ribbon aria-label="Demo notice">
      <div
        data-ribbon-full
        className={`${pillBase} flex max-w-[calc(100vw-1.5rem)] gap-2 py-1.5 pr-1.5 pl-3.5 text-base min-[360px]:gap-3.5 min-[360px]:pl-[1.05rem] min-[360px]:text-[1.09rem]`}
      >
        <FohMark className="h-[1.4rem] w-auto shrink-0 max-[399px]:hidden" />
        <span className="flex flex-col leading-tight sm:hidden">
          <span className="text-[0.68rem] font-semibold tracking-[0.14em] text-foh-muted-on-ink uppercase">Demo concept</span>
          <strong className="font-semibold whitespace-nowrap">Front of House</strong>
        </span>
        <span className="hidden whitespace-nowrap sm:inline">
          Demo concept by <strong className="font-semibold">Front of House</strong>
        </span>
        <Link
          href="/pitch/"
          prefetch={false}
          data-pitch-cta
          className="foh-nudge inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full bg-foh-ember-deep px-[1.05rem] font-semibold whitespace-nowrap text-white no-underline transition-colors hover:bg-foh-ember"
        >
          <span className="sm:hidden">Pitch</span>
          <span className="hidden sm:inline">See the pitch</span>
        </Link>
        <button
          type="button"
          data-ribbon-minimize
          onClick={() => setMinimized(true)}
          aria-label="Minimize demo banner"
          aria-expanded={!minimized}
          className="grid size-12 shrink-0 place-items-center rounded-full text-foh-muted-on-ink transition-colors hover:bg-white/10 hover:text-foh-paper"
        >
          <ChevronDown className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div data-ribbon-tab className={`${pillBase} gap-1 p-1 text-[0.95rem]`}>
        <button
          type="button"
          data-ribbon-expand
          onClick={() => setMinimized(false)}
          aria-label="Expand demo banner"
          aria-expanded={!minimized}
          className="inline-flex min-h-12 items-center gap-2 rounded-full pr-2 pl-3 font-semibold whitespace-nowrap transition-colors hover:bg-white/10"
        >
          <FohMark className="h-[1.15rem] w-auto shrink-0" />
          FOH Demo
        </button>
        <Link
          href="/pitch/"
          prefetch={false}
          data-pitch-cta-mini
          aria-label="See the pitch"
          className="foh-nudge grid size-12 shrink-0 place-items-center rounded-full bg-foh-ember-deep text-white transition-colors hover:bg-foh-ember"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}

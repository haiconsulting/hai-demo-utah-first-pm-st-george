"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export const RIBBON_KEY = "uf-demo-ribbon";

/** Runs before paint so a dismissed ribbon never flashes back in. */
export const ribbonBootScript = `try{if(localStorage.getItem("${RIBBON_KEY}")==="off")document.documentElement.dataset.ribbon="off"}catch(e){}`;

export function DemoRibbon() {
  function dismiss() {
    document.documentElement.dataset.ribbon = "off";
    try {
      localStorage.setItem(RIBBON_KEY, "off");
    } catch {}
  }

  return (
    <aside
      data-demo-ribbon
      aria-label="About this demo"
      className="fixed inset-x-3 bottom-3 z-50 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[1.75rem] bg-[#221c18] p-2.5 pl-5 text-[1.05rem] leading-snug text-[#f4ecdd] shadow-[0_2px_6px_rgba(34,28,24,.08),0_22px_50px_rgba(34,28,24,.28)] sm:right-auto sm:max-w-[calc(100vw-1.5rem)] sm:flex-nowrap sm:rounded-full sm:text-[1.12rem]"
    >
      <span className="flex min-w-0 basis-full items-center gap-2.5 py-1 sm:basis-auto">
        <span aria-hidden="true" className="inline-block size-2.5 shrink-0 rounded-full bg-[#c75b39]" />
        <span>
          Demo concept by <strong className="font-semibold">HAI Consulting</strong>
          <span className="hidden lg:inline">. Not the official Utah First site.</span>
        </span>
      </span>
      <span className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <Link
          href="/pitch/"
          prefetch={false}
          data-pitch-cta
          className="pitch-nudge inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a8472b] px-5 text-[1.05rem] font-semibold whitespace-nowrap text-white no-underline transition-colors hover:bg-[#8f3b23] focus-visible:outline-[#d97b57] sm:text-[1.12rem]"
        >
          See the pitch <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="grid size-12 shrink-0 place-items-center rounded-full text-[#c9bba0] transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss demo notice"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </span>
    </aside>
  );
}

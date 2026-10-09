"use client";

import Link from "next/link";
import { X } from "lucide-react";

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
      className="fixed bottom-3 left-3 z-50 flex max-w-[calc(100vw-1.5rem)] items-center gap-3 rounded-full bg-[#221c18] py-1.5 pr-1.5 pl-4 text-[0.8rem] leading-tight text-[#f4ecdd] shadow-[0_2px_6px_rgba(34,28,24,.08),0_22px_50px_rgba(34,28,24,.24)]"
    >
      <span className="flex items-center gap-2">
        <span aria-hidden="true" className="inline-block size-2 rounded-full bg-[#c75b39]" />
        <span>
          Demo concept by <strong className="font-semibold">HAI Consulting</strong>
          <span className="hidden sm:inline">. Not the official Utah First site.</span>
        </span>
      </span>
      <Link href="/pitch/" prefetch={false} className="font-semibold whitespace-nowrap text-[#d97b57] underline-offset-2 hover:underline">
        See the pitch
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className="grid size-8 place-items-center rounded-full text-[#c9bba0] transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss demo notice"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  );
}

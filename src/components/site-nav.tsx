"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { mainPhone, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  // Storing the path the menu was opened on closes it automatically after navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                lang={"lang" in item ? item.lang : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-2 text-[0.95rem] font-semibold whitespace-nowrap text-text no-underline transition-colors hover:bg-sand-2 hover:text-night xl:px-3",
                  isActive(item.href) && "bg-sand-2 text-night",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2 lg:hidden">
        <Link
          href="/free-rent-analysis/"
          className="hidden h-10 items-center rounded-full bg-rock px-4 text-sm font-semibold text-white no-underline hover:bg-rock-deep sm:inline-flex"
        >
          Free Rent Analysis
        </Link>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line bg-cream text-night"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-sand shadow-lg lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  lang={"lang" in item ? item.lang : undefined}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-lg px-3 py-3 text-lg font-semibold text-night no-underline hover:bg-sand-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 border-t border-line pt-4 sm:grid-cols-2">
            <Link
              href="/free-rent-analysis/"
              className="flex h-12 items-center justify-center rounded-full bg-rock font-semibold text-white no-underline"
            >
              Get a Free Rent Analysis
            </Link>
            <a
              href={`tel:${mainPhone.e164}`}
              className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-night/80 font-semibold text-night no-underline"
            >
              <Phone className="size-4" aria-hidden="true" /> {mainPhone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cta, nav } from "@/content/site";
import { Close, Menu } from "./icons";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-nav ${scrolled || open ? "is-solid" : ""}`}>
      <nav aria-label="Primary" className="wrap site-nav-bar">
        <a href="#top" className="wordmark" aria-label="Alma, back to top">
          Alma
        </a>

        <ul className="hidden items-center gap-5 md:flex lg:gap-9">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a href={cta.href} className="btn btn-primary btn-sm">
            {cta.label}
          </a>
          <button
            type="button"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <Close className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="md:hidden">
        <ul className="wrap pb-5 pt-1">
          {nav.map((item) => (
            <li key={item.href} className="rule">
              <a
                href={item.href}
                className="block py-3.5 text-[1.125rem] font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

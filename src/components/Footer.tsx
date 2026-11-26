import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="on-dark bg-black">
      <div className="wrap-wide pb-6 pt-[clamp(3.5rem,6.7vw,6rem)]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24">
          <div>
            <a href="#top" className="wordmark" aria-label="Alma, back to top">
              Alma
            </a>
            <p className="mt-4 max-w-[16rem] leading-[1.35] text-snow-2">
              {site.tagline}.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-20"
          >
            {footer.columns.map((column) => (
              <div key={column.label}>
                <h2 className="footer-label">{column.label}</h2>
                <ul className="mt-3 grid gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="footer-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-[clamp(3rem,6.7vw,6rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-snow-3">
          <p>{footer.copyright}</p>
          {site.contactEmail ? (
            <a href={`mailto:${site.contactEmail}`} className="footer-link">
              {site.contactEmail}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

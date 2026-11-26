import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="on-dark bg-night">
      <div className="wrap rule py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" className="wordmark" aria-label="Alma, back to top">
              Alma
            </a>
            <p className="t-body-sm mt-3 max-w-[18rem] text-snow-2">
              {site.tagline}.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
            {site.contactEmail ? (
              <li>
                <a href={`mailto:${site.contactEmail}`} className="nav-link">
                  {site.contactEmail}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <p className="t-caption mt-12 text-ink-3">
          © 2026 Alma. Human-reported. Human-written.
        </p>
      </div>
    </footer>
  );
}

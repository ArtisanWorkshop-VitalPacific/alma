import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-[var(--gutter)] py-24 text-center">
      <div>
        <p className="wordmark">Alma</p>
        <h1 className="t-display-1 mt-10">This page is not here.</h1>
        <p className="t-body-lg mx-auto mt-5 max-w-[28rem] text-ink-2">
          The link may be old, or the address may have a typo.
        </p>
        <Link href="/" className="btn btn-primary mt-9">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}

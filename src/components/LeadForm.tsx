"use client";

import { useState, type FormEvent } from "react";

/**
 * Collects a warm lead and hands it to the visitor's own email app.
 * Nothing is stored or sent by the site itself.
 */
export function LeadForm({ contactEmail }: { contactEmail: string }) {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      "We would like to start with a free story.",
      "",
      `Name: ${value("name")}`,
      `University: ${value("university")}`,
      `Email: ${value("email")}`,
    ];
    if (value("alum")) lines.push(`Alum we have in mind: ${value("alum")}`);

    const subject = `A warm lead from ${value("university")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="lead-name">Your name</label>
        <input id="lead-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="lead-university">University</label>
        <input
          id="lead-university"
          name="university"
          autoComplete="organization"
          required
        />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="lead-email">Email</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="lead-alum">The alum you have in mind (optional)</label>
        <input id="lead-alum" name="alum" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
        <button type="submit" className="btn btn-light">
          Send your lead
        </button>
        <p className="t-body-sm text-snow-2" role="status">
          {opened
            ? "Your email app should now be open. Send the message to finish."
            : "Opens your email app with these details filled in."}
        </p>
      </div>
    </form>
  );
}

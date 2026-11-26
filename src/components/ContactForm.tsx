"use client";

import { useState, type FormEvent } from "react";
import { cta } from "@/content/site";

/**
 * Collects a few details and hands them to the visitor's own email program.
 * Nothing is stored or sent by the site itself.
 */
export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const lines = [
      "We would like to discuss a first profile.",
      "",
      `Name: ${value("name")}`,
      `University: ${value("university")}`,
      `Email: ${value("email")}`,
    ];
    if (value("office")) lines.push(`Office: ${value("office")}`);
    if (value("person")) {
      lines.push(`The person we have in mind: ${value("person")}`);
    }

    const subject = `An inquiry from ${value("university")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="field">
        <label htmlFor="contact-name">Your name</label>
        <input id="contact-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="contact-university">University</label>
        <input
          id="contact-university"
          name="university"
          autoComplete="organization"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="contact-office">Your office (optional)</label>
        <input
          id="contact-office"
          name="office"
          autoComplete="organization-title"
        />
      </div>
      <div className="field sm:col-span-2">
        <label htmlFor="contact-person">
          The person whose story you have in mind (optional)
        </label>
        <input id="contact-person" name="person" />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3 sm:col-span-2">
        <button type="submit" className="btn btn-light">
          {cta.label}
        </button>
        <p className="t-body-sm text-snow-2" role="status">
          {opened
            ? "Your email program should now be open. Send the message to reach us."
            : "This opens a message in your email program with these details filled in."}
        </p>
      </div>
    </form>
  );
}

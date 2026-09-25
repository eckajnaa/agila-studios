/**
 * Contact form endpoint — receives submissions from the landing page Contact section.
 *
 * Valid submissions are emailed to CONTACT_TO_EMAIL through Resend, with the visitor's
 * address as Reply-To so the studio can answer straight from their inbox.
 *
 * Env vars (see .env.example):
 *   RESEND_API_KEY      — from resend.com/api-keys
 *   CONTACT_TO_EMAIL    — inbox that receives the messages
 *   CONTACT_FROM_EMAIL  — sender; defaults to Resend's test address, which can only
 *                         deliver to the Resend account's own email until a domain is verified
 */

import { CONTACT_LIMITS, EMAIL_PATTERN, type ContactField } from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = (body ?? {}) as Partial<Record<ContactField, unknown>>;
  const fields = {} as Record<ContactField, string>;

  for (const key of Object.keys(CONTACT_LIMITS) as ContactField[]) {
    const value = typeof input[key] === "string" ? input[key].trim() : "";
    if (!value) {
      return Response.json({ error: `Please fill in your ${key}.` }, { status: 400 });
    }
    if (value.length > CONTACT_LIMITS[key]) {
      return Response.json({ error: `Your ${key} is too long.` }, { status: 400 });
    }
    fields[key] = value;
  }

  if (!EMAIL_PATTERN.test(fields.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return Response.json(
      { error: "The contact form isn't set up yet — please reach us on Discord for now." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Agila Studios <onboarding@resend.dev>",
      to: [to],
      reply_to: fields.email,
      // Line breaks in a subject line would break the email headers.
      subject: `[Website] ${fields.subject.replace(/[\r\n]+/g, " ")}`,
      text: [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Subject: ${fields.subject}`,
        "",
        fields.message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend rejected the email:", res.status, await res.text());
    return Response.json(
      { error: "We couldn't send your message right now. Please try again or reach us on Discord." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}

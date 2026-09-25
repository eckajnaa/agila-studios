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
 *
 * Spam protection: a honeypot field (bots that fill it get a fake success and nothing is
 * sent) and a per-IP rate limit.
 */

import { CONTACT_LIMITS, EMAIL_PATTERN, HONEYPOT_FIELD, type ContactField } from "@/lib/contact";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

// In-memory, so it resets on restart and isn't shared between server instances —
// enough to stop one visitor or script hammering the form, not a hard guarantee.
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentSubmissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentSubmissions.set(ip, recent);

  // Keep the map from growing forever on a long-running server.
  if (recentSubmissions.size > 5000) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentSubmissions.delete(key);
    }
  }
  return false;
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = (body ?? {}) as Partial<Record<ContactField | typeof HONEYPOT_FIELD, unknown>>;

  // Pretend it worked so the bot has no reason to retry differently.
  if (typeof input[HONEYPOT_FIELD] === "string" && input[HONEYPOT_FIELD].trim() !== "") {
    return Response.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { error: "You've sent a few messages already — please wait a few minutes and try again." },
      { status: 429 },
    );
  }

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

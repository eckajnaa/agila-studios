/**
 * Contact form endpoint — receives submissions from the landing page Contact section.
 *
 * Validation is done here; delivery (Discord webhook / email) is not wired up yet,
 * so valid submissions currently get a 503 and the form shows its error state.
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

  // TODO: deliver `fields` (Discord webhook or email) and return { ok: true }.
  return Response.json(
    { error: "The contact form isn't set up yet — please reach us on Discord for now." },
    { status: 503 },
  );
}

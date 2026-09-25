/**
 * Contact form field limits, shared by the landing page form and /api/contact.
 */

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 4000,
} as const;

export type ContactField = keyof typeof CONTACT_LIMITS;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Shared TypeScript types used across the Landing, About, and Portfolio
 * pages. Add new shared shapes here rather than duplicating them in a
 * page/section — anything more than one page needs belongs in this file.
 */

export type Category =
  | "builds"
  | "models"
  | "development"
  | "editing"
  | "scripts"
  | "animation";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  thumbnailUrl: string;
  imageUrls?: string[];
  videoUrl?: string;
  tags?: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: string;
  authorAvatarUrl?: string;
  quote: string;
  rating?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
  socialLinks?: {
    discord?: string;
    twitter?: string;
    youtube?: string;
    twitch?: string;
  };
}

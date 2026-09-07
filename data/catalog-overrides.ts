import type { Book } from "@/data/catalog";

export const bookOverrides: Record<string, Partial<Book>> = {
  "12th-fail-hindi": { cover_url: "/covers/12th-fail-hindi.webp" },
  "a-thousand-splendid-suns": { cover_url: "/covers/a-thousand-splendid-suns.webp" },
  "a-gentleman-in-moscow": { cover_url: "/covers/a-gentleman-in-moscow.webp" },
  "a-brief-history-of-time": { cover_url: "/covers/a-brief-history-of-time.webp" },
  "modern-india-bipan-chandra": { cover_url: "/covers/modern-india-bipan-chandra.webp", pages: 150 },
  "srimad-bhagavad-gita-hindi": { cover_url: "/covers/srimad-bhagavad-gita-hindi.webp" },
  "dharmayoddha-kalki-avatar-of-vishnu": { cover_url: "/covers/dharmayoddha-kalki-avatar-of-vishnu.webp" },
  "pinnacle-ssc-reasoning-8th-edition": { cover_url: "/covers/pinnacle-ssc-reasoning-8th-edition.webp" }
};

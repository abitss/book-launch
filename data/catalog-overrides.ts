import type { Book } from "@/data/catalog";

export const bookOverrides: Record<string, Partial<Book>> = {
  "12th-fail-hindi": { cover_url: "/covers/12th-fail-hindi.webp" },
  "a-thousand-splendid-suns": { cover_url: "/covers/a-thousand-splendid-suns.webp" },
  "a-gentleman-in-moscow": { cover_url: "/covers/a-gentleman-in-moscow.webp" },
  "a-brief-history-of-time": { cover_url: "/covers/a-brief-history-of-time.webp" },
  "modern-india-bipan-chandra": { cover_url: "/covers/modern-india-bipan-chandra.webp", pages: 150 },
  "srimad-bhagavad-gita-hindi": { cover_url: "/covers/srimad-bhagavad-gita-hindi.webp" },
  "dharmayoddha-kalki-avatar-of-vishnu": { cover_url: "/covers/dharmayoddha-kalki-avatar-of-vishnu.webp" },
  "pinnacle-ssc-reasoning-8th-edition": { cover_url: "/covers/pinnacle-ssc-reasoning-8th-edition.webp" },

  "pride-and-prejudice-illustrated": {
    cover_url: "https://api-web.getepic.com/utils/resize.jpg?quality=100&url=https%3A%2F%2Fcdn-gcp-media.getepic.com%2Fdrm%2F0%2F71360%2Fcover_large%402x.png&width=1200"
  },
  "ancient-india-rs-sharma": {
    cover_url: "https://bookmall.in/wp-content/uploads/2023/11/Ancient-India-Old-Ncert-History-By-Ram-Sharan-Sharma-XI-Class-English-Medium.jpg"
  },
  "rich-dad-poor-dad": {
    cover_url: "https://heritagebooks.com.np/wp-content/uploads/2022/03/Rich-dad-Poor-dad.jpg"
  },
  "sapiens": {
    cover_url: "https://simg.marwin.kz/media/catalog/product/migrated/article/22577/30_tn3.jpg"
  },
  "history-of-medieval-india": {
    cover_url: "https://down-id.img.susercontent.com/file/sg-11134201-7rblu-llla1qobqgauec"
  },
  "sita-warrior-of-mithila": {
    cover_url: "https://target.scene7.com/is/image/Target/GUEST_e0234cee-6a99-485d-8542-0c117f69b659"
  },
  "brief-history-modern-india": {
    cover_url: "https://n1.sdlcdn.com/imgs/k/m/8/spectrum-A-BRIEF-HISTORY-OF-SDL740915449-1-a9466.png"
  },
  "the-book-thief": {
    cover_url: "https://www.32books.com/wp-content/uploads/2018/06/The-Book-Thief-Markus-Zusak.jpg"
  },
  "the-fault-in-our-stars": {
    cover_url: "https://www.crossword.in/cdn/shop/products/crosswordonline-books-default-title-the-fault-in-our-stars-paperback-green-john-40421817319641.jpg?v=1776686376"
  },
  "the-diary-of-a-young-girl": {
    cover_url: "https://novelunits.com/28-large_default/anne-frank--the-diary-of-a-young-girl.jpg"
  },
  "the-plague": {
    cover_url: "https://prodimage.images-bn.com/pimages/2940011809613_p0_v1_s600x595.jpg"
  },
  "the-odyssey": {
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Publication/1d/f7/e8/mzi.xnqxybqy.jpg/1200x1200wz.jpg"
  },
  "the-girl-with-the-dragon-tattoo": {
    cover_url: "https://d3525k1ryd2155.cloudfront.net/h/146/410/1391410146.0.x.jpg"
  },
  "the-kite-runner": {
    cover_url: "https://static.tumblr.com/sf0rok1/UEem1juax/kiterunner.jpg"
  }
};

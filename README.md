# eBookies.store

A full digital bookstore built with Next.js 16, Razorpay and Supabase.

## What changed

The original single-book landing page has been upgraded into a multi-category bookstore with:

- eBookies.store branding and responsive storefront
- Category and subcategory browsing
- Search by title, author and category
- Dedicated book pages
- Product-aware Razorpay orders (price is resolved server-side)
- Razorpay signature verification before fulfillment
- Private ebook delivery through short-lived Supabase Storage signed URLs
- Owner-only admin command center
- Add/edit/delete books
- Publish/unpublish and feature books
- Add/delete categories and subcategories
- Upload cover images and ebook files
- Order persistence in Supabase

## Required environment variables

Create these in `.env.local` for local development and in Vercel Project Settings → Environment Variables for production.

```env
NEXT_PUBLIC_SITE_URL=https://ebookies.store

RAZORPAY_KEY_ID=rzp_live_or_test_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_or_test_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

ADMIN_PASSWORD=choose-a-strong-owner-password
ADMIN_SESSION_SECRET=generate-a-long-random-secret
```

Never commit real secrets to GitHub.

## Database setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Add the Supabase environment variables above.
5. Redeploy.

The schema creates `categories`, `subcategories`, `books` and `orders`, plus a public `covers` bucket and private `ebooks` bucket.

## Admin

Visit `/admin`.

The owner login uses `ADMIN_PASSWORD` and stores only a signed HTTP-only session cookie. Catalog mutations and uploads are rejected server-side unless the owner session is valid.

## Razorpay

The browser sends only a book ID. `/api/create-order` looks up the live book record and uses its server-side price to create the Razorpay order. `/api/verify-payment` verifies the Razorpay signature before marking the order paid or issuing a private download link.

For test mode, use Razorpay test keys first. Replace them with live keys only after testing checkout end-to-end.

## Digital rights

Only upload and sell ebooks, notes or publications you own or have explicit permission/license to distribute. Do not put paid ebook files in `/public`; the new fulfillment path uses the private Supabase `ebooks` bucket.

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

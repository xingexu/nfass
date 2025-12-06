# n/fäss - Personal Blog

A production-quality personal blog for Pedrom Basidj built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and TipTap.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   ```bash
   npx prisma db push
   ```

3. **Add the logo:**
   - Place your logo image at `/public/nfass-logo.png`
   - The logo should be the "n/fäss" wordmark in bright red (#FF0033) on white

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin/login
   - Admin credentials:
     - Username: `pedrombasidj`
     - Password: `bigguy !RY7!@gak`

## Features

- **Rich Text Editor**: TipTap editor with syntax highlighting, images, links, and more
- **Image Uploads**: Drag and drop or paste images directly into posts
- **Admin Panel**: Full CRUD operations for blog posts
- **Filtering**: Filter posts by year and month
- **Responsive Design**: Modern, clean UI with Tailwind CSS
- **Authentication**: JWT-based authentication with httpOnly cookies

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM with SQLite
- TipTap Rich Text Editor
- JWT Authentication (jose)
- Lowlight for syntax highlighting

## Project Structure

```
app/
  ├── layout.tsx          # Root layout with fonts
  ├── page.tsx            # Home page with post list
  ├── blog/[slug]/        # Individual blog post pages
  ├── journal/            # Journal page (redirects to home)
  └── admin/              # Admin panel
      ├── login/          # Login page
      └── posts/          # Post management
components/
  ├── Navbar.tsx          # Navigation bar
  ├── Footer.tsx          # Footer
  ├── PostCard.tsx        # Post card component
  ├── PostListFilters.tsx # Year/month filters
  ├── PostEditor.tsx      # Post editor form
  ├── AdminShell.tsx      # Admin layout wrapper
  ├── ImageUploadZone.tsx # Image upload component
  └── Editor/
      └── TipTapEditor.tsx # Rich text editor
lib/
  ├── prisma.ts           # Prisma client
  ├── auth.ts             # Authentication utilities
  ├── slug.ts             # Slug generation
  └── filters.ts           # Filter utilities
api/
  ├── auth/               # Authentication endpoints
  ├── posts/              # Post CRUD endpoints
  └── uploads/            # Image upload endpoint
```

## Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-change-in-production"
```

## Notes

- Images are stored in `/public/uploads/`
- The database file (`dev.db`) is created automatically when you run `npx prisma db push`
- Make sure to add your logo image at `/public/nfass-logo.png` before running the app




# Personal Blog

A modern, responsive personal blog built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean design, dark/light mode toggle, and markdown-based content management.

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS v4
- **Theme System**: Light/dark mode with smooth transitions and localStorage persistence
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Blog Functionality**:
  - Markdown-based posts with frontmatter
  - Monthly post grouping
  - Tag-based filtering
  - Reading time estimation
  - Featured posts
- **Navigation**: Clean navigation with Tools, Daily, and Case Studies sections
- **SEO Optimized**: Proper metadata, Open Graph tags, and structured data
- **Static Export**: Optimized for GitHub Pages deployment
- **Animations**: Smooth animations using Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-blog-repo.git
cd your-blog-repo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Adding Blog Posts

1. Create a new markdown file in `content/posts/` with the format: `YYYY-MM-DD-post-title.md`

2. Add frontmatter at the top of your file:
```markdown
---
title: "Your Post Title"
date: "2024-12-01"
excerpt: "A brief description of your post"
tags: ["tag1", "tag2", "tag3"]
featured: false
---

# Your Post Content

Write your post content here using markdown...
```

### Customizing Site Configuration

Edit `src/config/site.ts` to update:
- Site name and description
- Author information
- Social media links
- Navigation items

## 🎨 Customization

### Theme Colors

Update the CSS custom properties in `src/app/globals.css` to change the color scheme:

```css
:root {
  --primary: #3b82f6;
  --background: #ffffff;
  /* ... other colors */
}
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your content
3. Update navigation in `src/config/site.ts` if needed

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. The included workflow will automatically deploy on push to main/master

### Manual Build

```bash
npm run build
```

The static files will be generated in the `out/` directory.

### Other Platforms

This blog can be deployed to any static hosting service:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## 📁 Project Structure

```
├── .github/workflows/    # GitHub Actions deployment
├── content/posts/        # Blog post markdown files
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # Reusable React components
│   ├── config/         # Site configuration
│   ├── contexts/       # React contexts (theme)
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript type definitions
├── next.config.ts      # Next.js configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

## 🛠️ Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX rendering
- [date-fns](https://date-fns.org/) - Date utilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/your-blog-repo/issues).

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/your-blog-repo](https://github.com/yourusername/your-blog-repo)

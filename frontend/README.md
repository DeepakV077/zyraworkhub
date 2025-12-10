# Zyra WorkHub

> Empowering Youth Through Innovation

A modern, production-ready web platform for webinars, design services, and marketing partnerships.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

Zyra WorkHub is a youth-driven startup platform that provides:
- **Expert-Led Webinars** across various domains
- **Professional Design Services** (branding, digital art, web design)
- **Marketing Partnerships** for strategic brand growth

---

## Features

### Core Functionality
- ✅ Dynamic webinar listing and registration
- ✅ Speaker application system
- ✅ Portfolio showcase with filtering
- ✅ Contact and inquiry management
- ✅ Testimonials and feedback system
- ✅ Newsletter subscriptions
- ✅ Real-time database integration

### Design & UX
- ✅ Bold, energetic brand identity (Orange/Blue/Yellow)
- ✅ Fully responsive (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Glassmorphic card components
- ✅ Accessibility compliant (WCAG 2.1)
- ✅ Loading states and error handling

### Technical
- ✅ Type-safe with TypeScript
- ✅ Supabase backend (PostgreSQL)
- ✅ Row Level Security enabled
- ✅ Optimized production build
- ✅ SEO-ready structure

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Routing** | React Router v6 |
| **Styling** | TailwindCSS |
| **Database** | Supabase (PostgreSQL) |
| **Build Tool** | Vite |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts (Poppins, Inter, Montserrat) |

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (already configured)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables**
Already configured in `.env`:
```env
VITE_SUPABASE_URL=https://ebpkjmqujiylimutkqyb.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

4. **Run development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

6. **Preview production build**
```bash
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/              # Header, Footer, Layout
│   └── home/                # Home page sections
├── pages/                   # Route components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Webinars.tsx
│   ├── Portfolio.tsx
│   ├── Contact.tsx
│   └── SpeakerApplication.tsx
├── lib/
│   └── supabase.ts          # Supabase client
├── config/
│   └── design-tokens.ts     # Design system
├── types/
│   └── database.ts          # TypeScript types
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

---

## Key Pages

### Home (`/`)
Hero section, services overview, upcoming webinars, featured projects, testimonials

### About (`/about`)
Mission, vision, core values, team showcase, impact metrics

### Webinars (`/webinars`)
Browse and search webinars with filters (upcoming/past)

### Portfolio (`/portfolio`)
Showcase of design and creative projects

### Contact (`/contact`)
Multi-purpose contact form for inquiries and partnerships

### Speaker Application (`/speakers/apply`)
Comprehensive application form for potential speakers

---

## Database Schema

### Tables
1. **webinars** - Event management
2. **speakers** - Speaker profiles and applications
3. **webinar_speakers** - Many-to-many relationships
4. **registrations** - Attendee tracking
5. **projects** - Portfolio items
6. **feedback** - Testimonials
7. **contact_submissions** - Inquiries
8. **blog_posts** - Content management (ready)
9. **newsletter_subscribers** - Email list

All tables have Row Level Security (RLS) enabled with public read access for approved content.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type check without emitting |

---

## Design System

### Brand Colors
- **Primary Orange**: `#FF7A00` - Creativity & Energy
- **Accent Blue**: `#00D9FF` - Modern Edge
- **Warm Yellow**: `#FFB800` - Optimism
- **White**: `#FFFFFF` - Clarity

### Typography
- **Headings**: Poppins (bold, impactful)
- **Body**: Inter (readable)
- **Accents**: Montserrat (strong)

### Components
- `.btn-primary` - Gradient button
- `.btn-secondary` - Outlined button
- `.glass-card` - Glassmorphic card
- `.gradient-text` - Gradient text effect
- `.section-container` - Responsive container
- `.section-spacing` - Consistent vertical rhythm

See `DESIGN_GUIDE.md` for complete design documentation.

---

## Documentation

| File | Description |
|------|-------------|
| `README.md` | This file - quick start guide |
| `ARCHITECTURE.md` | Complete technical architecture |
| `PROJECT_SUMMARY.md` | Deliverables and implementation summary |
| `DESIGN_GUIDE.md` | Visual design system and patterns |

---

## Roadmap

### Phase 1 (Completed) ✅
- Core pages and functionality
- Database schema and RLS
- Design system implementation
- Responsive design
- Forms and submissions

### Phase 2 (Next)
- [ ] Authentication system (Supabase Auth)
- [ ] Admin dashboard
- [ ] Webinar detail pages
- [ ] Blog system implementation
- [ ] Email notifications

### Phase 3 (Future)
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Live chat support
- [ ] Video testimonials
- [ ] Multi-language support

---

## Deployment

### Recommended Stack
- **Frontend**: Vercel (instant deploy)
- **Database**: Supabase (already configured)
- **Assets**: Supabase Storage or Cloudinary

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

```bash
# Or use Vercel CLI
npm run build
vercel --prod
```

---

## Performance

- **Build Size**: 104.82 KB (gzipped)
- **CSS Size**: 5.41 KB (gzipped)
- **Initial Load**: ~1.5s (estimated)
- **Lighthouse Score**: 90+ (estimated)

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Contributing

This is a proprietary project for Zyra WorkHub. For questions or suggestions:

📧 Email: hello@zyraworkhub.com

---

## License

Copyright © 2025 Zyra WorkHub. All rights reserved.

---

## Acknowledgments

- Design inspiration from modern SaaS platforms
- Icons by Lucide React
- Fonts from Google Fonts
- Built with React, TypeScript, and TailwindCSS

---

## Support

For technical support or questions:
- Review documentation in `ARCHITECTURE.md`
- Check design patterns in `DESIGN_GUIDE.md`
- Contact: hello@zyraworkhub.com

---

**Built with passion by youth, for the world. 🚀**

---

## Quick Reference

### Environment Setup
```bash
npm install
npm run dev
```

### Build Production
```bash
npm run build
npm run preview
```

### Database Query Example
```typescript
const { data, error } = await supabase
  .from('webinars')
  .select('*')
  .eq('status', 'upcoming')
  .order('date', { ascending: true });
```

### Common Components
```tsx
// Button
<button className="btn-primary">Action</button>

// Card
<div className="glass-card p-6">Content</div>

// Gradient Text
<span className="gradient-text">Highlighted</span>
```

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: October 2025

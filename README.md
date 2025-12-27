# 🚀 Zyra Academy

> **Empowering Youth Through Innovation**

A modern, fully static web platform showcasing webinars, design services, and marketing partnerships built by a youth-driven startup.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**Zyra Academy** is a vibrant platform designed to connect learners with expert-led webinars, showcase creative design work, and facilitate marketing partnerships. Built with modern web technologies, the site delivers a blazing-fast, responsive, and accessible user experience.

### What We Offer

- 🎓 **Expert-Led Webinars** – Interactive learning sessions across AI, Web Development, Design, and more
- 🎨 **Design Services** – Professional branding, posters, digital art, and web design
- 📈 **Marketing Support** – Strategic partnerships and brand growth solutions
- 💼 **Portfolio Showcase** – Curated collection of completed projects
- 📝 **Speaker Applications** – Platform for experts to share their knowledge

---

## ✨ Features

### Core Functionality
- ✅ **Dynamic Webinar Listing** – Filter by status (All/Ongoing/Completed), sorted by latest
- ✅ **Speaker Application System** – Structured form with document upload
- ✅ **Portfolio Gallery** – Categorized projects with modal preview
- ✅ **Blog & Articles** – Content-rich posts with timeline layouts
- ✅ **Contact Forms** – Service inquiries and general contact
- ✅ **Privacy & Terms** – Legal compliance pages

### Design & UX
- ✅ **Bold Brand Identity** – Energetic Orange (#FF7A00) / Yellow (#FFD65A) gradient palette
- ✅ **Fully Responsive** – Mobile-first design, optimized for all devices
- ✅ **Smooth Animations** – Subtle hover effects and transitions
- ✅ **Accessibility** – Semantic HTML, keyboard navigation, ARIA labels
- ✅ **Performance** – Optimized images, code splitting, lazy loading
- ✅ **Typography** – Consistent Poppins font family throughout

### Technical Highlights
- ✅ **Type-Safe** – Strict TypeScript configuration
- ✅ **Static Site** – No backend dependencies, fully client-side
- ✅ **SEO-Ready** – Proper meta tags and structured routes
- ✅ **Production Build** – Minified, tree-shaken, and optimized
- ✅ **Linting & Formatting** – ESLint + Prettier configurations

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.9.3 | Type safety |
| **Vite** | 7.1.12 | Build tool & dev server |
| **React Router** | 7.9.5 | Client-side routing |
| **TailwindCSS** | 3.4.1 | Utility-first styling |
| **Lucide React** | 0.344.0 | Icon library |
| **Framer Motion** | 12.23.24 | Animations (optional) |

### Development Tools
- **ESLint** – Code linting and quality checks
- **PostCSS** – CSS processing and autoprefixer
- **TypeScript ESLint** – TypeScript-specific linting rules

### Server (Optional)
The `server/` directory contains a Node.js backend for extended features (speaker submissions, contact forms). It's currently **optional** and not required for the static frontend.

---

## 📁 Project Structure

```
zyraacademy/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── assets/          # Images and static files
│   │   ├── components/      # Reusable UI components
│   │   │   ├── home/        # Home page sections
│   │   │   └── layout/      # Header, Footer, Layout
│   │   ├── pages/           # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Webinars.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ...
│   │   ├── config/          # Design tokens and constants
│   │   ├── lib/             # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles + Tailwind
│   ├── public/              # Static assets
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── tsconfig.json        # TypeScript configuration
│
├── server/                  # Optional Node.js backend
│   ├── src/
│   ├── data/                # JSON storage for development
│   ├── package.json
│   └── server.js
│
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zyraacademy.git
   cd zyraacademy
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the app.

4. **Build for production**
   ```bash
   npm run build
   ```
   Optimized files will be in `frontend/dist/`.

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 💻 Development

### Available Scripts

In the `frontend/` directory:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run typecheck` | Run TypeScript type checking |

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript plugins
- **Tailwind**: Utility-first CSS with custom design tokens
- **Components**: Functional components with TypeScript interfaces
- **Formatting**: Consistent spacing and Poppins font family

### Project Guidelines

1. **Component Structure**: Use functional components with hooks
2. **TypeScript**: Always define types and interfaces
3. **Styling**: Use Tailwind utility classes; avoid inline styles
4. **Accessibility**: Include ARIA labels and semantic HTML
5. **Performance**: Lazy load images and code-split routes
6. **Commit Messages**: Use conventional commits (feat, fix, docs, etc.)

---

## 🌐 Deployment

### Static Hosting (Recommended)

The app is a fully static site and can be deployed to:

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages
1. Build the project: `npm run build`
2. Push `dist/` to `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### Other Options
- **Cloudflare Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**

### Build Configuration

- **Output Directory**: `frontend/dist/`
- **Build Command**: `npm run build`
- **Node Version**: 18+
- **Environment Variables**: None required (fully static)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Write clean, maintainable code
- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👥 Team

**Zyra Academy** is built and maintained by a passionate team of young innovators dedicated to empowering youth through technology and design.

### Contact

- **Website**: [zyraacademy.com](https://zyraacademy.com)
- **Email**: contact@zyraacademy.com
- **LinkedIn**: [Zyra Academy](https://linkedin.com/company/zyraacademy)
- **Instagram**: [@zyraacademy](https://instagram.com/zyraacademy)

---

## 🙏 Acknowledgments

- **React Team** – For the amazing UI library
- **Vercel** – For Vite and hosting solutions
- **TailwindCSS** – For the utility-first CSS framework
- **Lucide** – For beautiful open-source icons
- **Unsplash** – For high-quality stock images

---

<div align="center">

**Built with ❤️ by Zyra Academy**

[Website](https://zyraacademy.com) • [LinkedIn](https://linkedin.com/company/zyraacademy) • [Instagram](https://instagram.com/zyraacademy)

</div>

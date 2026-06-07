# 🎬 Netflix Clone - Professional Edition
# React + TypeScript + Vite + Tailwind

> **A Production-Ready Netflix Clone** demonstrating modern full-stack development practices .

[![Live Demo](https://img.shields.io/badge/Live%20Demo-neflix--clone--ts.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://neflix-clone-ts.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/pouyaz05/Neflix-Clone-TS)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🎯 Overview

This is a **fully functional Netflix clone** that replicates Netflix's core features with a focus on performance, scalability, and user experience. The application integrates with the **TMDb API** to serve ۳۰,۰۰۰+ movies and TV shows across ۲۵+ genres.

**Key Achievement:** ⚡ **۹۸% Lighthouse Performance Score** | 🔒 **100% HTTPS Secure** | 📱 **100% Responsive Design**

---

## ✨ Core Features

### 🎥 Movie & TV Show Management
- ✅ **۳۰,۰۰۰+ Titles** from TMDb database
- ✅ **Real-time Search** with instant results
- ✅ **۲۵+ Genre Categories** - Action, Comedy, Drama, Horror, etc.
- ✅ **Movie Details Page** - Rating, Synopsis, Cast, Runtime
- ✅ **Trending Section** - Daily/Weekly/All-time trending

### 🎨 User Interface & UX
- ✅ **Auto-scrolling Carousel** - Hero section with smooth animations
- ✅ **Responsive Design** - Perfect on mobile (375px), tablet (768px), desktop (1920px)
- ✅ **Dark Theme** - Netflix-style dark UI with Tailwind CSS
- ✅ **Smooth Transitions** - Professional animations and micro-interactions
- ✅ **Keyboard Navigation** - Full accessibility support

### 🔧 Advanced Features
- ✅ **Favorites System** - Save movies to local storage (localStorage)
- ✅ **Infinite Scroll** - Load more content as user scrolls
- ✅ **Smart Caching** - Optimized API calls and image caching
- ✅ **Error Handling** - Graceful degradation and error boundaries

---

## 🛠️ Technology Stack

### Frontend Architecture
| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 19.0+ |
| **Language** | TypeScript | 5.5+ |
| **Build Tool** | Vite | 5.0+ |
| **Styling** | Tailwind CSS | 4.0+ |
| **Routing** | Router | 1.45+ |
| **HTTP Client** | Axios | 1.6+ |


### Backend & Deployment
| Service | Purpose | Status |
|---------|---------|--------|
| **Express** | login & sing in & jwt token |  ✅ good
| **TMDb API** | Movie Database | ✅ Live but for iranian with vpn |
| **Vercel** | Hosting  | ✅ Production |
| **Let's Encrypt** | SSL Certificate | ✅ Secure |

### Developer Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git** - Version control
- **GitHub Actions** - CI/CD (optional)


## 🚀 Getting Started

### Prerequisites
```bash
✓ Node.js 18+ (Download: nodejs.org)
✓ npm or yarn package manager
✓ Git installed
✓ TMDb API Key (free at tmdb.org)
```

### Installation (5 minutes)

**1. Clone the Repository**
```bash
git clone https://github.com/pouyaz05/Neflix-Clone-TS
cd Neflix-Clone-TS
```

**2. Install Dependencies**
```bash
npm install
# or
yarn install
```

**3. Setup Environment Variables**
```bash
# Create .env.local file
cat > .env.local << EOF
VITE_TMDB_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3
EOF
```

Get your free API key: [TMDb API](https://www.themoviedb.org/settings/api)

**4. Start Development Server**
```bash
npm run dev
# Open ht

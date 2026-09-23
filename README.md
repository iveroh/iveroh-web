# iveroh-web

Personal portfolio website for Iver Oprand Heggelund, built with React, TypeScript, and Vite.

## Overview

A single-page site with a video hero, an about section, and a projects section that pulls live repository data (stars, language, description) straight from the GitHub REST API.

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)

## Tech Stack

- **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)** - dev server and build tool
- **[Tailwind CSS v4](https://tailwindcss.com/)** - styling via `@tailwindcss/vite`

## Project Structure

```
iveroh-web/
├── index.html
├── public/
│   ├── fonts/           
│   ├── photo/            
│   └── video/            
├── src/
│   ├── App.tsx
│   ├── App.css           
│   ├── main.tsx
│   └── components/
│       ├── NavigationBar.tsx      
│       ├── HeroSection.tsx        
│       ├── CommitActivity.tsx     
│       ├── AboutSection.tsx       
│       ├── ProjectsSection.tsx    
│       └── RepositoryDisplay.tsx  
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- **Node.js 18** or higher
- **npm**

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Fantasy Premier League Team

The fantasy-team section uses a Vercel serverless function to keep FPL requests and the portfolio team ID off the client.

1. Find the numeric ID in your public FPL team URL.
2. In Vercel, add an environment variable named `FPL_ENTRY_ID` with that value for Preview and Production.
3. Deploy the project to Vercel. The browser calls `/api/fpl-team`; Vercel calls the FPL API and caches the response for one minute.

For local API development, install the Vercel CLI and run `vercel dev` after configuring `FPL_ENTRY_ID` in `.env.local`. Do not commit `.env.local`.
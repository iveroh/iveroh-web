"use client";

import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

export default function Home() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
    { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
    { label: 'Portfolio', ariaLabel: 'View my portfolio', link: '#portfolio' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/iveroh' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/iveroh/' },
    { label: 'Instagram', link: 'https://instagram.com/iverheggelund' }
  ];

  return (
    <main className="relative">
      {/* Menu stays fixed and accessible across all sections */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#475569"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={false}
        colors={['#00a8e8', '#0077b6']}
        accentColor="#00a8e8"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
        isFixed={true}
      />

      {/* Page sections */}
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
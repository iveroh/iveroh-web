import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
    { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
    { label: 'Portfolio', ariaLabel: 'View my portfolio', link: '#portfolio' },
    { label: 'Articles', ariaLabel: 'Read more', link: '/articles' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/iveroh' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/iveroh/' },
    { label: 'Instagram', link: 'https://instagram.com/iverheggelund' }
  ];

  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
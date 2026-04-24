import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        isScrolled 
          ? 'bg-obsidian/80 py-4 backdrop-blur-xl border-b border-gold/10' 
          : 'bg-transparent py-8'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3 font-serif text-2xl font-bold tracking-tighter text-paper">
          <Logo size={36} />
          <span className="hidden sm:inline">TECSON<span className="text-gold italic">MEDIA</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-sans font-extrabold uppercase tracking-[0.2em] text-paper/70 transition-all hover:text-gold hover:tracking-[0.3em]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            className="shimmer-hover rounded-full bg-gold px-8 py-3 text-[10px] font-sans font-extrabold uppercase tracking-widest text-obsidian transition-all hover:scale-105"
          >
            Book a Consultation
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-paper">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden bg-obsidian text-paper md:hidden"
      >
        <div className="flex flex-col items-center gap-8 py-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-serif font-bold italic tracking-widest text-paper/80 hover:text-gold"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 rounded-full bg-gold px-10 py-4 text-xs font-sans font-extrabold uppercase tracking-widest text-obsidian"
          >
            Book a Consultation
          </a>
        </div>
      </motion.div>
    </nav>
  );
}

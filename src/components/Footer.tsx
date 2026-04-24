import { Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-obsidian border-t border-gold/10 py-24 px-6 relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 text-left">
          {/* Logo & Vision */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <h3 className="font-serif text-3xl font-bold text-paper font-serif">
                Tecson <span className="text-gold italic font-bold">Media</span>
              </h3>
            </div>
            <p className="mt-8 font-sans text-sm font-medium leading-relaxed text-warm-grey">
              Boutique web design studio based in Toronto. We build digital legacies for businesses that demand excellence and results.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="https://www.youtube.com/@TECSONmedia" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full border border-gold/10 bg-gold/5 text-gold hover:bg-gold hover:text-obsidian transition-all">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold font-sans">Explore</h4>
            <ul className="mt-8 space-y-4 font-sans text-sm font-medium text-warm-grey">
              <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#booking" className="hover:text-gold transition-colors">Consultation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-left">
            <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold font-sans">Contact</h4>
            <ul className="mt-8 space-y-4 font-sans text-sm font-medium text-warm-grey">
              <li className="flex items-center gap-3">
                <Mail className="h-3 w-3 text-gold" />
                <span className="font-bold">perseus@tecsonmedia.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-3 w-3 text-gold" />
                <span className="font-bold">647-491-1624</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-3 w-3 text-gold" />
                <span className="font-bold">Toronto, Ontario</span>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div className="text-left">
            <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold font-sans">New Accounts</h4>
            <button 
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold hover:text-paper transition-all"
            >
              Back to Top <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between border-t border-gold/5 pt-10 md:flex-row text-center">
          <p className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-warm-grey/30">
            © 2026 Tecson Media. All rights reserved.
          </p>
          <div className="mt-4 flex gap-8 md:mt-0">
            <a href="#" className="text-[10px] font-sans font-bold uppercase tracking-widest text-warm-grey/30 hover:text-gold">Privacy Policy</a>
            <a href="#" className="text-[10px] font-sans font-bold uppercase tracking-widest text-warm-grey/30 hover:text-gold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

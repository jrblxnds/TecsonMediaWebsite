import { motion } from 'motion/react';
import { ArrowRight, Code, Laptop, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-obsidian noise-overlay">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600" 
          alt="Luxury Aesthetic" 
          className="h-full w-full object-cover brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/80 to-obsidian" />
        
        {/* Soft Gold Radial Glows */}
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8 flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-6 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-gold"
          >
            <Sparkles className="h-3 w-3" />
            <span>Excellence in Digital Craft</span>
          </motion.div>
          
          <h1 className="max-w-5xl font-serif text-5xl font-bold leading-[1.1] tracking-tight text-paper md:text-7xl lg:text-8xl">
            We Design Websites That <br className="hidden md:block" />
            <span className="italic text-gold">Elevate Your Brand</span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg font-medium leading-relaxed text-warm-grey md:text-xl">
            Toronto's premier web design studio — crafting digital experiences that convert visitors into clients.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-hover flex items-center gap-3 rounded-full bg-gold px-10 py-5 text-[10px] font-sans font-extrabold uppercase tracking-widest text-obsidian shadow-2xl shadow-gold/20"
            >
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 rounded-full border border-gold/30 bg-transparent px-10 py-5 text-[10px] font-sans font-bold uppercase tracking-widest text-gold transition-all"
            >
              View Our Work
            </motion.a>
          </div>

          {/* Feature Highlights with Geometric Accents */}
          <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {[
              { icon: <Code className="h-5 w-5" />, text: "Custom Architecture" },
              { icon: <Laptop className="h-5 w-5" />, text: "Responsive Design" },
              { icon: <Sparkles className="h-5 w-5" />, text: "Premium Aesthetic" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-4 text-warm-grey/40"
              >
                <div className="h-px w-8 bg-gold/20" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em]">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Geometric Fine Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    </section>
  );
}

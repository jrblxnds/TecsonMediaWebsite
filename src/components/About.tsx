import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="bg-charcoal py-32 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-gold/5 blur-[100px]" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] border border-gold/10 bg-obsidian">
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800" 
                alt="Studio" 
                className="h-full w-full object-cover grayscale opacity-60"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden md:block rounded-3xl border border-gold/20 bg-charcoal p-8 shadow-2xl">
              <p className="font-serif text-4xl font-bold text-gold italic text-left">Toronto's Own</p>
              <p className="mt-2 text-[10px] font-sans font-extrabold uppercase tracking-[0.3em] text-paper/40 italic">Established 2026</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl text-paper">
              About <span className="italic text-gold italic">Tecson Media</span>
            </h2>
            <div className="mt-12 space-y-8 text-left">
              <p className="text-xl font-sans font-medium leading-relaxed text-warm-grey italic">
                "We believe your website should be your most powerful employee."
              </p>
              <div className="space-y-6 text-paper/60 font-sans font-medium leading-relaxed">
                <p>
                  Tecson Media is a Toronto-based web design studio dedicated to building premium digital experiences for businesses of all sizes. We combine strategy, design, and development into every project — because your website should do more than look good. It should grow your business.
                </p>
                <p className="border-l-2 border-gold/40 pl-6 italic text-paper/80 bg-gold/5 py-4">
                  "We believe exceptional web design shouldn't come with an exceptional price tag. Our studio delivers agency-quality results at a fraction of the cost — without ever compromising on craft."
                </p>
                <p>
                  Founded on a commitment to luxury aesthetics and boutique service, we move away from templates to embrace a future where every brand has a bespoke digital home that reflects its true value.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12 text-left">
              <div>
                <p className="font-serif text-5xl font-bold text-gold italic">100%</p>
                <p className="mt-2 text-[10px] font-sans font-extrabold uppercase tracking-[0.2em] text-warm-grey">Custom Solutions</p>
              </div>
              <div>
                <p className="font-serif text-5xl font-bold text-gold italic">24/7</p>
                <p className="mt-2 text-[10px] font-sans font-extrabold uppercase tracking-[0.2em] text-warm-grey">Dedicated Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

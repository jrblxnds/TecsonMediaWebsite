import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Director @ Aura Luxury",
    content: "Tecson Media transformed our digital presence. The new site is not only beautiful but our conversion rate increased by 40% in the first month.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Founder of Nexus VC",
    content: "Speed, professionalism, and an incredible eye for detail. They understood our brand immediately and delivered beyond our expectations.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Owner of Elysian Interiors",
    content: "The best investment we've made this year. Our portfolio finally looks as premium as the homes we design.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-obsidian py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl text-paper">
            What Our <span className="italic text-gold italic">Clients Say</span>
          </h2>
          
          <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col rounded-[2.5rem] border border-gold/10 bg-charcoal p-12 transition-all hover:border-gold/30"
              >
                <Quote className="absolute top-10 right-10 h-10 w-10 text-gold/20" />
                
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-gold/40 stroke-[1.5]" />
                  ))}
                </div>

                <div className="mt-12 mb-12 flex-1 flex flex-col items-center justify-center border-y border-gold/5 py-12">
                  <p className="font-serif text-xl font-bold italic text-warm-grey">
                    "Coming Soon"
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="h-px w-20 bg-warm-grey/20" />
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-warm-grey/40">Client Name</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

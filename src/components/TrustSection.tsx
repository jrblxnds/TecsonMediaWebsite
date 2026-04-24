import { motion } from 'motion/react';
import { CheckCircle2, Lightbulb, Clock, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: <Lightbulb className="h-8 w-8 text-gold" />,
    title: "100% Custom Design",
    description: "No generic templates or cookie-cutter builders. We architect every pixel from the ground up to match your brand's specific DNA."
  },
  {
    icon: <Clock className="h-8 w-8 text-gold" />,
    title: "Fast Turnaround",
    description: "Efficiency without compromise. Most of our high-end digital assets are delivered in 1–2 weeks from initial whiteboarding."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-gold" />,
    title: "Results-Driven",
    description: "A website is an investment. We focus on conversion architecture and SEO foundations that turn idle traffic into active revenue."
  }
];

export default function TrustSection() {
  return (
    <section id="why-us" className="bg-charcoal py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl text-paper">
              Why <span className="italic text-gold">Tecson Media?</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg font-sans font-medium leading-relaxed text-warm-grey">
              We don't just build websites. We build digital legacies that stand the test of time and competition.
            </p>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0 }} // Simplified whileInView to handle opacity/y
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] border border-gold/10 bg-obsidian p-12 transition-all hover:border-gold/30"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/5 border border-gold/10 group-hover:scale-110 group-hover:bg-gold/10 transition-all">
                {reason.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-paper">{reason.title}</h3>
              <p className="mt-6 font-sans text-sm font-medium leading-relaxed text-warm-grey">
                {reason.description}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-gold" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold/40 transition-colors group-hover:text-gold">Verified Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="mx-auto max-w-4xl font-serif text-xl font-bold italic text-gold leading-relaxed">
            "We believe exceptional web design shouldn't come with an exceptional price tag. Our studio delivers agency-quality results at a fraction of the cost — without ever compromising on craft."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

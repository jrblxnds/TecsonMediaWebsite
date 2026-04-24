import { motion } from 'motion/react';
import { Layout, ShoppingCart, Target, RefreshCw, Layers, ShieldCheck, Zap } from 'lucide-react';

const services = [
  {
    icon: <Layout className="h-8 w-8" />,
    title: "Custom Web Design",
    description: "Bespoke digital experiences built from scratch. No templates, just pure strategy-led design that reflects your brand's unique prestige.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "E-Commerce Solutions",
    description: "High-conversion online stores built for performance. We streamline the path to purchase while maintaining a luxury visual standard.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Landing Page Design",
    description: "Precision-engineered pages designed for one thing: results. Perfect for high-stakes marketing campaigns and product launches.",
  },
  {
    icon: <RefreshCw className="h-8 w-8" />,
    title: "Website Optimization",
    description: "Transform your existing site into a powerful asset. We audit your current presence and rebuild it for modern efficiency.",
  }
];

const benefits = [
  { icon: <Layers className="h-5 w-5" />, title: "100% Custom", desc: "No generic templates or cookie-cutter layouts." },
  { icon: <Zap className="h-5 w-5" />, title: "Rapid Delivery", desc: "Most projects delivered in 1-2 weeks." },
  { icon: <ShieldCheck className="h-5 w-5" />, title: "Built to Last", desc: "Clean code and future-proof technologies." }
];

export default function Services() {
  return (
    <section id="services" className="bg-charcoal py-32 px-6 text-paper overflow-hidden relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
              Custom <br />
              <span className="italic text-gold italic">Web Design</span>
            </h2>
            <div className="mt-12 h-px w-24 bg-gold" />
            <p className="mt-8 text-xl font-sans font-medium leading-relaxed text-warm-grey">
              Every website we build is completely custom — designed and developed around your brand, your goals, and your vision. No templates, no cookie-cutter layouts. Pricing and scope vary by project, so every client gets exactly what they need and nothing they don't. Get in touch to discuss what we can build for you.
            </p>

            <ul className="mt-12 space-y-6">
              {[
                "Fully tailored to your brand and business goals",
                "Flexible scope — we adjust to fit your budget and vision",
                "One-on-one collaboration from concept to launch"
              ].map((point, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-paper font-sans font-bold"
                >
                  <span className="text-gold text-xl">✦</span>
                  <span className="tracking-wide">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="aspect-square rounded-[3rem] border border-gold/10 bg-obsidian p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full h-full opacity-20">
                <div className="rounded-2xl border border-gold/40" />
                <div className="rounded-2xl bg-gold/10" />
                <div className="rounded-2xl bg-gold/10" />
                <div className="rounded-2xl border border-gold/40" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Layout className="h-32 w-32 text-gold opacity-40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

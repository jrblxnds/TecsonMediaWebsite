import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ExternalLink, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const categories = ['All', 'Commercial', 'Creative', 'Professional', 'E-Commerce'];

const projects = [
  {
    id: '1',
    title: 'Pipe Pros Plumbing',
    category: 'Commercial',
    imageUrl: 'https://i.postimg.cc/7JNyZcr9/pipepros.png',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1NuAtdkYlLG-Fcla_xCux9Fl1erspD9Yx',
    description: 'High-conversion landing page for GTA’s premier plumbing service. Engineered for lead generation with localized SEO optimization.'
  },
  {
    id: '2',
    title: 'JRBLXNDS Brand',
    category: 'Creative',
    imageUrl: 'https://i.postimg.cc/5QmM2GWK/jrblxnds.png', 
    videoUrl: 'https://drive.google.com/uc?export=download&id=18WNZNHGXN3hiuUlOxRdtycxH-HayNXMe', 
    projectUrl: 'https://jrblxndzzz.netlify.app',
    description: 'A bold digital destination for a luxury barber brand. Precision-focused UI designed to mirror the refined craft of grooming.'
  },
  {
    id: '3',
    title: 'Perri Pools & Landscaping',
    category: 'Professional',
    imageUrl: 'https://i.postimg.cc/p5BtL7M6/perripools.png',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1LHywr52Z0f65L3CaR8Fq7E1CgLB8Y65d',
    description: 'Immersive outdoor living showcase. Features elegant galleries and a seamless quote request system for high-end landscaping.'
  },
  {
    id: '4',
    title: 'Tecson Media',
    category: 'Professional',
    imageUrl: 'https://i.postimg.cc/TpZZXfbr/tecson-media.png',
    projectUrl: 'https://tecsonmedia.com',
    description: 'Our digital headquarters. A masterclass in luxury branding and modern web architecture designed for the premium market.'
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="bg-obsidian py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl text-paper">
            Our <span className="italic text-gold italic">Work</span>
          </h2>
          <p className="mt-8 max-w-2xl font-sans text-lg font-medium leading-relaxed text-warm-grey">
            A selection of our most recent digital masterpieces. Each project is a unique collaboration focused on functional excellence.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-8 py-3 text-[10px] font-sans font-extrabold uppercase tracking-widest transition-all",
                activeCategory === cat 
                  ? 'bg-gold text-obsidian' 
                  : 'border border-gold/20 text-gold hover:bg-gold/5'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative h-[500px] overflow-hidden rounded-[2rem] bg-charcoal shadow-2xl"
              >
                {/* Background State: Image or Video */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className={cn(
                      "h-full w-full object-cover transition-all duration-700",
                      hoveredId === project.id ? "scale-110 opacity-0" : "opacity-100"
                    )}
                    referrerPolicy="no-referrer"
                  />
                  
                  {project.videoUrl && (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={cn(
                        "h-full w-full object-cover transition-opacity duration-700",
                        hoveredId === project.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  )}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 z-10 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent p-12 transition-all duration-500 group-hover:top-0 group-hover:flex group-hover:flex-col group-hover:justify-center group-hover:bg-obsidian/90">
                  <div className="transform transition-transform duration-500 group-hover:translate-y-0 text-left">
                    <span className="text-[10px] font-sans font-extrabold uppercase tracking-[0.3em] text-gold">{project.category}</span>
                    <h3 className="mt-4 font-serif text-3xl font-bold text-paper md:text-4xl">{project.title}</h3>
                    <p className="mt-6 font-sans text-sm font-medium leading-relaxed text-warm-grey opacity-0 transition-opacity duration-500 group-hover:opacity-100 italic">
                      {project.description}
                    </p>
                    
                    {project.projectUrl && (
                      <div className="mt-8 flex gap-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[10px] font-sans font-extrabold uppercase tracking-widest text-obsidian hover:bg-paper transition-colors"
                        >
                          View Website <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Minimal Accent */}
                <div className="absolute top-8 right-8 h-12 w-12 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold transition-all duration-500 group-hover:scale-125 group-hover:rotate-90">
                  <Plus className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <p className="font-serif text-2xl font-bold italic text-warm-grey/40">
            More projects being unveiled soon.
          </p>
        </div>
      </div>
    </section>
  );
}

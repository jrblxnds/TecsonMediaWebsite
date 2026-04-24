import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, Calendar, Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '@/src/lib/firebase';

interface DropdownProps {
  label: string;
  options: { label: string; value: string; isMostPopular?: boolean }[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

function CustomDropdown({ options, value, onChange, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-2xl border bg-obsidian py-4 px-6 font-sans text-sm text-paper transition-all",
          isOpen ? "border-gold/50 shadow-lg shadow-gold/5" : "border-gold/10 hover:border-gold/30"
        )}
      >
        <div className="flex items-center gap-3">
          <span className={cn(selectedOption.isMostPopular && "text-gold font-bold")}>
            {selectedOption.label}
          </span>
          {selectedOption.isMostPopular && (
            <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter text-gold border border-gold/20">
              Most Popular
            </span>
          )}
        </div>
        <ChevronDown className={cn("h-4 w-4 text-gold transition-transform duration-300", isOpen && "rotate-180")} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gold/20 bg-charcoal shadow-2xl backdrop-blur-xl"
          >
            <div className="max-h-64 overflow-y-auto py-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-6 py-4 font-sans text-sm transition-all hover:bg-gold hover:text-obsidian group",
                    option.value === value && "bg-gold/5 text-gold",
                    option.isMostPopular && "border-l-2 border-gold"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "font-medium",
                      option.isMostPopular && "text-gold group-hover:text-obsidian"
                    )}>
                      {option.label}
                    </span>
                    {option.isMostPopular && (
                      <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter text-gold border border-gold/20 group-hover:bg-obsidian group-hover:text-gold group-hover:border-obsidian/20">
                        Most Popular
                      </span>
                    )}
                  </div>
                  {option.value === value && <Check className="h-4 w-4 text-gold group-hover:text-obsidian" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    websiteType: 'Business Site',
    budget: 'Professional — $400 – $749',
    description: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const websiteOptions = [
    { label: 'Business Site', value: 'Business Site' },
    { label: 'E-Commerce', value: 'E-Commerce' },
    { label: 'Landing Page', value: 'Landing Page' },
    { label: 'Redesign', value: 'Redesign' },
    { label: 'Other', value: 'Other' },
  ];

  const budgetOptions = [
    { label: 'Starter — $249 – $399', value: 'Starter — $249 – $399' },
    { label: 'Professional — $400 – $749', value: 'Professional — $400 – $749', isMostPopular: true },
    { label: 'Premium — $750+', value: 'Premium — $750+' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', websiteType: 'Business Site', budget: 'Professional — $400 – $749', description: '' });
    } catch (err) {
      console.error('Booking error:', err);
      setStatus('error');
      // Using handleFirestoreError would throw and potentially be caught by a global handler or just log here
      // For now, we'll just set the error status to show the user
    }
  };

  return (
    <section id="booking" className="bg-obsidian py-32 px-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 h-full w-full gold-glow opacity-30 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 text-left">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl text-paper">
              Let's Build <br />
              <span className="italic text-gold italic">Something Great</span>
            </h2>
            <p className="mt-8 text-xl font-sans font-medium leading-relaxed text-warm-grey">
              Ready to elevate your digital presence? Book a consultation to discuss your project.
            </p>

            <div className="mt-12 space-y-8">
              <a href="https://calendly.com/tecsonmedia" target="_blank" className="flex items-center gap-6 group" rel="noreferrer">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 group-hover:bg-gold/10 transition-all">
                  <Calendar className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold text-left">Book a Consultation</h4>
                  <p className="text-paper font-bold hover:text-gold transition-colors">calendly.com/tecsonmedia</p>
                </div>
              </a>
              <div className="flex items-center gap-6 text-left">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold text-left">Direct Email</h4>
                  <p className="text-paper font-bold underline underline-offset-4">perseus@tecsonmedia.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] border border-gold/10 bg-charcoal p-12 shadow-2xl"
          >
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-20">
                <div className="mb-8 rounded-full bg-gold/20 p-6 text-gold border border-gold/20">
                  <Send className="h-10 w-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-paper font-serif">Message Sent Successfully</h3>
                <p className="mt-4 font-sans text-warm-grey">I'll personally review your project and get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[10px] font-sans font-bold uppercase tracking-widest text-gold hover:text-paper"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-gold/10 bg-obsidian py-4 px-6 font-sans text-sm text-paper focus:border-gold/50 focus:outline-none transition-all placeholder:text-warm-grey/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-gold/10 bg-obsidian py-4 px-6 font-sans text-sm text-paper focus:border-gold/50 focus:outline-none transition-all placeholder:text-warm-grey/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <CustomDropdown 
                    label="Website Type"
                    name="websiteType"
                    value={formData.websiteType}
                    options={websiteOptions}
                    onChange={(val) => handleDropdownChange('websiteType', val)}
                  />
                  <CustomDropdown 
                    label="Estimated Budget"
                    name="budget"
                    value={formData.budget}
                    options={budgetOptions}
                    onChange={(val) => handleDropdownChange('budget', val)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">Brief Project Description</label>
                  <textarea 
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your brand vision..."
                    className="h-32 w-full rounded-2xl border border-gold/10 bg-obsidian py-4 px-6 font-sans text-sm text-paper focus:border-gold/50 focus:outline-none transition-all resize-none placeholder:text-warm-grey/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="shimmer-hover w-full rounded-full bg-gold py-5 text-[10px] font-sans font-extrabold uppercase tracking-widest text-obsidian disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Processing...' : 'Book a Consultation'}
                </button>
                {status === 'error' && (
                  <p className="mt-4 text-center text-xs font-sans font-bold text-red-500">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

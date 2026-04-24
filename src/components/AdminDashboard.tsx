import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { db, auth } from '@/src/lib/firebase';
import { 
  CheckCircle2, 
  Trash2, 
  FolderCheck, 
  Clock, 
  Shield, 
  LogOut, 
  Search,
  Filter,
  ArrowLeft,
  Mail,
  User as UserIcon,
  Globe,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ADMIN_EMAIL = 'perseus@tecsonmedia.com';

interface Booking {
  id: string;
  name: string;
  email: string;
  websiteType: string;
  budget: string;
  description: string;
  status: 'pending' | 'confirmed' | 'organized';
  createdAt: any;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'organized'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(data);
    });

    return () => unsubscribe();
  }, [user]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => signOut(auth);

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === 'all' || b.status === activeTab;
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian text-gold">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian px-6 text-center">
        <div className="mb-8 rounded-full bg-gold/10 p-6">
          <Shield className="h-16 w-16 text-gold" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-paper">Admin Access Restricted</h1>
        <p className="mt-4 max-w-sm font-sans text-warm-grey">
          This portal is reserved for Tecson Media administration. Please sign in with the authorized account.
        </p>
        {!user ? (
          <button 
            onClick={login}
            className="mt-10 rounded-full bg-gold px-10 py-4 font-sans text-sm font-bold uppercase tracking-widest text-obsidian transition-all hover:scale-105 active:scale-95"
          >
            Authorize Access
          </button>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm font-bold text-red-500">
              Account {user.email} is not authorized.
            </p>
            <button 
              onClick={logout}
              className="text-xs font-bold uppercase tracking-widest text-warm-grey hover:text-gold"
            >
              Sign Out & Try Another
            </button>
          </div>
        )}
        <button 
          onClick={() => window.location.hash = ''}
          className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-warm-grey/50 hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Site
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-obsidian text-paper overflow-hidden">
      {/* Header */}
      <header className="flex h-20 items-center justify-between border-b border-gold/10 bg-charcoal px-8">
        <div className="flex items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold border border-gold/20">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold/40">Tecson Media Control Center</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-paper">{user.displayName || 'Admin'}</p>
            <p className="text-[10px] text-warm-grey font-medium">{user.email}</p>
          </div>
          <button 
            onClick={logout}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/10 bg-gold/5 text-warm-grey transition-all hover:bg-gold/10 hover:text-gold"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar / Filters */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gold/10 bg-obsidian p-6 overflow-y-auto">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold/40">Navigation</h4>
              <nav className="mt-4 flex flex-col gap-2">
                {[
                  { id: 'all', label: 'All Inquiries', icon: FolderCheck },
                  { id: 'pending', label: 'Pending', icon: Clock },
                  { id: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
                  { id: 'organized', label: 'Organized', icon: Filter }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all",
                      activeTab === tab.id 
                        ? "bg-gold text-obsidian" 
                        : "text-warm-grey hover:bg-gold/5 hover:text-gold"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </div>
                    <span className={cn(
                      "rounded-md px-1.5 py-0.5 text-[8px]",
                      activeTab === tab.id ? "bg-obsidian/10" : "bg-gold/10"
                    )}>
                      {bookings.filter(b => tab.id === 'all' || b.status === tab.id).length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-gold/40">Search</h4>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-warm-grey" />
                <input 
                  type="text"
                  placeholder="Inquiry or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gold/10 bg-charcoal py-3 pl-9 pr-4 text-xs text-paper focus:border-gold/50 focus:outline-none transition-all placeholder:text-warm-grey/20"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gold/10 bg-gold/5 p-4 md:mt-auto">
              <div className="flex items-center gap-3 text-gold">
                <AlertCircle className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">System Status</span>
              </div>
              <p className="mt-2 text-[10px] text-warm-grey/60 italic">All systems operational in Toronto HQ.</p>
            </div>
          </div>
        </aside>

        {/* Bookings List */}
        <section className="flex-1 overflow-y-auto bg-charcoal/50 p-8 pt-6 custom-scrollbar">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold">
              {activeTab === 'all' ? 'All Bookings' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Channel`}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative flex flex-col rounded-3xl border border-gold/5 bg-obsidian p-8 transition-all hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/5 border border-gold/10 text-gold">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold">{booking.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-warm-grey">
                            <Mail className="h-3 w-3" /> {booking.email}
                          </div>
                        </div>
                      </div>
                      <div className={cn(
                        "rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest border",
                        booking.status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                        booking.status === 'confirmed' && "bg-green-500/10 text-green-500 border-green-500/20",
                        booking.status === 'organized' && "bg-gold/10 text-gold border-gold/20"
                      )}>
                        {booking.status}
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-gold/60">
                          <Globe className="h-3 w-3" /> Project Type
                        </div>
                        <p className="text-sm font-medium">{booking.websiteType}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-gold/60">
                          <DollarSign className="h-3 w-3" /> Budget Range
                        </div>
                        <p className="text-sm font-medium">{booking.budget}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-gold/60 mb-2">
                        Project Brief
                      </div>
                      <div className="rounded-xl border border-gold/5 bg-charcoal/50 p-4">
                        <p className="text-xs italic leading-relaxed text-warm-grey line-clamp-3 group-hover:line-clamp-none transition-all">
                          "{booking.description}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-gold/5 pt-6">
                      <div className="flex items-center gap-4">
                        {booking.status === 'pending' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-green-500 transition-all hover:bg-green-500 hover:text-white"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Confirm
                          </button>
                        )}
                        {booking.status !== 'organized' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'organized')}
                            className="flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold hover:text-obsidian"
                          >
                            <FolderCheck className="h-3 w-3" /> Organize
                          </button>
                        )}
                        {booking.status === 'organized' && (
                          <button 
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="flex items-center gap-2 rounded-xl bg-paper/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-warm-grey transition-all hover:bg-paper/10 hover:text-paper"
                          >
                            Move to Confirmed
                          </button>
                        )}
                      </div>
                      <button 
                        onClick={() => deleteBooking(booking.id)}
                        className="rounded-xl border border-red-500/10 bg-red-500/5 p-2 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="rounded-full bg-gold/5 p-8 text-gold/20">
                    <FolderCheck className="h-16 w-16" />
                  </div>
                  <h3 className="mt-8 font-serif text-2xl font-bold text-warm-grey">No inquiries found</h3>
                  <p className="mt-2 text-sm text-warm-grey/60">Try adjusting your filters or search terms.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

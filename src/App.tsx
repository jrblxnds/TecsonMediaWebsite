/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [isAdminPortal, setIsAdminPortal] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminPortal(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminPortal) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen selection:bg-gold selection:text-dark">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Portfolio />
        <Services />
        <About />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}



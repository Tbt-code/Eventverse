"use client";

import { Search, SlidersHorizontal, Bell, Menu, X, ArrowRight, Shield, Users, Heart, Sparkles, Globe } from "lucide-react";
import { Event } from "../types";
import { EventCard } from "./EventCard";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DiscoverScreenProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export function DiscoverScreen({ events, onEventClick }: DiscoverScreenProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const headerBackgroundOpacity = useTransform(scrollY, [0, 50], [0, 0.9]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 12]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=500&fit=crop", // Friends at concert
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=500&fit=crop", // Group gathering
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=500&fit=crop"  // Candid moment
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-gray-900 selection:bg-rose-100">
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${headerBackgroundOpacity})`,
          backdropFilter: `blur(${headerBlur}px)`
        }}
      >
        <div className="w-full mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 bg-gradient-to-tr from-rose-400 to-orange-300 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              E
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Eventverse</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-gray-900 transition-colors">Discover</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Create Event</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Community</a>
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log In
            </a>
            <a 
              href="/signup"
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-x-0 top-0 pt-24 pb-8 bg-white shadow-xl md:hidden px-6 flex flex-col gap-6"
            >
              <a href="#" className="text-lg font-medium text-gray-900">Discover</a>
              <a href="#" className="text-lg font-medium text-gray-900">Create Event</a>
              <a href="#" className="text-lg font-medium text-gray-900">Community</a>
              <a href="#" className="text-lg font-medium text-gray-900">About</a>
              <div className="h-px bg-gray-100 my-2" />
              <a 
                href="/login"
                className="block w-full py-3 text-center font-medium text-gray-600 bg-gray-50 rounded-xl"
              >
                Log In
              </a>
              <a 
                href="/signup"
                className="block w-full py-3 text-center font-medium text-white bg-gray-900 rounded-xl"
              >
                Sign Up
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:pt-40 md:pb-24 overflow-hidden">
        <div className="w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                Events feel better when they’re <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">shared.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Eventverse helps you discover events through people you trust and relive moments together — before and after the event.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-400 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Join Eventverse <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2">
                  Explore events
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-400 font-medium">Free. No ads. Community first.</p>
            </motion.div>
          </div>

          {/* Hero Visuals */}
          <div className="relative h-[500px] hidden lg:block">
            {heroImages.map((src, index) => (
              <motion.div
                key={index}
                className="absolute rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                style={{
                  width: 260,
                  height: 340,
                  left: index * 140,
                  top: index % 2 === 0 ? 0 : 80,
                  zIndex: 3 - index,
                }}
                initial={{ opacity: 0, y: 100, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -15, 0],
                  rotate: index % 2 === 0 ? -6 : 6 
                }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 },
                  opacity: { duration: 0.8, delay: 0.2 + index * 0.2 }
                }}
              >
                <img src={src} alt="Community moment" className="w-full h-full object-cover" />
              </motion.div>
            ))}
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute bottom-20 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">+42 friends</span>
              </div>
              <p className="text-xs text-gray-600">"Going to the Jazz Night!"</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="w-full mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "People over promotion", desc: "Discover events your friends are actually going to, not just what's boosted." },
              { icon: Sparkles, title: "Moments over tickets", desc: "Share photos and memories before, during, and after the event." },
              { icon: Shield, title: "Community over ads", desc: "A safe space designed for connection, free from spam and noise." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Events Feed */}
      <section className="py-20 px-4 w-full mx-auto">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-24 space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Discover</h3>
              <div className="space-y-1">
                {['For You', 'Popular', 'Newest', 'Nearby'].map((item, i) => (
                  <button key={item} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-rose-50 text-rose-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories List */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Categories</h3>
              <div className="space-y-1">
                {['Music', 'Tech', 'Art & Culture', 'Food & Drink', 'Wellness', 'Workshops'].map(item => (
                  <button key={item} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trending Near You</h2>
                <p className="text-gray-600">Join people discovering events through friends, not algorithms.</p>
              </div>
              
              {/* Mobile Search/Filter (Hidden on Desktop) */}
              <div className="flex gap-3 lg:hidden">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-100"
                    />
                 </div>
                 <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600">
                    <SlidersHorizontal className="w-4 h-4" />
                 </button>
              </div>
            </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onEventClick(event.id)}
          />
        ))}
      </motion.div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors">
            View all events
          </button>
        </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
             <span className="font-bold text-lg">Eventverse</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Community Guidelines</a>
            <a href="#" className="hover:text-gray-900">Privacy & Ethics</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
          <p className="text-sm text-gray-400">Built for real people. Designed to be safe.</p>
        </div>
      </footer>
    </div>
  );
}

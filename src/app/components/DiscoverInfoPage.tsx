"use client";

import { ArrowRight } from "lucide-react";
import { Section, HeroTitle } from "./Section";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function DiscoverInfoPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-gray-900">
      {/* Hero */}
      <Section className="pt-32 md:pt-48 text-center pb-12">
        <HeroTitle>
          Find your people. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
            Find your fun.
          </span>
        </HeroTitle>
        <p className="text-2xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-12 font-light">
          No algorithms. Just friends, trust, and the moments that matter.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all">
          Start Exploring <ArrowRight className="w-4 h-4" />
        </Link>
      </Section>

      {/* Feature 1 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-sm"
          >
            <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80" alt="Live concert moment" className="object-cover w-full h-full" />
          </motion.div>
          <div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Local gems, not ads.</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              Discover the pulse of your city without the noise. From intimate gallery openings to neighborhood block parties.
            </p>
          </div>
        </div>
      </Section>

      {/* Feature 2 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Powered by friends.</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              See where your circle is heading. Never miss a chance to reconnect.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-sm order-1 md:order-2"
          >
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80" alt="Friends gathering" className="object-cover w-full h-full" />
          </motion.div>
        </div>
      </Section>

      {/* Feature 3 */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-sm"
          >
            <img src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" alt="Exclusive event atmosphere" className="object-cover w-full h-full" />
          </motion.div>
          <div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Public & Private.</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              From open festivals to secret supper clubs. You decide who gets in.
            </p>
          </div>
        </div>
      </Section>

      <Section className="text-center pb-32">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">Ready to head out?</h2>
        <Link to="/" className="text-rose-500 font-semibold hover:text-rose-600 text-lg">
          Browse events near you &rarr;
        </Link>
      </Section>
    </div>
  );
}
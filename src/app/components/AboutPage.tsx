"use client";

import { Section, HeroTitle } from "./Section";
import { motion } from "framer-motion";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-gray-900">
      <Section className="pt-32 md:pt-48 pb-12">
        <HeroTitle>
          Social media, <br />
          reimagined.
        </HeroTitle>
        <p className="text-2xl text-gray-500 max-w-xl leading-relaxed mt-8 font-light">
          Tired of scrolling? So were we. It's time to look up, go out, and meet the world.
        </p>
      </Section>

      <Section className="!py-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[500px] rounded-3xl overflow-hidden shadow-sm"
        >
          <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&q=80" alt="Real connection moment" className="w-full h-full object-cover" />
        </motion.div>
      </Section>

      <Section>
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">The disconnect.</h3>
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                Platforms optimize for watch time, not life time. We found ourselves connected, yet increasingly lonely.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">The bridge.</h3>
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                Technology should be a bridge, not a destination. We measure success by the memories you create offline.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="bg-gray-100 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-8 tracking-tight">The future is in-person.</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-10 font-light">
            Every neighborhood vibrant. Every person connected. Finding your tribe should be natural.
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
            <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white"></div>
            <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
          </div>
          <p className="text-sm text-gray-400 mt-4 font-medium tracking-wide uppercase">The Eventverse Team</p>
        </div>
      </Section>

      <Section className="text-center pb-32">
        <h2 className="text-3xl font-bold mb-6 tracking-tight">Join the movement.</h2>
        <p className="text-gray-600 mb-8">We're just getting started.</p>
        <a href="mailto:hello@eventverse.com" className="text-rose-500 font-semibold hover:underline">
          Get in touch
        </a>
      </Section>
    </div>
  );
}
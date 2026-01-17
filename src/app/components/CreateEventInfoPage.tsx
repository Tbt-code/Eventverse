"use client";

import { Sparkles, ShieldCheck, CalendarHeart, ArrowRight } from "lucide-react";
import { Section, HeroTitle } from "./Section";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function CreateEventInfoPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-gray-900">
      <Section className="pt-32 md:pt-48 text-center pb-12">
        <HeroTitle>
          Hosting made <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            human.
          </span>
        </HeroTitle>
        <p className="text-2xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-12 font-light">
          Gathering shouldn't be hard. Simple tools for meaningful moments.
        </p>
        <Link to="/create" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all">
          Create an Event <ArrowRight className="w-4 h-4" />
        </Link>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "Minutes, not hours",
              desc: "Launch your page instantly. No complex forms, just the essentials."
            },
            {
              icon: CalendarHeart,
              title: "6 or 600",
              desc: "From dinner parties to conferences. We scale with your ambition."
            },
            {
              icon: ShieldCheck,
              title: "Your rules",
              desc: "Public, private, or invite-only. You control the guest list."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-900">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 items-center">
          <div className="p-12 md:p-16 text-left text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Anyone can host.</h2>
            <p className="text-gray-300 text-xl leading-relaxed mb-8 font-light">
              You don't need a venue. You just need an idea.
            </p>
            <Link to="/create" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Start Hosting
            </Link>
          </div>
          <motion.div 
            className="h-[400px] md:h-[500px] relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" alt="Dinner party hosting" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
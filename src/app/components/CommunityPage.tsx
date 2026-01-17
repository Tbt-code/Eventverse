"use client";

import { Heart, Shield, UserCheck } from "lucide-react";
import { Section, HeroTitle } from "./Section";
import { motion } from "framer-motion";

export function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-gray-900">
      <Section className="pt-32 md:pt-48 text-center pb-12">
        <HeroTitle>
          Built on <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
            trust & respect.
          </span>
        </HeroTitle>
        <p className="text-2xl text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
          Real people. Real experiences. Safety and kindness above all else.
        </p>
      </Section>

      <Section className="!py-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] rounded-3xl overflow-hidden shadow-sm"
        >
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80" alt="Diverse community group" className="w-full h-full object-cover" />
        </motion.div>
      </Section>

      <Section>
        <div className="space-y-24">
          {/* Value 1 */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 text-green-600">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Real identities.</h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-light">
                Accountability starts with identity. Our verification ensures hosts and guests are who they say they are.
              </p>
            </div>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 text-blue-600">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Safety first.</h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-light">
                Private locations revealed only to guests. 24/7 support. Safety is built into our core.
              </p>
            </div>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0 text-rose-600">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Zero tolerance.</h2>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-light">
                No harassment. No hate. A strictly enforced standard for a welcoming space.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="text-center pb-32">
        <p className="text-gray-400 text-sm">Read our full Community Guidelines &rarr;</p>
      </Section>
    </div>
  );
}
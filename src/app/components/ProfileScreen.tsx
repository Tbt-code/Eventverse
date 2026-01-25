import { useState } from "react";
import { BadgeCheck, Calendar, Users, Award, Settings, Heart, Image as ImageIcon, Sparkles, Shield, Eye, Map as MapIcon, X, Palette } from "lucide-react";
import { User } from "../types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { AvatarDesigner } from "./AvatarDesigner";

interface ProfileScreenProps {
  user: User;
}

export function ProfileScreen({ user }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'events' | 'moments'>('events');
  const [showSettings, setShowSettings] = useState(false);
  const [showAvatarDesigner, setShowAvatarDesigner] = useState(false);

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const photoVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  const trustBadges = [
    { label: "Verified Identity", icon: BadgeCheck, earned: user.isVerified },
    { label: "Active Participant", icon: Users, earned: user.eventsAttended > 10 },
    { label: "Trusted Host", icon: Award, earned: user.eventsHosted > 5 },
  ];

  return (
    <div className="pb-20 md:pb-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="relative mb-16 md:mb-0">
        <div className="h-32 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 md:left-8 md:transform-none md:-bottom-16 md:translate-y-0 z-10">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.firstName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            {user.isVerified && (
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
        {/* Left Column: Profile Info */}
        <div className="md:pt-20">
        {/* Profile Info */}
        <div className="flex flex-col items-center md:items-start mb-8">
          <h2 className="text-2xl font-bold mb-2">{user.firstName}</h2>
          {user.bio && (
            <p className="text-center text-gray-600 max-w-sm">{user.bio}</p>
          )}
        </div>

        {/* Edit Button */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Edit Profile
          </button>
          <button 
            onClick={() => setShowAvatarDesigner(true)}
            className="flex items-center justify-center p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Palette className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center p-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>


        {/* Trust Indicators (Desktop: Left Col) */}
        <div className="mb-8 hidden md:block">
          <h3 className="text-lg font-bold mb-4">Trust & Safety</h3>
          <div className="space-y-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    badge.earned
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      badge.earned ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        badge.earned ? "text-blue-900" : "text-gray-600"
                      }`}
                    >
                      {badge.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>

        {/* Right Column: Content */}
        <div className="bg-white rounded-3xl p-6 md:p-8 md:-mt-20 md:shadow-sm md:border border-gray-100 min-h-[500px]">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-8 md:mb-12">
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl font-bold mb-1 text-gray-900">{user.eventsHosted}</p>
            <p className="text-sm text-gray-600">Events Hosted</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold mb-1 text-gray-900">{user.eventsAttended}</p>
            <p className="text-sm text-gray-600">Events Attended</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold mb-1 text-gray-900">42</p>
            <p className="text-sm text-gray-600">Eventchens</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-2xl font-bold mb-1 text-gray-900">128</p>
            <p className="text-sm text-gray-600">Friends</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 mt-4 md:mt-0">
        <div className="flex justify-around relative">
          {['events', 'moments'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item as 'events' | 'moments')}
              className={`flex-1 py-3 text-sm font-semibold capitalize relative transition-colors ${activeTab === item ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {item}
              {activeTab === item && (
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="underline" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="py-6">
        <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
        {activeTab === 'events' && (
          <div className="text-center text-gray-500 py-10">
            <p>Past and upcoming events will appear here.</p>
          </div>
        )}
        {activeTab === 'moments' && (
          <motion.div
            className="grid grid-cols-3 gap-1"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-white rounded-lg flex items-center justify-center border"
                variants={photoVariants}
              >
                <ImageIcon className="w-6 h-6 text-gray-300" />
              </motion.div>
            ))}
          </motion.div>
        )}
        </motion.div>
        </AnimatePresence>

        {/* Trust Indicators (Mobile) */}
        <div className="mb-8 md:hidden mt-8">
          <h3 className="text-lg font-bold mb-4">Trust & Safety</h3>
          <div className="space-y-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    badge.earned
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      badge.earned ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={
                        badge.earned ? "text-blue-900" : "text-gray-600"
                      }
                    >
                      {badge.label}
                    </p>
                  </div>
                  {badge.earned && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Earned
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6 mt-8">
          <h3 className="text-lg font-bold mb-3">About Trust System</h3>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm text-gray-700">
            <p>
              • Verified users have confirmed their identity
            </p>
            <p>
              • Trust badges are earned through positive participation
            </p>
            <p>
              • Your safety is our priority - report any issues
            </p>
          </div>
        </div>
      </div>
      </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-white w-full max-w-md rounded-3xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Privacy & Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Eye className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold">Ghost Mode</p>
                      <p className="text-xs text-gray-500">Hide location from everyone</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapIcon className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold">Map Appearance</p>
                      <p className="text-xs text-gray-500">Use Avatar instead of Photo</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Shield className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold">Profile Visibility</p>
                      <p className="text-xs text-gray-500">Friends Only</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Edit</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Designer Modal */}
      <AnimatePresence>
        {showAvatarDesigner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAvatarDesigner(false)}
          >
            <div onClick={e => e.stopPropagation()}>
              <AvatarDesigner onClose={() => setShowAvatarDesigner(false)} onSave={() => setShowAvatarDesigner(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

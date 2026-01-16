import { useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Users, BadgeCheck, Shield, Share2, Heart, MessageSquare, Image as ImageIcon } from "lucide-react";
import { Event } from "../types";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface EventDetailScreenProps {
  event: Event;
  onBack: () => void;
}

// Placeholder PostCard component for the "Discussion" tab
function PostCard({ post }: { post: { author: string, avatar: string, time: string, text: string } }) {
  const postVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      },
    },
  };
  return (
    <motion.div className="bg-gray-50 p-4 rounded-2xl border border-gray-100" variants={postVariants}>
      <div className="flex items-center gap-3 mb-3">
        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-sm text-gray-800">{post.author}</p>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{post.text}</p>
      <div className="flex gap-4 mt-3">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors group">
          <Heart className="w-4 h-4" />
          <span className="font-medium">5</span>
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-500 transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">Reply</span>
        </button>
      </div>
    </motion.div>
  );
}

export function EventDetailScreen({ event, onBack }: EventDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'discussion' | 'memories'>('about');

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

  const tabContentVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const posts = [
    { author: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', time: '2h ago', text: "So excited for this! Who's bringing snacks? 🍿" },
    { author: 'Mike', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', time: '1h ago', text: "I'll be there a bit late, save me a spot!" },
  ];

  return (
    <div className="pb-24 md:pb-12 bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-20 px-4 py-4 flex items-center justify-between">
        <div className="w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">Event Details</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 pt-6 md:pt-10 grid lg:grid-cols-[1fr_380px] gap-12 items-start">
        {/* Main Content Column */}
        <div className="min-w-0">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {event.category}
          </span>
          {!event.isPublic && (
            <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
              Private Event
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">{event.title}</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6 -mb-px">
            <button onClick={() => setActiveTab('about')} className={`py-3 text-sm font-semibold ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>About</button>
            <button onClick={() => setActiveTab('discussion')} className={`py-3 text-sm font-semibold ${activeTab === 'discussion' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Discussion</button>
            <button onClick={() => setActiveTab('memories')} className={`py-3 text-sm font-semibold ${activeTab === 'memories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Memories</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
        {activeTab === 'about' && (<>
        {/* Event Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>{event.area}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Users className="w-5 h-5 text-gray-400" />
            <span>{event.attendees} people going</span>
          </div>
        </div>

        {/* Host Info */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors lg:hidden">
          <p className="text-sm text-gray-600 mb-3">Hosted by</p>
          <div className="flex items-center gap-3">
            <img
              src={event.host.avatar}
              alt={event.host.firstName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-semibold text-gray-800">{event.host.firstName}</span>
                {event.host.isVerified && (
                  <BadgeCheck className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{event.host.eventsHosted} events hosted • {event.host.eventsAttended} attended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendees Preview */}
        <div className="mb-8 lg:hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Going ({event.attendees})</h2>
            <button className="text-blue-600 text-sm font-medium">See all</button>
          </div>
          <div className="flex items-center -space-x-3 overflow-hidden py-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=${event.id}${i}`}
                alt="Attendee"
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
              />
            ))}
            <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-600">
              +{event.attendees > 5 ? event.attendees - 5 : 0}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">About this event</h2>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>

        {/* Rules */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Event Guidelines</h2>
          </div>
          <ul className="space-y-2">
            {event.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-600 mt-1">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        </>)}

        {activeTab === 'discussion' && (
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {posts.map((post, i) => <PostCard key={i} post={post} />)}
          </motion.div>
        )}

        {activeTab === 'memories' && (
          <motion.div
            className="grid grid-cols-3 gap-1"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                variants={photoVariants}
              >
                <ImageIcon className="w-6 h-6 text-gray-300" />
              </motion.div>
            ))}
          </motion.div>
        )}
        </motion.div>
        </AnimatePresence>

        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block space-y-8 sticky top-28">
          {/* Action Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <p className="text-sm text-gray-500 mb-1">Price</p>
                   <p className="text-2xl font-bold text-gray-900">{event.price === 'Free' ? 'Free' : `$${event.price}`}</p>
                </div>
                <div className="text-right">
                   <p className="text-sm text-gray-500 mb-1">Spots</p>
                   <p className="text-lg font-semibold text-gray-900">{event.capacity - event.attendees} left</p>
                </div>
             </div>
             <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">
                {event.isPublic ? "I'm Going" : "Request to Join"}
             </button>
             <p className="text-xs text-center text-gray-400 mt-4">You won't be charged yet</p>
          </div>

          {/* Host Card Desktop */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Hosted by</h3>
            <div className="flex items-center gap-4">
              <img src={event.host.avatar} alt={event.host.firstName} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1">
                   <span className="font-semibold text-gray-900">{event.host.firstName}</span>
                   {event.host.isVerified && <BadgeCheck className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-sm text-gray-500">Joined 2023</p>
              </div>
            </div>
          </div>

          {/* Attendees Desktop */}
          <div>
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Going ({event.attendees})</h3>
                <button className="text-blue-600 text-sm font-medium hover:underline">View all</button>
             </div>
             <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                   <img key={i} src={`https://i.pravatar.cc/150?u=${event.id}${i}`} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100" alt="" />
                ))}
             </div>
          </div>
        </div>

        {/* Mobile Action Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-white border-t border-gray-100 z-30">
          <motion.button
            className="w-full max-w-lg mx-auto block bg-blue-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform"
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            {event.isPublic ? "I'm Going" : "Request to Join"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

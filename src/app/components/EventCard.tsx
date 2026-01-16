import { Calendar, MapPin, BadgeCheck, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Event } from "../types";
import { motion, Variants } from "framer-motion";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };
  
  return (
    <motion.div
      onClick={onClick}
      className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col"
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Header: Host Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={event.host.avatar}
            alt={event.host.firstName}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-gray-900">{event.host.firstName}</span>
              {event.host.isVerified && (
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">Hosted • 2h ago</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {event.category}
          </span>
          {!event.isPublic && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Private</span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">{event.title}</h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{new Date(event.date).toLocaleDateString("en-US", { weekday: 'short', month: "short", day: "numeric" })} • {event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{event.area}</span>
          </div>
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex -space-x-2 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <img key={i}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src={`https://i.pravatar.cc/40?u=${event.id}${i}`}
                  alt="attendee" />
              ))}
            </div>
            <span className="ml-1">{event.attendees} going</span>
          </div>
          {event.price !== "Free" && <span className="text-sm font-medium text-gray-500">${event.price}</span>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors group">
              <Heart className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-900 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

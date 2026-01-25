import { useState } from "react";
import { ArrowLeft, Coffee, Sparkles } from "lucide-react";

interface CreateEventScreenProps {
  onBack: () => void;
}

export function CreateEventScreen({ onBack }: CreateEventScreenProps) {
  const [eventType, setEventType] = useState<'standard' | 'eventchen'>('standard');
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    area: "",
    capacity: "",
    isPublic: true,
    price: "Free",
    description: "",
  });

  const categories = [
    "Social",
    "Food & Dining",
    "Sports",
    "Outdoor",
    "Creative",
    "Professional",
    "Other",
  ];

  const eventchenVibes = [
    "☕ Coffee",
    "🚶 Walk",
    "🌇 Sunset",
    "📚 Study",
    "💬 Deep Talk",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Event created:", formData);
    alert("Event created successfully! (This is a demo)");
    onBack();
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl">Create Event</h1>
        </div>
      </div>

      {/* Event Type Toggle */}
      <div className="px-4 pt-2 pb-4">
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button
            onClick={() => setEventType('standard')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${eventType === 'standard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
          >
            Standard Event
          </button>
          <button
            onClick={() => setEventType('eventchen')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${eventType === 'eventchen' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
          >
            <Sparkles className="w-3 h-3" />
            Eventchen
          </button>
        </div>
        {eventType === 'eventchen' && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Small, spontaneous, max 4 people. No pressure.
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm mb-2">{eventType === 'eventchen' ? 'What are we doing?' : 'Event Title'}</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder={eventType === 'eventchen' ? "e.g. Quick coffee at Joe's" : "e.g. Sunday Brunch Meetup"}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-2">{eventType === 'eventchen' ? 'Vibe' : 'Category'}</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">{eventType === 'eventchen' ? 'Select a vibe' : 'Select a category'}</option>
            {(eventType === 'eventchen' ? eventchenVibes : categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-2">
            Area / Neighborhood
          </label>
          <input
            type="text"
            value={formData.area}
            onChange={(e) =>
              setFormData({ ...formData, area: e.target.value })
            }
            placeholder="e.g. Mission District, SF"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Exact address will be shared after joining
          </p>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm mb-2">Capacity</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
            placeholder={eventType === 'eventchen' ? "Max 4 people" : "Max attendees"}
            min="2"
            max={eventType === 'eventchen' ? "4" : "500"}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Public / Private */}
        {eventType === 'standard' && (
        <div>
          <label className="block text-sm mb-3">Event Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isPublic: true })}
              className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                formData.isPublic
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              Public
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isPublic: false })}
              className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                !formData.isPublic
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              Invite-Only
            </button>
          </div>
        </div>
        )}

        {/* Price */}
        {eventType === 'standard' && (
        <div>
          <label className="block text-sm mb-2">Price</label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="Free or amount in $"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm mb-2">{eventType === 'eventchen' ? 'Quick Note' : 'Description'}</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder={eventType === 'eventchen' ? "Where exactly? How long?" : "Tell people what to expect..."}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full text-white py-4 rounded-xl transition-colors ${eventType === 'eventchen' ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-200' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {eventType === 'eventchen' ? 'Spark Eventchen ✨' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

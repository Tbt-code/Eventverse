import { Compass, Map, PlusCircle, MessageCircle, User, Users } from "lucide-react";
import { Screen } from "../types";

interface BottomNavProps {
  activeScreen: Screen | 'friends';
  onNavigate: (screen: Screen | 'friends') => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems: { id: Screen | 'friends'; icon: typeof Compass; label: string }[] = [
    { id: "discover", icon: Compass, label: "Discover" },
    { id: "map", icon: Map, label: "Events" },
    { id: "create", icon: PlusCircle, label: "Create" },
    { id: "friends", icon: Users, label: "Friends" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen | 'friends')}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-2 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

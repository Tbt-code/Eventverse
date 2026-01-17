import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import { Screen } from "./types";
import { mockEvents, currentUser } from "./mockData";
import { BottomNav } from "./components/BottomNav";
import { DiscoverScreen } from "./components/DiscoverScreen";
import { MapScreen } from "./components/MapScreen";
import { CreateEventScreen } from "./components/CreateEventScreen";
import { EventDetailScreen } from "./components/EventDetailScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { MessagesScreen } from "./components/MessagesScreen";
import {LoginForm} from "./components/auth/LoginForm";
import {SignupForm} from "./components/auth/SignupForm";

function EventDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) return <div>Event not found</div>;

  return <EventDetailScreen event={event} onBack={() => navigate(-1)} />;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleNavigate = (screen: Screen) => {
    if (screen === "discover") {
      navigate("/");
    } else if (screen === "create") {
      navigate("/create");
    } 
    else {
      navigate(`/${screen}`);
    }
  };

  const getActiveScreen = (): Screen => {
    const path = location.pathname;
    if (path === "/map") return "map";
    if (path === "/messages") return "messages";
    if (path === "/profile") return "profile";
    if (path === "/create") return "create";
    return "discover";
  };

  const showBottomNav = !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-lg mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <DiscoverScreen events={mockEvents} onEventClick={handleEventClick} />
            }
          />
          <Route
            path="/map"
            element={<MapScreen events={mockEvents} onEventClick={handleEventClick} />}
          />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/profile" element={<ProfileScreen user={currentUser} />} />
          <Route
            path="/create"
            element={<CreateEventScreen onBack={() => navigate(-1)} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/event/:id" element={<EventDetailWrapper />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && <BottomNav activeScreen={getActiveScreen()} onNavigate={handleNavigate} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export interface User {
  id: string;
  firstName: string;
  avatar: string;
  isVerified: boolean;
  eventsHosted: number;
  eventsAttended: number;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  area: string;
  capacity: number;
  attendees: number;
  price: number | "Free";
  isPublic: boolean;
  host: User;
  description: string;
  rules: string[];
  lat: number;
  lng: number;
}

export type Screen = "discover" | "map" | "create" | "messages" | "profile";

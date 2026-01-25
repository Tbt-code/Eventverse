import React, { useState, useEffect } from 'react';
import { Box, Typography, Switch, Paper, ToggleButton, ToggleButtonGroup, Modal, IconButton, Button, Fade } from '@mui/material';
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Circle } from 'react-leaflet';
// @ts-ignore
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AbstractAvatar, AvatarConfig } from '../components/AbstractAvatar';
import { MapPin, Ghost, Calendar, Hand, X, Settings, Eye, Navigation, Zap, Locate } from 'lucide-react';

// Bypass TypeScript errors for React Leaflet components due to missing/incompatible types in the environment
const MapContainerAny = MapContainer as any;
const TileLayerAny = TileLayer as any;
const MarkerAny = Marker as any;
const CircleAny = Circle as any;

// Types for the new Privacy & Location Model
type LocationType = 'approx' | 'event' | 'live';
type AudienceType = 'close_friends' | 'all_friends';

interface Friend {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  avatarType: 'avatar' | 'photo';
  img?: string;
  context?: 'coffee' | 'study' | 'party' | 'work' | 'chill';
  config?: AvatarConfig;
  locationType: LocationType;
  currentEvent?: { id: string; name: string };
  isCloseFriend?: boolean;
}

interface EventPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'music' | 'social' | 'art';
}

// Mock Data for Friends Map
// Centered around San Francisco for demo
const FRIENDS_ON_MAP: Friend[] = [
  { 
    id: 'f1', name: 'Bob', lat: 37.7849, lng: -122.4294,
    status: 'In Japantown',
    avatarType: 'avatar', context: 'coffee', 
    config: { skinTone: '#E0AC69', hairColor: '#2C2C2C', outfitColor: '#FFD93D', accessory: 'glasses', mood: 'happy' },
    locationType: 'approx',
    isCloseFriend: true
  },
  { 
    id: 'f2', name: 'Alice', lat: 37.7600, lng: -122.4100,
    status: 'At Neon Nights',
    avatarType: 'photo', img: 'https://i.pravatar.cc/150?u=alice', 
    context: 'party',
    locationType: 'event',
    currentEvent: { id: 'e1', name: 'Neon Nights' },
    isCloseFriend: true,
    config: { skinTone: '#F5D0C5', hairColor: '#D35400', outfitColor: '#FF6B6B', accessory: 'none', mood: 'excited' }
  },
  { 
    id: 'f3', name: 'Charlie', lat: 37.7955, lng: -122.3937,
    status: 'Chilling',
    avatarType: 'avatar', 
    config: { skinTone: '#8D5524', hairColor: '#000000', outfitColor: '#4ECDC4', accessory: 'headphones', mood: 'cool' },
    locationType: 'approx',
    isCloseFriend: false
  }
];

const EVENTS_ON_MAP: EventPin[] = [
  { id: 'e1', name: 'Neon Nights', lat: 37.7600, lng: -122.4100, type: 'music' },
  { id: 'e2', name: 'Art Walk', lat: 37.7700, lng: -122.4400, type: 'art' }
];

// --- Custom Map Components ---

// Renders friends as interactive React components overlaying the map
const FriendsOverlay = ({ friends, onSelect }: { friends: Friend[], onSelect: (f: Friend) => void }) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  const [, setTick] = useState(0); // Force re-render on move

  useMapEvents({
    zoom: () => setZoom(map.getZoom()),
    move: () => setTick(t => t + 1) // Update positions smoothly
  });

  return (
    <>
      {friends.map((friend) => {
        const pos = map.latLngToContainerPoint([friend.lat, friend.lng] as [number, number]);
        
        // Hide if out of view (simple optimization)
        const bounds = map.getBounds();
        if (!bounds.contains([friend.lat, friend.lng] as [number, number])) return null;

        return (
          <Box
            key={friend.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(friend);
            }}
            sx={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -90%)', // Anchor feet to map
              zIndex: 1000, // Above map tiles
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              '&:hover': { zIndex: 1001, transform: 'translate(-50%, -110%) scale(1.1)' }
            }}
          >
            {/* Approximate Location Bubble */}
            {friend.locationType === 'approx' && (
              <Box sx={{
                position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
                width: 60, height: 20,
                bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(4px)',
                zIndex: -1
              }} />
            )}

            {/* Avatar */}
            <Box sx={{ position: 'relative' }}>
              <AbstractAvatar 
                scale={0.8}
                config={friend.config}
                isPulsing={friend.locationType === 'event'}
              />
              
              {/* Status Badge (Online/Event) */}
              {friend.locationType === 'event' && (
                <Box sx={{
                  position: 'absolute', top: -5, right: -5,
                  bgcolor: '#ef4444', color: 'white',
                  width: 20, height: 20, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white', boxShadow: 1
                }}>
                  <Zap size={10} fill="currentColor" />
                </Box>
              )}
            </Box>
            
            {/* Name Tag (Only show if zoomed in enough) */}
            {zoom > 12 && (
              <Paper elevation={3} sx={{ 
                mt: 0.5, px: 1, py: 0.2, borderRadius: 3, 
                bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)',
                textAlign: 'center', whiteSpace: 'nowrap',
                transform: 'translateX(0%)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Typography variant="caption" fontWeight="bold" sx={{ fontSize: '0.7rem', display: 'block', lineHeight: 1 }}>
                  {friend.name}
                </Typography>
              </Paper>
            )}
          </Box>
        );
      })}
    </>
  );
};

export const FriendsMap: React.FC = () => {
  // Privacy State
  const [isGhostMode, setIsGhostMode] = useState(true); // Default to Hidden (Safety First)
  const [sharingLevel, setSharingLevel] = useState<LocationType>('approx');
  const [audience, setAudience] = useState<AudienceType>('close_friends');
  
  // UI State
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGhostMode(!event.target.checked);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative', bgcolor: '#f0f0f0', overflow: 'hidden' }}>
      
      {/* --- REAL MAP CONTAINER --- */}
      <MapContainerAny 
        center={[37.7749, -122.4194]} 
        zoom={13} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayerAny
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Event Pins (Fixed) */}
        {EVENTS_ON_MAP.map(evt => (
          <MarkerAny 
            key={evt.id} 
            position={[evt.lat, evt.lng]}
            icon={L.divIcon({
              className: 'custom-pin',
              html: `<div style="background-color: #6366f1; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.2);"><div style="width: 10px; height: 10px; background: white; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            })}
            eventHandlers={{
              click: () => alert(`Event: ${evt.name}`)
            }}
          />
        ))}

        {/* Approximate Location Circles */}
        {FRIENDS_ON_MAP.filter(f => f.locationType === 'approx').map(f => (
          <CircleAny 
            key={`circle-${f.id}`}
            center={[f.lat, f.lng]}
            radius={400} // 400 meters fuzzy radius
            pathOptions={{ 
              color: f.config?.outfitColor || '#3b82f6', 
              fillColor: f.config?.outfitColor || '#3b82f6', 
              fillOpacity: 0.1, 
              weight: 1,
              dashArray: '5, 5'
            }} 
          />
        ))}

        {/* Interactive Avatars Overlay */}
        <FriendsOverlay friends={FRIENDS_ON_MAP} onSelect={setSelectedFriend} />

      </MapContainerAny>

      {/* --- TOP HEADER (Privacy & Status) --- */}
      <Paper sx={{ 
        position: 'absolute', top: 16, right: 16, left: 16,
        p: 2, borderRadius: 3, 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Left: Status Indicator */}
        <Box 
          onClick={() => setShowPrivacySettings(true)}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
        >
          <Box sx={{ 
            width: 40, height: 40, borderRadius: '50%', 
            bgcolor: isGhostMode ? '#f3f4f6' : '#ecfdf5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: isGhostMode ? '2px solid #e5e7eb' : '2px solid #10b981'
          }}>
            {isGhostMode ? <Ghost size={20} className="text-gray-400" /> : <Eye size={20} className="text-emerald-600" />}
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
              {isGhostMode ? 'Ghost Mode' : 'Visible'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {isGhostMode ? 'You are hidden' : sharingLevel === 'approx' ? 'Approximate Location' : 'Event Location'}
              <Settings size={10} />
            </Typography>
          </Box>
        </Box>

        {/* Right: Quick Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Switch 
            checked={!isGhostMode} 
            onChange={handleToggle} 
            color="success"
            size="small"
          />
        </Box>
      </Paper>

      {/* --- FRIEND DETAIL SHEET (Context Aware) --- */}
      <Fade in={!!selectedFriend} mountOnEnter unmountOnExit>
        <Paper sx={{
          position: 'absolute', bottom: 80, left: 16, right: 16,
          p: 3, borderRadius: 4, zIndex: 20,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          {selectedFriend ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <AbstractAvatar 
                    scale={1.2}
                    config={selectedFriend.config}
                    isPulsing={selectedFriend.locationType === 'event'}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{selectedFriend.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {selectedFriend.locationType === 'event' ? <MapPin size={14} /> : <Navigation size={14} />}
                      {selectedFriend.status}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small" onClick={() => setSelectedFriend(null)}>
                  <X size={20} />
                </IconButton>
              </Box>

              {/* Context Actions (Join / Wave) */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<Hand size={18} />}
                  sx={{ bgcolor: '#FFD93D', color: 'black', '&:hover': { bgcolor: '#F4C430' }, borderRadius: 3, py: 1.5 }}
                >
                  Wave
                </Button>
                {selectedFriend.locationType === 'event' && (
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<Calendar size={18} />}
                    sx={{ borderRadius: 3, py: 1.5, borderColor: '#e0e0e0', color: 'black' }}
                  >
                    Join Event
                  </Button>
                )}
              </Box>
            </>
          ) : <Box />}
        </Paper>
      </Fade>

      {/* --- PRIVACY SETTINGS MODAL --- */}
      <Modal
        open={showPrivacySettings}
        onClose={() => setShowPrivacySettings(false)}
        aria-labelledby="privacy-settings"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '90%', maxWidth: 400, bgcolor: 'background.paper',
          borderRadius: 4, boxShadow: 24, p: 4, outline: 'none'
        }}>
          <Typography variant="h6" fontWeight="bold" mb={3}>Privacy & Status</Typography>
          
          {/* Visibility Tiers */}
          <Typography variant="subtitle2" color="text.secondary" mb={1}>Who can see you?</Typography>
          <ToggleButtonGroup
            value={audience}
            exclusive
            onChange={(_, v) => v && setAudience(v)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="close_friends">Close Friends</ToggleButton>
            <ToggleButton value="all_friends">All Friends</ToggleButton>
          </ToggleButtonGroup>

          <Typography variant="subtitle2" color="text.secondary" mb={1}>What can they see?</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[
              { id: 'approx', label: 'Approximate Location', icon: Locate, desc: 'City or neighborhood only' },
              { id: 'event', label: 'Events Only', icon: Calendar, desc: 'Only when you check-in' },
              { id: 'live', label: 'Live (1 Hour)', icon: Zap, desc: 'Temporary precise sharing' },
            ].map((opt) => (
              <Paper 
                key={opt.id}
                onClick={() => { setSharingLevel(opt.id as LocationType); setIsGhostMode(false); }}
                variant="outlined"
                sx={{ 
                  p: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2,
                  borderColor: (!isGhostMode && sharingLevel === opt.id) ? 'primary.main' : 'divider',
                  bgcolor: (!isGhostMode && sharingLevel === opt.id) ? 'primary.50' : 'transparent'
                }}
              >
                <opt.icon size={20} className={(!isGhostMode && sharingLevel === opt.id) ? 'text-blue-600' : 'text-gray-400'} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">{opt.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{opt.desc}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          <Button 
            fullWidth 
            variant="contained" 
            onClick={() => setShowPrivacySettings(false)}
            sx={{ mt: 4, borderRadius: 3, py: 1.5 }}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
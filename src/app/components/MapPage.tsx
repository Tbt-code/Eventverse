import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel, Paper, Chip } from '@mui/material';
import { AbstractAvatar } from '../components/AbstractAvatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock Data representing the "Fuzzy Logic" backend
const EVENTS = [
  { id: 1, name: 'Neon Nights', type: 'music', x: 30, y: 40, attendees: ['Alice', 'Charlie'] },
  { id: 2, name: 'Downtown Jazz', type: 'social', x: 70, y: 60, attendees: ['David'] },
];

const FRIENDS_NEARBY = [
  { id: 'f1', name: 'Bob', status: 'In Williamsburg', lateness: '5m ago' } // Fuzzy zone, not coordinates
];

export const MapPage: React.FC = () => {
  const [visibilityMode, setVisibilityMode] = useState<'event' | 'ghost'>('event');

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibilityMode(event.target.checked ? 'event' : 'ghost');
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative', bgcolor: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* --- MAP BACKGROUND (Simulated) --- */}
      <Box sx={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(#cfd8dc 1px, transparent 1px)', 
        backgroundSize: '20px 20px',
        opacity: 0.5 
      }} />

      {/* --- TOP CONTROLS --- */}
      <Paper sx={{ 
        position: 'absolute', top: 16, right: 16, left: 16, 
        p: 2, borderRadius: 3, 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10
      }}>
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            {visibilityMode === 'event' ? '👁️ Visible at Events' : '👻 Ghost Mode'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {visibilityMode === 'event' 
              ? "Friends see you when you check in." 
              : "You are invisible to everyone."}
          </Typography>
        </Box>
        <Switch 
          checked={visibilityMode === 'event'} 
          onChange={handleToggle} 
          color="primary"
        />
      </Paper>

      {/* --- EVENTS & AVATARS --- */}
      {EVENTS.map((evt) => (
        <Box 
          key={evt.id}
          sx={{
            position: 'absolute',
            top: `${evt.y}%`,
            left: `${evt.x}%`,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => alert(`Navigating to event details: ${evt.name}`)} // Interaction Rule: Tap Event, not Person
        >
          {/* Event Aura */}
          <Box sx={{ 
            width: 120, height: 120, 
            bgcolor: 'rgba(98, 0, 238, 0.1)', 
            borderRadius: '50%', 
            position: 'absolute',
            zIndex: 0
          }} />

          {/* Event Marker */}
          <Paper elevation={3} sx={{ 
            p: 1, px: 2, borderRadius: 4, 
            display: 'flex', alignItems: 'center', gap: 1,
            mb: 1, zIndex: 2,
            bgcolor: 'white'
          }}>
            <LocationOnIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2" fontWeight="bold">{evt.name}</Typography>
          </Paper>

          {/* Friend Cluster (Orbiting) */}
          <Box sx={{ display: 'flex', gap: 1, zIndex: 2 }}>
            {evt.attendees.map((friend, idx) => (
              <AbstractAvatar 
                key={idx}
                initials={friend[0]} 
                color={idx % 2 === 0 ? '#FF6B6B' : '#4ECDC4'}
                eventType={evt.type as any}
                isPulsing={true}
              />
            ))}
          </Box>
        </Box>
      ))}

      {/* --- FUZZY ZONE INDICATOR (Bottom Sheet) --- */}
      <Paper sx={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        p: 3, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        zIndex: 10
      }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Nearby Friends
        </Typography>
        
        {/* List of friends in fuzzy zones */}
        {FRIENDS_NEARBY.map((friend) => (
          <Box key={friend.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <AbstractAvatar initials={friend.name[0]} color="#FFD93D" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{friend.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {friend.status}
                </Typography>
                <Chip 
                  label={`~${friend.lateness}`} 
                  size="small" 
                  variant="outlined" 
                  sx={{ height: 20, fontSize: '0.65rem' }} 
                />
              </Box>
            </Box>
          </Box>
        ))}

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
          Locations are approximate to protect privacy.
        </Typography>
      </Paper>

      {/* --- PRIVACY TOAST (Simulated System Logic) --- */}
      {visibilityMode === 'event' && (
        <Box sx={{
          position: 'absolute', bottom: 140, left: '50%', transform: 'translateX(-50%)',
          bgcolor: 'rgba(0,0,0,0.7)', color: 'white',
          px: 2, py: 1, borderRadius: 8,
          pointerEvents: 'none'
        }}>
          <Typography variant="caption">
            Location data auto-deletes in 24h
          </Typography>
        </Box>
      )}
    </Box>
  );
};
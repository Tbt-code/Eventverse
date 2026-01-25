import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { AbstractAvatar } from '../components/AbstractAvatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Mock Data representing the "Fuzzy Logic" backend
const EVENTS = [
  { id: 1, name: 'Neon Nights', type: 'music', x: 30, y: 40, attendees: ['Alice', 'Charlie'] },
  { id: 2, name: 'Downtown Jazz', type: 'social', x: 70, y: 60, attendees: ['David'] },
];

export const MapPage: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh', position: 'relative', bgcolor: '#e0e0e0', overflow: 'hidden' }}>
      
      {/* --- MAP BACKGROUND (Simulated) --- */}
      <Box sx={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(#cfd8dc 1px, transparent 1px)', 
        backgroundSize: '20px 20px',
        opacity: 0.5 
      }} />

      {/* --- HEADER --- */}
      <Paper sx={{ 
        position: 'absolute', top: 16, left: 16, right: 16,
        p: 2, borderRadius: 3, 
        zIndex: 10, textAlign: 'center'
      }}>
        <Typography variant="subtitle1" fontWeight="bold">Event Map</Typography>
        <Typography variant="caption" color="text.secondary">Discover what's happening nearby</Typography>
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
    </Box>
  );
};
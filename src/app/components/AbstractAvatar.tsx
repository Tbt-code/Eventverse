import React from 'react';
import { Box, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import PaletteIcon from '@mui/icons-material/Palette';

interface AbstractAvatarProps {
  initials: string;
  color: string;
  eventType?: 'music' | 'social' | 'art';
  isPulsing?: boolean;
}

export const AbstractAvatar: React.FC<AbstractAvatarProps> = ({ 
  initials, 
  color, 
  eventType,
  isPulsing = false 
}) => {
  
  // Contextual badge based on event type
  const getEventIcon = () => {
    switch(eventType) {
      case 'music': return <MusicNoteIcon sx={{ fontSize: 12, color: 'white' }} />;
      case 'social': return <LocalBarIcon sx={{ fontSize: 12, color: 'white' }} />;
      case 'art': return <PaletteIcon sx={{ fontSize: 12, color: 'white' }} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* The Aura / Pulse Animation */}
      {isPulsing && (
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', opacity: 1 },
            '100%': { transform: 'scale(1.5)', opacity: 0 }
          }
        }} />
      )}
      
      {/* The Core Avatar */}
      <Box sx={{
        width: 40, height: 40,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${color}, #ffffff)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        border: '2px solid white'
      }}>
        <Typography variant="subtitle2" fontWeight="bold" color="text.primary">
          {initials}
        </Typography>
      </Box>

      {/* Context Badge (replaces facial expressions) */}
      {eventType && (
        <Box sx={{
          position: 'absolute',
          bottom: -2, right: -2,
          width: 18, height: 18,
          bgcolor: 'black',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {getEventIcon()}
        </Box>
      )}
    </Box>
  );
};
import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface OnboardingPageProps {
  onComplete: (mode: 'event' | 'ghost') => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [selectedMode, setSelectedMode] = useState<'event' | 'ghost' | null>(null);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      p: 3,
      bgcolor: '#f8f9fa' 
    }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        How do you want to appear?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Eventverse is designed for meeting up, not tracking. You are always in control.
      </Typography>

      <Stack spacing={2}>
        {/* Option 1: Event Mode (Recommended) */}
        <Card 
          onClick={() => setSelectedMode('event')}
          sx={{ 
            cursor: 'pointer',
            border: selectedMode === 'event' ? '2px solid #6200ee' : '1px solid #e0e0e0',
            bgcolor: selectedMode === 'event' ? '#f3e5f5' : 'white'
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VisibilityIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight="bold">Event Mode</Typography>
              <Typography variant="body2" color="text.secondary">
                Only show me when I'm checked into an event.
              </Typography>
            </Box>
            {selectedMode === 'event' && <CheckCircleIcon color="primary" sx={{ ml: 'auto' }} />}
          </CardContent>
        </Card>

        {/* Option 2: Ghost Mode */}
        <Card 
          onClick={() => setSelectedMode('ghost')}
          sx={{ 
            cursor: 'pointer',
            border: selectedMode === 'ghost' ? '2px solid #6200ee' : '1px solid #e0e0e0',
            bgcolor: selectedMode === 'ghost' ? '#f3e5f5' : 'white'
          }}
        >
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <VisibilityOffIcon color="action" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight="bold">Ghost Mode</Typography>
              <Typography variant="body2" color="text.secondary">
                I'm lurking. Don't show me anywhere.
              </Typography>
            </Box>
            {selectedMode === 'ghost' && <CheckCircleIcon color="primary" sx={{ ml: 'auto' }} />}
          </CardContent>
        </Card>
      </Stack>

      <Box sx={{ mt: 4, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" color="primary">
          OUR PROMISE
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          • We don't track you. We only show you when you choose to share an event.
        </Typography>
        <Typography variant="caption" display="block">
          • Your location disappears after the event ends.
        </Typography>
        <Typography variant="caption" display="block">
          • Historical movement is never stored.
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        size="large" 
        fullWidth 
        disabled={!selectedMode}
        onClick={() => selectedMode && onComplete(selectedMode)}
        sx={{ mt: 'auto', py: 2, fontWeight: 'bold' }}
      >
        Continue
      </Button>
    </Box>
  );
};
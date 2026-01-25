import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion, Variants } from 'framer-motion';

// --- AVATAR ENGINE: FRAMER MOTION SVG RIG ---
// This replaces static icons with a hierarchical 2D character rig.
// Structure: Root -> Body -> Head -> Face Features -> Accessories

export interface AvatarConfig {
  skinTone: string;
  hairColor: string;
  outfitColor: string;
  accessory: 'none' | 'glasses' | 'hat' | 'headphones';
  mood: 'idle' | 'happy' | 'excited' | 'cool';
}

interface CharacterAvatarProps {
  config?: AvatarConfig;
  isPulsing?: boolean;
  scale?: number;
  onClick?: () => void;
}

const DEFAULT_CONFIG: AvatarConfig = {
  skinTone: '#F5D0C5',
  hairColor: '#4A3B2A',
  outfitColor: '#FFD93D',
  accessory: 'none',
  mood: 'idle'
};

// --- ANIMATION STATE MACHINE ---
const bodyVariants: Variants = {
  idle: {
    y: [0, -2, 0],
    scaleY: [1, 1.02, 1],
    transition: {
      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      scaleY: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  },
  excited: {
    y: [0, -8, 0],
    transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" }
  }
};

const headVariants: Variants = {
  idle: {
    rotate: [-1, 1, -1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  },
  excited: {
    rotate: [-5, 5, -5],
    transition: { duration: 0.4, repeat: Infinity }
  }
};

const eyeVariants: Variants = {
  idle: { scaleY: 1 },
  blink: { scaleY: 0.1, transition: { duration: 0.1 } }
};

export const AbstractAvatar: React.FC<CharacterAvatarProps> = ({ 
  config = DEFAULT_CONFIG,
  isPulsing = false,
  scale = 1,
  onClick
}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blink logic (Duolingo style: every 3-6 seconds)
  useEffect(() => {
    const blinkLoop = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextBlink = Math.random() * 3000 + 3000;
      setTimeout(blinkLoop, nextBlink);
    };
    const timer = setTimeout(blinkLoop, 3000);
    return () => clearTimeout(timer);
  }, []);

  const currentMood = config.mood === 'happy' ? 'excited' : 'idle';

  return (
    <Box 
      onClick={onClick}
      sx={{ 
        position: 'relative', 
        width: 60 * scale, 
        height: 100 * scale,
        cursor: 'pointer',
        // Anchor point logic is handled by the map, but visually we center the feet
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
    >
      {/* Context Aura */}
      {isPulsing && (
        <motion.div
          style={{
            position: 'absolute', bottom: 0, width: 40 * scale, height: 10 * scale,
            borderRadius: '50%', backgroundColor: config.outfitColor, opacity: 0.5,
            filter: 'blur(4px)', zIndex: 0
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Character Rig */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 60 100"
        style={{ zIndex: 1, overflow: 'visible' }}
        variants={bodyVariants}
        animate={currentMood}
        whileTap={{ scale: 0.9, y: 5 }}
      >
        {/* --- LEGS --- */}
        <path d="M20 70 L20 95" stroke="#333" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 70 L40 95" stroke="#333" strokeWidth="6" strokeLinecap="round" />

        {/* --- TORSO --- */}
        <path 
          d="M15 50 Q30 90 45 50 L45 40 Q30 35 15 40 Z" 
          fill={config.outfitColor} 
          stroke="#333" 
          strokeWidth="2" 
        />

        {/* --- HEAD GROUP (Sways independently) --- */}
        <motion.g variants={headVariants} style={{ originX: "30px", originY: "40px" }}>
          {/* Hair Back */}
          <circle cx="30" cy="30" r="22" fill={config.hairColor} />

          {/* Face */}
          <circle cx="30" cy="32" r="18" fill={config.skinTone} stroke="#333" strokeWidth="1.5" />

          {/* Hair Front (Bangs) */}
          <path d="M12 25 Q30 10 48 25" fill="none" stroke={config.hairColor} strokeWidth="8" strokeLinecap="round" />

          {/* Eyes (Blink Animation) */}
          <motion.g 
            animate={isBlinking ? "blink" : "idle"}
            variants={eyeVariants}
            style={{ originY: "32px" }}
          >
            <circle cx="24" cy="32" r="2.5" fill="#333" />
            <circle cx="36" cy="32" r="2.5" fill="#333" />
          </motion.g>

          {/* Mouth */}
          {config.mood === 'happy' || config.mood === 'excited' ? (
            <path d="M25 40 Q30 45 35 40" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M27 42 L33 42" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* Accessories */}
          {config.accessory === 'glasses' && (
            <g>
              <circle cx="24" cy="32" r="6" fill="rgba(255,255,255,0.3)" stroke="#333" strokeWidth="1" />
              <circle cx="36" cy="32" r="6" fill="rgba(255,255,255,0.3)" stroke="#333" strokeWidth="1" />
              <line x1="30" y1="32" x2="30" y2="32" stroke="#333" strokeWidth="1" />
            </g>
          )}
          {config.accessory === 'headphones' && (
            <path d="M10 32 Q10 5 30 5 Q50 5 50 32" fill="none" stroke="#333" strokeWidth="4" />
          )}
        </motion.g>

        {/* --- ARMS --- */}
        <path d="M15 45 Q5 60 10 70" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
        <path d="M45 45 Q55 60 50 70" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
      </motion.svg>
    </Box>
  );
};
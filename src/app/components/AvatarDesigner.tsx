import React, { useState } from 'react';
import { X, Check, Glasses, Headphones, Smile, Zap, User } from 'lucide-react';
import { AbstractAvatar, AvatarConfig } from './AbstractAvatar';

interface AvatarDesignerProps {
  initialConfig?: AvatarConfig;
  onSave: (config: AvatarConfig) => void;
  onClose: () => void;
}

export const AvatarDesigner: React.FC<AvatarDesignerProps> = ({ initialConfig, onSave, onClose }) => {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig || {
    skinTone: '#F5D0C5',
    hairColor: '#4A3B2A',
    outfitColor: '#FFD93D',
    accessory: 'none',
    mood: 'happy'
  });

  const skinTones = ['#F5D0C5', '#E0AC69', '#C68642', '#8D5524', '#5F3C1D'];
  const outfitColors = ['#FFD93D', '#FF6B6B', '#4ECDC4', '#95A5A6', '#A8E6CF'];

  return (
    <div className="bg-white w-full max-w-md rounded-3xl p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Design Your Avatar</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Preview */}
      <div className="flex justify-center mb-8 py-8 bg-gray-50 rounded-2xl">
        <div className="transform scale-150">
          <AbstractAvatar config={config} isPulsing={false} scale={1.5} />
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Skin Tone */}
        <div>
          <label className="text-sm font-semibold text-gray-500 mb-3 block">Skin Tone</label>
          <div className="flex gap-3">
            {skinTones.map(c => (
              <button
                key={c}
                onClick={() => setConfig({ ...config, skinTone: c })}
                className={`w-8 h-8 rounded-full border-2 ${config.skinTone === c ? 'border-black scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Outfit Color */}
        <div>
          <label className="text-sm font-semibold text-gray-500 mb-3 block">Outfit</label>
          <div className="flex gap-3">
            {outfitColors.map(c => (
              <button
                key={c}
                onClick={() => setConfig({ ...config, outfitColor: c })}
                className={`w-8 h-8 rounded-full border-2 ${config.outfitColor === c ? 'border-black scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Accessories */}
        <div>
          <label className="text-sm font-semibold text-gray-500 mb-3 block">Accessory</label>
          <div className="flex gap-3">
            {[
              { id: 'none', icon: <div className="w-4 h-4 border-2 border-gray-400 rounded-full" /> },
              { id: 'glasses', icon: <Glasses size={20} /> },
              { id: 'headphones', icon: <Headphones size={20} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setConfig({ ...config, accessory: item.id as any })}
                className={`p-3 rounded-xl border ${config.accessory === item.id ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onSave(config)}
        className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
      >
        <Check className="w-5 h-5" /> Save Avatar
      </button>
    </div>
  );
};

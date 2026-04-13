import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const SpotlightOverlay = () => {
  const { showSpotlight, dismissSpotlight } = useTheme();
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    if (showSpotlight) {
      // Find the theme toggle button
      const timer = setTimeout(() => {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
          const rect = btn.getBoundingClientRect();
          setTargetRect(rect);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showSpotlight]);

  if (!showSpotlight || !targetRect) return null;

  const centerX = targetRect.left + targetRect.width / 2;
  const centerY = targetRect.top + targetRect.height / 2;
  const spotlightRadius = 40;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999]"
        onClick={dismissSpotlight}
      >
        {/* Dark overlay with spotlight hole */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <circle
                cx={centerX}
                cy={centerY}
                r={spotlightRadius}
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.85)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {/* Glowing ring around spotlight */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(129, 140, 248, 0.3)',
              '0 0 40px rgba(129, 140, 248, 0.6)',
              '0 0 20px rgba(129, 140, 248, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute rounded-full border-2 border-indigo-400/50"
          style={{
            left: centerX - spotlightRadius,
            top: centerY - spotlightRadius,
            width: spotlightRadius * 2,
            height: spotlightRadius * 2,
          }}
        />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute z-10"
          style={{
            left: centerX - 100,
            top: centerY + spotlightRadius + 16,
          }}
        >
          <div className="bg-white rounded-xl px-5 py-3 shadow-xl text-center min-w-[200px] relative">
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
            <p className="text-sm font-semibold text-gray-800 relative z-10">
              Choose your vibe ✨
            </p>
            <p className="text-xs text-gray-500 mt-1 relative z-10">
              Click to pick your theme
            </p>
          </div>
        </motion.div>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={dismissSpotlight}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
        >
          Skip →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpotlightOverlay;

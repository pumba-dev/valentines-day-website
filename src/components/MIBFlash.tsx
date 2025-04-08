import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const FlashOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteFlash = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10000;
`;

const GifContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MIBFlashProps {
  onComplete: () => void;
}

const MIBFlash: React.FC<MIBFlashProps> = ({ onComplete }) => {
  const [showFlash, setShowFlash] = useState(false);
  const gifLoaded = useRef(false);
  const gifStartTime = useRef<number | null>(null);

  useEffect(() => {
    // Load Tenor embed script
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Function to handle GIF load
    const handleGifLoad = () => {
      gifLoaded.current = true;
      gifStartTime.current = Date.now();
      
      // The Men in Black neuralyzer GIF is approximately 2 seconds
      const gifDuration = 4720; // seconds in milliseconds
      
      // Show flash right after the GIF finishes
      const flashTimer = setTimeout(() => {
        setShowFlash(true);
      }, gifDuration);
      
      // Complete after flash
      const completeTimer = setTimeout(() => {
        onComplete();
      }, gifDuration + 1100); // GIF duration + second for flash
      
      return () => {
        clearTimeout(flashTimer);
        clearTimeout(completeTimer);
      };
    };

    // Set up a MutationObserver to detect when the GIF is loaded
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const gifElement = document.querySelector('.tenor-gif-embed iframe');
          if (gifElement && !gifLoaded.current) {
            handleGifLoad();
          }
        }
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback timer in case the GIF doesn't load properly
    const fallbackTimer = setTimeout(() => {
      if (!gifLoaded.current) {
        handleGifLoad();
      }
    }, 1000);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
      document.body.removeChild(script);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <FlashOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GifContainer>
          <div 
            className="tenor-gif-embed" 
            data-postid="5202690" 
            data-share-method="host" 
            data-aspect-ratio="1.33333" 
            data-width="100%"
            style={{ width: '100%', height: '100%' }}
          />
        </GifContainer>
        <AnimatePresence>
          {showFlash && (
            <WhiteFlash
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
            />
          )}
        </AnimatePresence>
      </FlashOverlay>
    </AnimatePresence>
  );
};

export default MIBFlash; 
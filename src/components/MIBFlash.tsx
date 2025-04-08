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

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

interface MIBFlashProps {
  onComplete: () => void;
}

const MIBFlash: React.FC<MIBFlashProps> = ({ onComplete }) => {
  const [showFlash, setShowFlash] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoEnded = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Função para lidar com o fim do vídeo
    const handleVideoEnd = () => {
      if (videoEnded.current) return; // Evita múltiplas execuções
      videoEnded.current = true;
      
      // Mostra o flash imediatamente após o vídeo terminar
      setShowFlash(true);
      
      // Completa após o flash
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1000); // 1 segundo para o flash
      
      return () => {
        clearTimeout(completeTimer);
      };
    };

    // Adiciona o evento de fim do vídeo
    video.addEventListener('ended', handleVideoEnd);
    
    // Inicia a reprodução do vídeo
    video.play().catch(error => {
      console.error('Erro ao reproduzir o vídeo:', error);
      // Fallback: se o vídeo não puder ser reproduzido, mostra o flash e completa
      handleVideoEnd();
    });

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
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
        <VideoContainer>
          <Video 
            ref={videoRef}
            src="/willsmith.mp4"
            playsInline
            muted
          />
        </VideoContainer>
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
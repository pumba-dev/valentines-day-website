import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MIBFlash from '../components/MIBFlash';

const Container = styled.div`
  text-align: center;
  padding: 1rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const MessageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Message = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 1.8rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

const Question = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const ResponseButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff80ab, #ff4081);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  width: 80%;
  max-width: 300px;
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  
  @media (max-width: 768px) {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.1rem;
    font-size: 0.9rem;
    width: 90%;
  }
`;

const HiddenButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #ff4081;
  cursor: pointer;
  font-size: 0.9rem;
  opacity: 0.5;
  transition: opacity 0.3s;
  z-index: 100;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    top: 10px;
    right: 10px;
  }

  &:hover {
    opacity: 1;
  }
`;

const EasterEggMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 90%;
  width: auto;
  cursor: pointer;
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const Heart = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: #ff4081;
  pointer-events: none;
`;

const FooterMessage = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  font-size: 0.6rem;
  color: rgba(255, 64, 129, 0.6);
  font-family: 'Poppins', sans-serif;
  opacity: 0.7;
  transition: opacity 0.3s;
  cursor: default;
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const BookScene = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const BookContent = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const BookTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BookText = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #4a4a4a;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const BookButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff80ab, #ff4081);
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  
  @media (max-width: 480px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const TribunalScene = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
  padding: 2rem;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TribunalContent = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const TribunalTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  color: #ff4081;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const TribunalText = styled(motion.p)`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: white;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const TribunalButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff80ab, #ff4081);
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  
  @media (max-width: 480px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ArgumentContainer = styled(motion.div)`
  margin-top: 2rem;
`;

const MessagePage = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showMIBFlash, setShowMIBFlash] = useState(false);
  const [showBookScene, setShowBookScene] = useState(false);
  const [showTribunal, setShowTribunal] = useState(false);
  const [currentArgument, setCurrentArgument] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const navigate = useNavigate();

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  const handleEasterEggClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHearts(prev => [...prev, { id: Date.now(), x, y }]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== Date.now()));
    }, 2000);
  };

  const handleHiddenButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEasterEgg(true);
  };

  const handleOutsideClick = () => {
    if (showEasterEgg) {
      setShowEasterEgg(false);
    }
  };

  useEffect(() => {
    if (showEasterEgg) {
      document.addEventListener('click', handleOutsideClick as any);
      return () => {
        document.removeEventListener('click', handleOutsideClick as any);
      };
    }
  }, [showEasterEgg]);

  const handleResponse = (response: string) => {
    if (response === 'sim') {
      setShowBookScene(true);
    } else if (response === 'talvez') {
      setShowTribunal(true);
    } else if (response === 'nao') {
      setShowMIBFlash(true);
    }
  };

  const handleMIBComplete = () => {
    setShowMIBFlash(false);
    navigate('/');
  };

  const handleBookClose = () => {
    setShowBookScene(false);
    window.location.href = 'https://www.ingresso.com/filme/um-filme-minecraft';
  };

  const handleTribunalClose = () => {
    setShowTribunal(false);
    setCurrentArgument(0);
  };

  const handlePresentArguments = () => {
    setCurrentArgument(prev => prev + 1);
  };

  const tribunalArguments = [
    "Gosta de treinar? Posso ser o parceiro que te ajuda quando você estiver perto da falha... Além das melhores comidas, claro. 💪",
    "Se você curte filme e pipoca, já sei onde pode começar nosso primeiro episódio. 😅",
    "Se faltar dupla no vôlei, pode contar comigo. Vou te dar sempre cobertura. 😎",
    "Seu PC deu problema? Relaxa. Eu apareço mais rápido que o Chrome abrindo 37 abas sem avisar. 🐢",
    "Se você estiver triste, prometo fazer de tudo para que seu sorriso volte. 😝",
  ];

  return (
    <>
      <HiddenButton
        whileHover={{ scale: 1.1 }}
        onClick={handleHiddenButtonClick}
      >
        Ver o motivo por trás do site
      </HiddenButton>
      
      <Container onClick={handleBackgroundClick}>
        <MessageCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Message>
            Oi... sei que não nos conhecemos, e talvez seja um pouco estranho alguém criar um site só pra você. 
            Mas aqui estou, tentando te arrancar um sorriso.
          </Message>
          <Question>
            Será que eu, um cara meio maluco mas bem intencionado, posso te conhecer melhor?
          </Question>
          <ButtonContainer>
            <ResponseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleResponse('sim')}
            >
              Sim, quero te conhecer 😊
            </ResponseButton>
            <ResponseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleResponse('talvez')}
            >
              Talvez, me convença 👀
            </ResponseButton>
            <ResponseButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleResponse('nao')}
            >
              Não, mas fiquei lisonjeada 💙
            </ResponseButton>
          </ButtonContainer>
        </MessageCard>

        <AnimatePresence>
          {showEasterEgg && (
            <EasterEggMessage
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={handleEasterEggClick}
            >
              Me perdi no seu sorriso enquanto escrevia a funcionalidade desse botão
              {hearts.map(heart => (
                <Heart
                  key={heart.id}
                  initial={{ 
                    x: heart.x, 
                    y: heart.y, 
                    opacity: 1,
                    scale: 0
                  }}
                  animate={{ 
                    y: heart.y - 100,
                    opacity: 0,
                    scale: 1.5
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                >
                  ❤️
                </Heart>
              ))}
            </EasterEggMessage>
          )}
        </AnimatePresence>

        {showMIBFlash && <MIBFlash onComplete={handleMIBComplete} />}
      </Container>
      
      <FooterMessage>
        Criado com 90% coragem, 10% nervosismo e 100% verdade.
      </FooterMessage>
      
      <AnimatePresence>
        {showBookScene && (
          <BookScene
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookContent
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BookTitle>Se isso fosse um livro, seria o momento...</BookTitle>
              
              <BookText>
                "Ele não sabia se ela gostaria do que ele estava fazendo. Mesmo assim, tentou — só pra mostrar que, num mundo de relações superficiais, ainda existem tentativas sinceras."
              </BookText>
              
              <BookButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookClose}
              >
                Continuar a história 📖
              </BookButton>
            </BookContent>
          </BookScene>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showTribunal && (
          <TribunalScene
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TribunalContent>
              <TribunalTitle>Júri Popular</TribunalTitle>
              
              {currentArgument === 0 ? (
                <>
                  <TribunalText>
                    "O réu se declara: um romântico em tempos digitais."
                  </TribunalText>
                  <TribunalText>
                    "Quer provar que vale a pena ser conhecido."
                  </TribunalText>
                  <TribunalButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePresentArguments}
                  >
                    Apresentar argumentos
                  </TribunalButton>
                </>
              ) : (
                <ArgumentContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TribunalText>
                    {tribunalArguments[currentArgument - 1]}
                  </TribunalText>
                  
                  {currentArgument < tribunalArguments.length ? (
                    <TribunalButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePresentArguments}
                    >
                      Próximo argumento
                    </TribunalButton>
                  ) : (
                    <TribunalButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTribunalClose}
                    >
                      Então vamos tentar de novo?
                    </TribunalButton>
                  )}
                </ArgumentContainer>
              )}
            </TribunalContent>
          </TribunalScene>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessagePage; 
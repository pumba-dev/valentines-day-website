// import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  text-align: center;
  padding: 1rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  color: #4a4a4a;
  margin-bottom: 2rem;
  line-height: 1.4;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, #ff80ab, #ff4081);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.3);
  transition: transform 0.2s;
  width: 80%;
  max-width: 300px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    width: 90%;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Uma pergunta para a dona do sorriso mais lindo que já vi...
      </Title>
      <Button
        onClick={() => navigate('/message')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Pode clicar sem medo 😅
      </Button>
    </Container>
  );
};

export default HomePage; 
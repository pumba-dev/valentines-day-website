import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import HomePage from './pages/HomePage';
import MessagePage from './pages/MessagePage';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #fce4ec 0%, #e1bee7 100%);
    display: flex;
    flex-direction: column;
  }

  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

function App() {
  return (
    <Router>
      <Global styles={globalStyles} />
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/message" element={<MessagePage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 
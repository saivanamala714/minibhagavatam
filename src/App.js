import React from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Header from './components/Header';
import MainFeed from './components/MainFeed';
import BackgroundMusic from './components/BackgroundMusic';
import KrishnaOverlay from './components/KrishnaOverlay';
import ChatButton from './components/ChatButton';
import './App.css';

function App() {
  return (
    <DarkModeProvider>
      <div className="App">
        <Header />
        <div className="app-body">
          <MainFeed />
        </div>
        <BackgroundMusic />
        <KrishnaOverlay />
        <ChatButton />
      </div>
    </DarkModeProvider>
  );
}

export default App;

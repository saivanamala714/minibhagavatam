import React from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import MainFeed from './components/MainFeed';
import BackgroundMusic from './components/BackgroundMusic';
import KrishnaOverlay from './components/KrishnaOverlay';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
        <LeftSidebar />
        <MainFeed />
      </div>
      <BackgroundMusic />
      <KrishnaOverlay />
    </div>
  );
}

export default App;

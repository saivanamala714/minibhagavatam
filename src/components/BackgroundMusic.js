import React, { useState, useRef, useEffect } from 'react';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  // You can replace this with your own spiritual/devotional music file
  // For now, using a placeholder URL - you'll need to add actual music files to public/music/
  const musicTracks = [
    {
      name: "Hare Krishna Mantra",
      src: "/music/hare-krishna-mantra.mp3" // Add this file to public/music/
    },
    {
      name: "Om Namo Bhagavate",
      src: "/music/hare-krishna-mantra.mp3" // Add this file to public/music/
    }
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Check if audio file exists before trying to play
        audioRef.current.play().catch(error => {
          console.log("Audio play failed - this is normal if music files are not yet added:", error);
          // Show user-friendly message
          alert("Background music files not found. Please add spiritual music files to the public/music folder. See public/music/README.md for instructions.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % musicTracks.length;
    setCurrentTrack(next);
    if (isPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handleAudioEnd = () => {
    nextTrack();
  };

  return (
    <div className="background-music">
      <audio
        ref={audioRef}
        loop={false}
        onEnded={handleAudioEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={musicTracks[currentTrack].src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div 
        className={`music-controls ${showControls ? 'expanded' : ''}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="music-toggle" onClick={togglePlay}>
          <span className="music-icon">
            {isPlaying ? '🔊' : '🔇'}
          </span>
        </div>

        {showControls && (
          <div className="music-panel">
            <div className="track-info">
              <span className="track-name">{musicTracks[currentTrack].name}</span>
            </div>
            
            <div className="music-buttons">
              <button onClick={togglePlay} className="play-pause-btn">
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button onClick={nextTrack} className="next-btn">
                ⏭️
              </button>
            </div>

            <div className="volume-control">
              <span className="volume-icon">🔉</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusic;

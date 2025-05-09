import { useState, useRef, useEffect } from 'react';
import poems from './poems';
import './App.css';

import music1 from './assets/Le-cygne.mp3';
import music2 from './assets/untamed_ost.mp3';
import music3 from './assets/Mozart.mp3';
import music4 from './assets/Interlude_Dawn.mp3';
import music5 from './assets/VivaldiSpring.mp3';

const tracks = [music1, music2,music3,music4,music5];

function App() {
  const [poem, setPoem] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Pick a random track once on mount
  const randomTrackRef = useRef(null);
  useEffect(() => {
    randomTrackRef.current = tracks[Math.floor(Math.random() * tracks.length)];
  }, []);

  const generatePoem = () => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    setPoem(poems[randomIndex]);

    // Start music only if not already started
    if (!audioRef.current) {
      const audio = new Audio(randomTrackRef.current);
      audio.loop = true;
      audio.volume = 1;
      audio.muted = isMuted;
      audio.play();
      audioRef.current = audio;
    } else {
      // If already created, just play (in case it was paused)
      audioRef.current.play();
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      const currentlyMuted = audioRef.current.muted;
      audioRef.current.muted = !currentlyMuted;
      setIsMuted(!currentlyMuted);
    }
  };

  return (
    <div className="app">
      {/* Music Toggle Button */}
      <button onClick={toggleMusic} className="music-button" title="Toggle Music">
        {isMuted ? '🔇' : '🎵'}
      </button>

      {/* Title */}
      <h1 className="title">The Labyrinth</h1>

      {/* Poem Display */}
      {poem && (
        <div className="poem-box">
          {poem.map((line, index) => (
            <span key={index} className="poem-line">
              {line}
              {line === '' ? <br /> : <><br /><br /></>}
            </span>
          ))}
        </div>
      )}

      {/* Generate Button */}
      <button onClick={generatePoem} className="generate-button">
        Generate
      </button>
    </div>
  );
}

export default App;

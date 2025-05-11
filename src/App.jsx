import { useState, useRef, useEffect } from 'react';
import poems from './poems';
import './App.css';
import SettingsModal from './SettingsModal';

import music1 from './assets/Le-cygne.mp3';
import music2 from './assets/untamed_ost.mp3';
import music3 from './assets/Mozart.mp3';
import music4 from './assets/Interlude_Dawn.mp3';
import music5 from './assets/VivaldiSpring.mp3';
import music6 from './assets/Genshin-Morning.mp3';
import music7 from './assets/Genshin-Noon.mp3';
import music8 from './assets/Genshin-eve.mp3';
import music9 from './assets/Genshin-night.mp3';

import bg1 from './assets/bg1.jpeg';
import bg2 from './assets/bg2.jpeg';
import bg3 from './assets/bg3.jpeg';
import bg4 from './assets/bg4.jpeg';
import bg5 from './assets/bg5.jpeg';
import bg6 from './assets/bg6.jpeg';
import bg7 from './assets/bg7.jpeg';
import bg8 from './assets/bg8.jpeg';
import bg9 from './assets/bg9.jpeg';

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
const tracks = [
  { name: "Le cygne", src: music1 },
  { name: "Untamed OST", src: music2 },
  { name: "Mozart", src: music3 },
  { name: "Interlude Dawn", src: music4 },
  { name: "Vivaldi Spring", src: music5 },
  { name: "Genshin-Morn", src: music6 },
  { name: "Genshin-Noon", src: music7 },
  { name: "Genshin-Eve", src: music8 },
  { name: "Genshin-Night", src: music9 }
];


function App() {
  const [poem, setPoem] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [currentBg, setCurrentBg] = useState(backgrounds[0]);
  const audioRef = useRef(null);

  // Play music when currentTrack changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(currentTrack);
    audio.loop = true;
    audio.volume = 1;
    audio.muted = isMuted;
    audio.play();
    audioRef.current = audio;
    return () => audio.pause();
    // eslint-disable-next-line
  }, [currentTrack]);

  // Mute/unmute when isMuted changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const generatePoem = () => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    setPoem(poems[randomIndex]);
    // Play music if not already playing
    if (!audioRef.current) {
      const audio = new Audio(currentTrack);
      audio.loop = true;
      audio.volume = 1;
      audio.muted = isMuted;
      audio.play();
      audioRef.current = audio;
    } else {
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
    <div
      className="app"
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        transition: 'background-image 0.5s'
      }}
    >
      {/* Modal Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="settings-btn"
        title="Settings"
      >
        ⚙️
      </button>

      {/* Music Toggle Button */}
      <button onClick={toggleMusic} className="music-button" title="Toggle Music">
        {isMuted ? '🔇' : '🎵'}
      </button>

      {/* Title */}
      <h1 className="title">Labyrinth</h1>

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

      {/* Settings Modal */}
      <SettingsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        tracks={tracks}
        currentTrack={currentTrack}
        setTrack={setCurrentTrack}
        backgrounds={backgrounds}
        currentBg={currentBg}
        setBg={setCurrentBg}
      />
    </div>
  );
}

export default App;

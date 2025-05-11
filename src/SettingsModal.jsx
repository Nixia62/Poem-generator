import React from 'react';
import './SettingsModal.css';

export default function SettingsModal({
  open,
  onClose,
  tracks,
  currentTrack,
  setTrack,
  backgrounds,
  currentBg,
  setBg
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        
        <h3>Change Music</h3>
        <ul>
          {tracks.map((track, idx) => (
            <li
              key={idx}
              className={currentTrack === track.src ? 'active' : ''}
              onClick={() => setTrack(track.src)}
            >
              {track.name}
            </li>
          ))}
        </ul>
        
        <hr />
        
        <h3>Change Background</h3>
        <div className="bg-grid">
          {backgrounds.map((bg, idx) => (
            <div
              key={idx}
              className={`bg-grid-item${currentBg === bg ? ' active' : ''}`}
              onClick={() => setBg(bg)}
            >
              <img src={bg} alt={`bg${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

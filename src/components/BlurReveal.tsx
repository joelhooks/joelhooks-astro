import { useState } from 'react';

interface BlurRevealProps {
  src: string;
  alt: string;
}

export default function BlurReveal({ src, alt }: BlurRevealProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <figure 
      onClick={() => setRevealed(true)}
      style={{ 
        cursor: revealed ? 'default' : 'pointer',
        position: 'relative',
        margin: '2rem auto',
        maxWidth: '400px'
      }}
    >
      <img 
        src={src} 
        alt={alt}
        style={{ 
          width: '100%',
          filter: revealed ? 'none' : 'blur(15px)',
          transition: 'filter 0.4s ease',
          borderRadius: '8px'
        }}
      />
      {!revealed && (
        <figcaption style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: 500,
          textShadow: '0 1px 3px rgba(0,0,0,0.6)'
        }}>
          Tap to reveal
        </figcaption>
      )}
    </figure>
  );
}

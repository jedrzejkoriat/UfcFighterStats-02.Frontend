// src/components/Flag.tsx
import React from 'react';
import flagsMap from '../../utils/flagsMap';

interface FlagProps {
  country: string | null;
}

const Flag: React.FC<FlagProps> = ({ country }) => {
  if (!country) return <div></div>;

  const flagSrc = flagsMap[country];
  if (!flagSrc) return <div></div>;

  return (
    <img
      src={flagSrc}
      alt={`Flaga ${country}`}
      style={{
        border: '1px solid black',  // czarna cienka linia
        borderRadius: '2px',         // opcjonalnie lekko zaokrąglone rogi, jeśli chcesz
        maxWidth: '100%',            // żeby obrazek nie wychodził poza kontener
        height: 'auto',
      }}
    />
  );
};

export default Flag;
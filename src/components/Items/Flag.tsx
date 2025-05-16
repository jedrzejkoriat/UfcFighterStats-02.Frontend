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
        border: '1px solid black',
        borderRadius: '2px', 
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

export default Flag;
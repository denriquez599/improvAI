import React from 'react';
import WhiteKey from './WhiteKey';
import BlackKey from './BlackKey';
import Octave from './Octave';

const Piano: React.FC = () => {
  return (
    <div className="flex flex-row h-1/2 mx-4 bg-gray-200 border border-gray-400 rounded-md shadow-md">
      <Octave/>
      <Octave/>
      <Octave/>
      <Octave/>
      <Octave/>
      <Octave/>
      <Octave/>
    </div>
  );
};

export default Piano;

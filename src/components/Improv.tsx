import React, { useState } from 'react';
import ListeningIndicator from './ListeningIndicator';
import MidiInput from './MidiInput';

interface ImprovProps {}

const Improv: React.FC<ImprovProps> = () => {
  const [isListening, setIsListening] = useState(false);
  const [showCircles, setShowCircles] = useState(false);

  const handleImproviseClick = () => {
    setIsListening(true);
    setShowCircles(false); // Hide circles when starting to listen
  };

  const handleListeningComplete = () => {
    setIsListening(false);
    setShowCircles(true); // Show circles after listening is done
  };

  const userImage = 'https://via.placeholder.com/50';
  const userName = 'David';
  const imageUrl = 'trueBlue.jpg';
  const title = 'True Blue';
  const artist = 'Tina Brooks';

  return (
    <div className="items-center w-full h-full justify-center">
      <div className="flex flex-col items-center justify-center bg-gradient-to-b w-full from-spotifyGrey text-white">
        <header className="flex justify-between w-full p-4">
          <button className="text-white"></button>
          <div className="flex items-center space-x-2">
            <img src={userImage} alt={userName} className="w-8 h-8 rounded-full" />
            <span>{userName}</span>
          </div>
        </header>
<div className='flex flex-row'>
    <div className="flex flex-col items-center justify-center mt-10 space-y-4 bg-spotifyGrey h-full rounded-lg p-8 shadow-lg max-w-lg">
          <img src={imageUrl} alt={title} className="rounded-md w-64 h-64" />
          <div className="text-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-400">{artist}</p>
          </div>
          <div className="text-3xl font-bold text-white">
            <MidiInput isListening={isListening}/>
          </div>
          <div className="flex items-center justify-center">
            {!isListening && (
              <button
                className="px-8 py-4 bg-spotifyGrey hover:bg-spotifyLightGrey border border-white text-white text-2xl rounded-md"
                onClick={handleImproviseClick}
              >
                Improvise
              </button>
            )}
            {isListening && <ListeningIndicator onListeningComplete={handleListeningComplete} setIsListening={setIsListening} />}
          </div>
          
        </div>
        {showCircles && (
        <div className="flex flex-col justify-center capitalize items-center ml-8">
          <div className="flex space-x-4 mb-2">
            {["musicality", "rhythm", "originality"].map((word) => (
              <div key={word} className="flex items-center flex-col justify-center w-36 h-36 border-2 rounded-full bg-transparent border-spotifyLightGrey">
                <span className="text-lg text-spotifyLightGrey">{word}</span>
                <span className='font-bold text-2xl'>8</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            {["tonality", "other"].map((word) => (
              <div key={word} className="flex items-center flex-col justify-center w-36 h-36 border-2 rounded-full border-spotifyLightGrey">
                <span className="text-spotifyLightGrey text-lg">{word}</span>
                <span className='font-bold text-2xl'>9</span>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
</div>
        
    </div>
  );
};

export default Improv;

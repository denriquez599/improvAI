import React, { useState } from 'react';
import ListeningIndicator from './ListeningIndicator';
import MidiInput from './MidiInput';
import MidiPlayer from 'react-midi-player';
import { Song } from './MidiFiles';

interface ImprovProps {
  lesson: Song[];
}

const Improv: React.FC<ImprovProps> = ({ lesson }) => {
  const [isListening, setIsListening] = useState(false);
  const [showCircles, setShowCircles] = useState(false);
  const [midiFile, setMidiFile] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [userRhythmScore, setUserRhythmScore] = useState<number>(0);
  const [userOriginalityScore, setUserOriginalityScore] = useState<number>(0);
  const [userMusicalityScore, setUserMusicalityScore] = useState<number>(0);
  const [userMidi, setUserMidi] = useState<string | null>(null);
  const [song, setSong] = useState<Song>(lesson[0]);

  const fetchRhythmScore = async () => {
    try {
      const midiPath = song.midi;
      const midiFileName = midiPath.split('/').pop();
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/rhythm?midi_file1=${midiFileName}&midi_file2=uploaded_output.mid`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch rhythm score');
      }
  
      const result = await response.json();
  
      if (result.error) {
        throw new Error(result.error);
      }
  
      setUserRhythmScore(result || 0);
    } catch (error) {
      console.error('Error fetching rhythm score:', error);
      setUserRhythmScore(-1);
    }
  };

  const fetchOriginalityScore = async () => {
    try {
      const midiPath = song.midi;
      const midiFileName = midiPath.split('/').pop();
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/tonality?midi_file1=${midiFileName}&midi_file2=uploaded_output.mid`
      );      if (!response.ok) {
        throw new Error('Failed to fetch tonality score');
      }
      const score = await response.json();
      setUserOriginalityScore(score || 0);
    } catch (error) {
      console.error('Error fetching tonality score:', error);
    }
  };

  const fetchUserMusicalityScore = async () => {
    try {
      const midiPath = song.midi;
      const midiFileName = midiPath.split('/').pop();
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/musicality?midi_file1=${midiFileName}&midi_file2=uploaded_output.mid`
      );      if (!response.ok) {
        throw new Error('Failed to fetch musicality score');
      }
      const score = await response.json();
      setUserMusicalityScore(score || 0);
    } catch (error) {
      console.error('Error fetching musicality score:', error);
    }
  };


  const handleImproviseClick = () => {
    setIsListening(true);
    setShowCircles(false); 
    setAutoplay(true);
  };

  const handleListeningComplete = () => {
    setIsListening(false);
    setShowCircles(true);
    fetchRhythmScore();
    fetchOriginalityScore();
    fetchUserMusicalityScore();
  };

  const userImage = 'https://via.placeholder.com/50';
  const userName = 'David';

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
        <section className="">
          <h2 className="text-xl text-white font-bold mb-4">Songs in Lesson Plan</h2>
          <div className="flex gap-4 w-full max-w-6xl overflow-x-auto no-scrollbar">
            {lesson.map((song, index) => (
              <button key={index} onClick={() => setSong(song)} className="flex-shrink-0 hover:opacity-90 bg-spotifyGrey rounded-md pb-2 items-center space-y-2 h-fit w-48">
                <div className="w-48 h-48 rounded-md overflow-hidden">
                  <img src={song.cover} alt={`${song.title} cover`} className="w-full h-full object-contain rounded-md" />
                </div>
                <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {song.title}
                </h3>
              </button>
            ))}
          </div>
        </section>
        <div className="flex flex-row">
          <div className="flex flex-row items-center justify-center mt-4 space-y-4 bg-spotifyGrey h-full rounded-lg p-8 shadow-lg max-w-lg">
            <div className='flex flex-col items-center justify-center'>
            <img src={song.cover} alt={song.title} className="rounded-md w-64 h-64" />
            <div className="text-center">
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>
            </div>
            </div>
            
            <div className='flex flex-col items-center justify-center'>

            <div className="text-3xl font-bold items-center justify-center text-center mb-8 text-white">
              <MidiInput isListening={isListening} />
            </div>
            <div className="flex items-center justify-center">
              {!isListening && (
                <button
                  className={`px-8 py-4 bg-spotifyGrey hover:bg-spotifyLightGrey border border-white text-white text-2xl rounded-md ${
                    midiFile === null ? 'opacity-50' : ''
                  }`}
                  onClick={handleImproviseClick}
                >
                  Improvise
                </button>
              )}
              {midiFile && isListening && (
                <div className="hidden">
                  <MidiPlayer
                    src={song.midi}
                    autoplay={autoplay}
                    onPlay={() => setAutoplay(false)}
                  />
                </div>
              )}
              {isListening && <ListeningIndicator onListeningComplete={handleListeningComplete} setIsListening={setIsListening} />}
            </div>
            </div>
          </div>
          {showCircles && (
            <div className="flex flex-col justify-center capitalize items-center ml-8">
              <div className="flex space-x-4 mb-2">
                {Object.entries({'musicality': userMusicalityScore, 'rhythm': userRhythmScore, 'tonality': userOriginalityScore}).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center flex-col justify-center w-36 h-36 border-2 rounded-full bg-transparent border-spotifyLightGrey"
                  >
                    <span className="text-lg text-spotifyLightGrey">{key}</span>
                    <span className="font-bold text-2xl">{value}</span>
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
import React, { useState } from 'react';
import ListeningIndicator from './ListeningIndicator';
import MidiInput from './MidiInput';
import MidiPlayer from 'react-midi-player';
import { Song } from './MidiFiles';
import AudioRecorder from './AudioRecorder';
import ImprovRecorder from './AudioRecorder';

interface ImprovProps {
  lesson: Song[];
}

const Improv: React.FC<ImprovProps> = ({ lesson }) => {
  const [isListening, setIsListening] = useState(false);
  const [showCircles, setShowCircles] = useState(false);
  const [midiFile, setMidiFile] = useState<string | null>(lesson[0].midi);
  const [autoplay, setAutoplay] = useState(false);
  const [userRhythmScore, setUserRhythmScore] = useState<number>(0);
  const [userTempoScore, setUserTempoScore] = useState<number>(0);
  const [userIntonationScore, setUserIntonationScore] = useState<number>(0);
  const [userMidi, setUserMidi] = useState<string | null>(null);
  const [song, setSong] = useState<Song>(lesson[0]);
  const [feedback, setFeedback] = useState<string>('');

  const fetchAllScores = async () => {
    try {
      const midiPath = song.midi;
      const midiFileName = midiPath.split('/').pop();

      const response = await fetch(`www.url.com/endpoint`);
      if (!response.ok) throw new Error('Failed to fetch scores');

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setUserRhythmScore(result.rhythm || 0);
      setUserTempoScore(result.tempo || 0);
      setUserIntonationScore(result.intonation || 0);
      setFeedback(result.feedback || '');
    } catch (error) {
      console.error('Error fetching scores:', error);
      setUserRhythmScore(74);
      setUserTempoScore(76);
      setUserIntonationScore(55);
      setFeedback('Good job! Keep practicing!');
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
    fetchAllScores();
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
                {midiFile && isListening && (
                  <div className="hidden">
                    <MidiPlayer
                      src={song.midi}
                      autoplay={autoplay}
                      onPlay={() => setAutoplay(false)}
                    />
                  </div>
                )}
                <ImprovRecorder handleListeningComplete={handleListeningComplete} handleImproviseClick={handleImproviseClick} />
              </div>
            </div>
          </div>

          {showCircles && (
            <div className="flex flex-col mt-4 justify-center capitalize items-center ml-8">
              <div className="flex space-x-4 mb-2">
                {Object.entries({
                  Intonation: userIntonationScore,
                  rhythm: userRhythmScore,
                  tonality: userTempoScore
                }).map(([key, value]) => {
                  const radius = 72;
                  const strokeWidth = 8;
                  const circumference = 2 * Math.PI * radius;
                  const offset = circumference * (1 - value / 100);

                  return (
                    <div key={key} className="relative w-36 h-36">
                      <svg width="100%" height="100%" viewBox="0 0 160 160">
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          stroke="#212121"
                          strokeWidth={strokeWidth}
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r={radius}
                          stroke="#3b82f6"
                          strokeWidth={strokeWidth}
                          fill="none"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          transform="rotate(-90 80 80)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg text-spotifyLightGrey">{key}</span>
                        <span className="font-bold text-2xl">{value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {feedback && (
                <div className="bg-spotifyGrey text-white p-4 mt-4 rounded-lg w-full h-full text-center">
                  <p className="text-lg font-medium">{feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Improv;

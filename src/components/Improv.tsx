import React, { useState } from 'react';
import ListeningIndicator from './ListeningIndicator';
import MidiInput from './MidiInput';
// import MidiPlayer from 'react-midi-player';
import CustomMidiPlayer from './CustomMidiPlayer';
import { Song } from './MidiFiles';
import ImprovRecorder from './AudioRecorder';

interface ImprovProps {
  song: Song;
  setSong: (song: Song) => void;
}

const Improv: React.FC<ImprovProps> = ({ song, setSong }) => {
  const [isListening, setIsListening] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [midiFile, setMidiFile] = useState<string | null>(song.midi);
  const [userRhythmScore, setUserRhythmScore] = useState<number>(0);
  const [userIntonationScore, setUserIntonationScore] = useState<number>(0);
  const [userOverallScore, setUserOverallScore] = useState<number>(0);
  const [userTempoScore, setUserTempoScore] = useState<number>(0);
  const [userTextResults, setUserTextResults] = useState<string>("");
  const [songIsPlaying, setSongIsPlaying] = useState(false);

  const handleImproviseClick = () => {
    setIsListening(true);
    setSongIsPlaying(true);
    setShowOutput(false);
  };

  const updateScores = (response: any) => {
    console.log("Updating scores with response:", response)
    setUserRhythmScore(parseFloat(response.rhythm.toFixed(2)))
    setUserIntonationScore(parseFloat(response.intonation.toFixed(2)));
    setUserOverallScore(parseFloat(response.overall_score.toFixed(2)));
    setUserTempoScore(parseFloat(response.tempo.toFixed(2)));
    const prettyFeedback = JSON.stringify(response.feedback, null, 2);
    setUserTextResults(prettyFeedback)
  };

  const handleListeningComplete = (response: any) => {
    setIsListening(false);
    updateScores(response)
    setShowOutput(true);
  };

  const handlePlayingComplete = () => {
    setSongIsPlaying(false)
  }


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
        <div className="flex flex-row">
          <div className="flex flex-col items-center justify-center mt-10 space-y-4 bg-spotifyGrey h-full rounded-lg p-8 shadow-lg max-w-lg">
            <img src={song.cover} alt={song.title} className="rounded-md w-64 h-64" />
            <div className="text-center">
              <h2 className="text-lg font-semibold">{song.title}</h2>
              <p className="text-gray-400">{song.artist}</p>
            </div>
            <div className="text-3xl font-bold text-white">
              <MidiInput isListening={isListening} />
            </div>
            <div className="flex items-center justify-center">
              {midiFile && isListening && songIsPlaying && (
                <div className="hidden">
                  <CustomMidiPlayer
                    src={song.midi}
                    autoplay={true}
                    onPlay={() => console.log("Playback started")}
                    onStop={() => setSongIsPlaying(false)}
                  />
                </div>
              )}
              <ImprovRecorder
                handleListeningComplete={handleListeningComplete}
                handleImproviseClick={handleImproviseClick}
                handlePlayingComplete={handlePlayingComplete}
              />

            </div>
          </div>
          {showOutput && (
            <div className="flex flex-col justify-center capitalize items-center ml-8">
              <div className="flex space-x-4 mb-2">
                {Object.entries({ 'overall_score': userOverallScore, 'rhythm': userRhythmScore, 'intonation': userIntonationScore, 'tempo': userTempoScore }).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center flex-col justify-center w-36 h-36 border-2 rounded-full bg-transparent border-spotifyLightGrey"
                  >
                    <span className="text-lg text-spotifyLightGrey">{key}</span>
                    <span className="font-bold text-2xl">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-spotifyGrey rounded-lg shadow-md text-center h-1/2 text-white max-w-md">
                <span className="text-lg font-bold text-spotifyLightGrey block mb-2">
                  Here's what we think:
                </span>
                <div className='whitespace-nowrap overflow-y-scroll'>
                  <p className=''>{userTextResults || "No additional information available."}</p>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Improv;
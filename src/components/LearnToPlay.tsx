import React, { useState, useEffect, useRef } from 'react';
import { Song } from './MidiFiles';
import PerformanceRecorder from './PerformanceRecorder';

interface LearnToPlayProps {
    song: Song;
    setSong: (song: Song) => void;
}

const LearnToPlay: React.FC<LearnToPlayProps> = ({ song, setSong }) => {
    const [showJudgementOutput, setShowJudgementOutput] = useState(false);
    const [userRhythmScore, setUserRhythmScore] = useState<number>(0);
    const [userIntonationScore, setUserIntonationScore] = useState<number>(0);
    const [userOverallScore, setUserOverallScore] = useState<number>(0);
    const [userTempoScore, setUserTempoScore] = useState<number>(0);
    const [userTextResults, setUserTextResults] = useState<string>("");

    const [songIsPlaying, setSongIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // On startup, create the audioRef
    useEffect(() => {
        const audio = new Audio(song.wav);
        audioRef.current = audio;
    }, []);

    // What happens when songIsPlaying changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (songIsPlaying) {
            audio.play().catch((err) => console.error("Playback failed:", err));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [songIsPlaying]);

    // Call to play some metronome clicks based on a certain bpm and then do something
    const playMetronomeClicksAndStartSong = (
        tempo: number,
        beatsPerMeasure: number,
    ) => {
        const context = new (window.AudioContext || window.AudioContext)();

        fetch('/metronome.wav')
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
            .then((buffer) => {
                const intervalSec = 60 / tempo;
                const startTime = context.currentTime;

                for (let i = 0; i < beatsPerMeasure; i++) {
                    const click = context.createBufferSource();
                    click.buffer = buffer;
                    click.connect(context.destination);
                    click.start(startTime + i * intervalSec);
                }

                const endTime = startTime + beatsPerMeasure * intervalSec;

                const checkInterval = setInterval(() => {
                    if (context.currentTime >= endTime) {
                        clearInterval(checkInterval);
                        setSongIsPlaying(true);
                    }
                }, 10);
            })
    };

    // What happens when record is clicked
    const handleClickRecord = () => {
        setShowJudgementOutput(false);
        playMetronomeClicksAndStartSong(song.beatsPerMinute, song.beatsPerMeasure);
    };

    // Call to update score variables with response
    const updateScores = (response: any) => {
        setUserRhythmScore(parseFloat(response.rhythm.toFixed(2)))
        setUserIntonationScore(parseFloat(response.intonation.toFixed(2)));
        setUserOverallScore(parseFloat(response.overall_score.toFixed(2)));
        setUserTempoScore(parseFloat(response.tempo.toFixed(2)));
        const prettyFeedback = JSON.stringify(response.feedback, null, 2);
        setUserTextResults(prettyFeedback)
    };

    // What happens when judgement completes (score is update and output is shown)
    const handleJudgementComplete = (response: any) => {
        updateScores(response)
        setShowJudgementOutput(true);
    };

    // What to do when done recording stops (just want to stop music)
    const handleClickStopRecord = () => {
        setSongIsPlaying(false)
    }


    const userImage = 'davidImage.jpeg';
    const userName = 'David';


    return (
        <div className="items-center w-full h-full justify-center">
            <div className="flex flex-col items-center justify-center bg-gradient-to-b w-full from-spotifyGrey text-white">
                <header className="flex justify-between w-full p-4">
                    <h1 className="text-white items-center text-3xl">ImprovAI - Learn To Play</h1>
                    <button className="text-white"></button>
                </header>
                <div className="flex flex-row">
                    <div className="flex flex-col items-center justify-center mt-10 space-y-4 bg-spotifyGrey h-full rounded-lg p-8 shadow-lg max-w-lg">
                        <img src={song.cover} alt={song.title} className="rounded-md w-64 h-64" />
                        <div className="text-center">
                            <h2 className="text-lg font-semibold">{song.title}</h2>
                            <p className="text-gray-400">{song.artist}</p>
                        </div>

                        <div className="flex items-center justify-center">
                            <PerformanceRecorder
                                handleJudgementComplete={handleJudgementComplete}
                                handleClickRecord={handleClickRecord}
                                handleClickStopRecord={handleClickStopRecord}
                                feedbackEndpoint='http://127.0.0.1:8000/judge/song'
                            />
                        </div>

                    </div>
                    {showJudgementOutput && (
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
                            <div className="mt-4 p-4 bg-spotifyGrey rounded-lg shadow-md text-center text-white max-w-md w-full">
                                <span className="text-lg font-bold text-spotifyLightGrey block mb-2">
                                    Here's what we think:
                                </span>
                                <div className="whitespace-pre-wrap break-words">
                                    <p>{userTextResults || "No additional information available."}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LearnToPlay;
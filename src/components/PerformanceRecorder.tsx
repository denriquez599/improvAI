import React, { useState, useRef } from 'react';
import ListeningIndicator from './ListeningIndicator';
import useMidi from '../hooks/useMidi';
import { buildMidiFile, saveMidiFile } from '../utils/midiUtils';

interface PerformanceRecorderProps {
  handleClickRecord: () => void;
  handleJudgementComplete: (response: any) => void;
  handleClickStopRecord: () => void;
  feedbackEndpoint: string;
  songid: string;
}

const PerformanceRecorder: React.FC<PerformanceRecorderProps> = ({ handleClickRecord: handleClickRecord, handleJudgementComplete: handleJudgementComplete, handleClickStopRecord: handleRecordingComplete, feedbackEndpoint, songid }) => {
  const [useMidiInput, setUseMidiInput] = useState(false);

  const [recordingUsingMicrophone, setRecordingUsingMicrophone] = useState(false);
  const [recordingUsingMidi, setRecordingUsingMidi] = useState(false);

  const [busyCalculatingMetrics, setBusyCalculatingMetrics] = useState(false);

  const [isListeningIndicatorOn, setListeningIndicator] = useState(false);

  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { midiMessages, start: startMidi, stop: stopMidi } = useMidi();

  const sendBlobToApi = async (audioBlob: Blob, filename: string) => {
    console.log("Sending blob to API");

    setBusyCalculatingMetrics(true);
    const formData = new FormData();
    formData.append('file', audioBlob, filename);
    formData.append('song_id', songid)
    try {
      const response = await fetch(feedbackEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      handleJudgementComplete(result)
      setBusyCalculatingMetrics(false);
      console.log('Upload success:', result);
    } catch (err) {
      console.error('Error uploading audio:', err);
    }
  };

  const startRecordingUsingMicrophone = async () => {
    setShowDownloadButton(false);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setDownloadUrl(URL.createObjectURL(audioBlob));
      sendBlobToApi(audioBlob, "recording.wav");
    };

    mediaRecorderRef.current = mediaRecorder;

    setRecordingUsingMicrophone(true);
    setListeningIndicator(true);
    handleClickRecord();
    mediaRecorder.start();
  };

  const stopRecordingUsingMicrophone = () => {
    mediaRecorderRef.current?.stop();
    setRecordingUsingMicrophone(false);
    setListeningIndicator(false);
    setShowDownloadButton(true);
  };

  const startRecordingUsingMidi = () => {
    console.log("Recording using Midi")
    setShowDownloadButton(false);
    startMidi();
    setRecordingUsingMidi(true);
    setListeningIndicator(true);
    handleClickRecord();
  };

  const stopRecordingUsingMidi = () => {
    stopMidi();
    setRecordingUsingMidi(false);
    setListeningIndicator(false);
    setShowDownloadButton(true);

    if (midiMessages.length > 0) {
      console.log("MIDI messages recorded:", midiMessages.length);
      const midiBlob = buildMidiFile(midiMessages);
      setDownloadUrl(URL.createObjectURL(midiBlob));
      sendBlobToApi(midiBlob, "recording.mid");
    } else {
      console.log("No MIDI messages recorded.");
    }
  };


  const onListeningComplete = () => {
    handleRecordingComplete();

    if (useMidiInput) {
      stopRecordingUsingMidi();
    } else {
      stopRecordingUsingMicrophone();
    }

    setShowDownloadButton(true);
  };

  const toggleInputType = () => {
    const newValue = !useMidiInput;
    setUseMidiInput(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-spotifyGrey text-white w-full max-w-lg">

      {/* Toggle Switch for Input Type */}
      <div className="flex items-center">
        <span className="mr-2 text-white">
          Use MIDI Connection?
        </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={useMidiInput}
            onChange={toggleInputType}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="h-8" /> {/* 2rem of space */}

      {busyCalculatingMetrics && (
        <div className="w-80 px-6 py-3 mb-4 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded animate-pulse text-center">
          Getting feedback for your performance...
        </div>
      )}

      {!busyCalculatingMetrics && !recordingUsingMicrophone && !recordingUsingMidi && useMidiInput && (
        <button
          className="w-80 px-6 py-3 mb-4 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
          onClick={() => {
            startRecordingUsingMidi();
          }}
        >
          Start Recording Using MIDI
        </button>
      )}

      {!busyCalculatingMetrics && !recordingUsingMicrophone && !recordingUsingMidi && !useMidiInput && (
        <button
          className="w-80 px-6 py-3 mb-4 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
          onClick={() => {
            startRecordingUsingMicrophone();
          }}
        >
          Start Recording Using Microphone
        </button>
      )}

      {isListeningIndicatorOn && (
        <ListeningIndicator
          onListeningComplete={onListeningComplete}
          setIsListening={setListeningIndicator}
        />
      )}


      {showDownloadButton && downloadUrl && (
        <a
          href={downloadUrl}
          download={useMidiInput ? "recording.mid" : "recording.wav"}
          className="px-6 py-3 mt-4 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
        >
          Download Previous Recording
        </a>
      )}

    </div>

  );
};

export default PerformanceRecorder;
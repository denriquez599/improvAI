import React, { useState, useRef } from 'react';
import ListeningIndicator from './ListeningIndicator';

interface ImprovRecorderProps {
  handleImproviseClick: () => void;
  handleListeningComplete: () => void;
}

const ImprovRecorder: React.FC<ImprovRecorderProps> = ({ handleImproviseClick, handleListeningComplete }) => {
  const [recording, setRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      audioChunksRef.current.push(e.data);
    };

    const sendToApi = async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.wav');
        try {
          const response = await fetch('http://url.com/endpoint', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error('Upload failed');
          }
      
          const result = await response.json();
          console.log('Upload success:', result);
        } catch (err) {
          console.error('Error uploading audio:', err);
        }
      };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      sendToApi(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
    setIsListening(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    setIsListening(false);
  };

  const onListeningComplete = () => {
      stopRecording();
    };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-spotifyGrey text-white w-full max-w-lg">
      {!recording && (
        <button
          className="px-6 py-3 mb-4 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
          onClick={() => {
            startRecording();
            handleImproviseClick();
          }}
        >
          Improvise
        </button>
      )}

      {isListening && (
        <ListeningIndicator
          onListeningComplete={onListeningComplete}
          setIsListening={setIsListening}
        />
      )}
      {audioUrl && (
        <a
            href={audioUrl}
            download="recording.wav"
            className="px-6 py-3 mt-4 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
        >
            Download Recording
        </a>
    )}
    </div>
    
  );
};

export default ImprovRecorder;
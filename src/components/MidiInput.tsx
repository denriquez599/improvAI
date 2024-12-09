import React, { useState, useEffect } from 'react';
import useMidi, { MidiMessage } from '../pages/api/useMidi';

interface MidiInputProps {
  isListening: boolean;
}

const MidiInput: React.FC<MidiInputProps> = ({ isListening }) => {
  const { midiMessages } = useMidi();
  const [messageBuffer, setMessageBuffer] = useState<MidiMessage[]>([]);
  const [prevIsListening, setPrevIsListening] = useState<boolean>(isListening);

  const sendMidiToBackend = async (messages: MidiMessage[]) => {
    try {
      const normalizedTimestamp = messages[0]?.timestamp || 0;
      const response = await fetch('http://127.0.0.1:8000/api/v1/midi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map((msg) => ({
            data: Array.from(msg.data),
            timestamp: msg.timestamp - normalizedTimestamp, // Normalize timestamps
          })),
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to send MIDI data: ${response.statusText}`);
      }
      console.log('MIDI data sent successfully');
    } catch (error) {
      console.error('Failed to send MIDI data:', error);
    }
  };

  const notifyWriteMidi = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/midi-file', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('MIDI file written:', data);
    } catch (error) {
      console.error('Failed to write MIDI file:', error);
    }
  };

  useEffect(() => {
    if (midiMessages.length > 0) {
      setMessageBuffer((prev) => [...prev, ...midiMessages]);
    }
  }, [midiMessages]);

  useEffect(() => {
    if (prevIsListening && !isListening) {
      if (messageBuffer.length > 0) {
        sendMidiToBackend(messageBuffer).then(() => notifyWriteMidi());
        setMessageBuffer([]); // Clear buffer after sending
      }
    }
    setPrevIsListening(isListening);
  }, [isListening, prevIsListening, messageBuffer]);

  return (
    <div>
      <p>{isListening ? 'Recording MIDI...' : 'Not Recording'}</p>
    </div>
  );
};

export default MidiInput;
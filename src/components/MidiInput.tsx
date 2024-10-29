// src/MidiInput.tsx
import React, { useState, useEffect } from 'react';
import useMidi, { MidiMessage } from '../pages/api/useMidi';
import { getNoteName } from '../utils/midiUtils';

interface MidiInputProps {
  isListening: boolean;
}

const MidiInput: React.FC<MidiInputProps> = ({ isListening }) => {
  const { midiAccess, midiMessages } = useMidi();
  const [recentNote, setRecentNote] = useState<string | null>(null);

  const getNoteFromMessage = (message: MidiMessage): string | null => {
    if (message.data[0] === 144) { // Note On message
      const noteNumber = message.data[1];
      return getNoteName(noteNumber);
    }
    return null;
  };  

  // Effect to update recent note whenever midiMessages change
  useEffect(() => {
    if (midiMessages.length > 0) {
      const lastMessage = midiMessages[midiMessages.length - 1]; // Get the most recent message
      const note = getNoteFromMessage(lastMessage);
      console.log(note);
      if (note) {
        setRecentNote(note); // Update recent note state
      }
    }
  }, [midiMessages]); // Dependency array includes midiMessages

  return (
    <div>
      {!isListening && <p>{midiAccess?.inputs.size != 0 ? 'Connected.' : 'Connect MIDI device.'}</p>}
      <p>{isListening && recentNote}</p>
    </div>
  );
};

export default MidiInput;

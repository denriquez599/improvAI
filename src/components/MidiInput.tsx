// src/MidiInput.tsx
import React from 'react';
import useMidi, { MidiMessage } from '../pages/api/useMidi';
import { getNoteName } from '../utils/midiUtils';

const MidiInput: React.FC = () => {
  const { midiAccess, midiMessages, error } = useMidi();

  const getNoteFromMessage = (message: MidiMessage): string | null => {
    if (message.data[0] === 144) { // Note On message
      const noteNumber = message.data[1];
      return getNoteName(noteNumber);
    }
    return null;
  };  

  return (
    <div>
      <h1>MIDI Input</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {midiAccess ? (
        <p>MIDI Access obtained.</p>
      ) : (
        <p>No MIDI Access.</p>
      )}
      <ul>
        {midiMessages.map((message, index) => {
            const note = getNoteFromMessage(message);
            if (note) {
            return (
                <li key={index}>
                {`Timestamp: ${message.timestamp}, Note: ${note}`}
                </li>
            );
            }
            return null;
        })}
      </ul>
    </div>
  );
};

export default MidiInput;

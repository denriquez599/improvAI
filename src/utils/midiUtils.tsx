// src/midiUtils.ts
export const noteNames = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];
  
  export const getNoteName = (noteNumber: number): string => {
    const octave = Math.floor(noteNumber / 12) - 1;
    const note = noteNumber % 12;
    return `${noteNames[note]}${octave}`;
  };
import React, { useEffect, useState } from 'react';
import * as midiManager from 'midi-file'; // Ensure 'midi-file' library is installed

const MidiReader: React.FC = () => {
  const [midiData, setMidiData] = useState<any>(null);

  useEffect(() => {
    const fetchMidiFile = async () => {
      try {
        const response = await fetch('/55Dive.mid'); // Adjust path if necessary
        const buffer = await response.blob();
        const arrayBuffer = await new Response(buffer).arrayBuffer();
        const midiFile = midiManager.parseMidi(new Uint8Array(arrayBuffer));
        setMidiData(midiFile);
      } catch (error) {
        console.error('Error fetching MIDI file:', error);
      }
    };

    fetchMidiFile();
  }, []);

  if (!midiData) {
    return <p>Loading...</p>;
  }

  const getNoteName = (noteNumber: number): string => {
    const noteNames = [
      'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ];
    const octave = Math.floor(noteNumber / 12) - 1;
    const note = noteNumber % 12;
    return `${noteNames[note]}${octave}`;
  };

  const extractNoteData = () => {
    const trackData: { notes: string[]; instrument: string }[] = [];

    midiData.tracks.forEach((track: any[], trackIndex: number) => {
      let currentInstrument = 'Unknown Instrument';

      track.forEach((event: any) => {
        if (event.type === 'programChange') {
          currentInstrument = event.instrumentName || `Instrument ${event.programNumber}`;
        } else if (event.type === 'noteOn' && event.velocity > 0) {
          const noteName = getNoteName(event.noteNumber);
          trackData[trackIndex] = {
            notes: [...(trackData[trackIndex]?.notes || []), noteName],
            instrument: currentInstrument
          };
        }
      });
    });

    return trackData;
  };

  const trackData = extractNoteData();

  return (
    <div>
      <h1>MIDI Reader</h1>
      {trackData.map((track, index) => (
        <div key={index}>
          <h2>Track {index + 1}</h2>
          <p>Instrument: {track.instrument}</p>
          <ul>
            {track.notes.map((note, noteIndex) => (
              <li key={noteIndex}>{note}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MidiReader;

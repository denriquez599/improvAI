// src/utils/midiUtils.tsx
import { writeMidi, MidiData, MidiEvent } from 'midi-file';
import { MidiMessage } from '../hooks/useMidi';

export function buildMidiFile(messages: MidiMessage[]) {
  const startTime = messages[0]?.timestamp ?? 0;

  const track: MidiEvent[] = messages.map((msg, i) => {
    const deltaTime =
      i === 0
        ? 0
        : Math.floor(messages[i].timestamp - messages[i - 1].timestamp);

    // Determine event type based on status byte
    const statusByte = msg.data[0];
    const isNoteOn = (statusByte & 0xf0) === 0x90 && msg.data[2] > 0;
    const isNoteOff =
      (statusByte & 0xf0) === 0x80 || ((statusByte & 0xf0) === 0x90 && msg.data[2] === 0);
    const channel = statusByte & 0x0f;

    if (isNoteOn) {
      return {
        deltaTime,
        type: 'noteOn',
        channel,
        noteNumber: msg.data[1],
        velocity: msg.data[2],
      } as MidiEvent;
    }

    if (isNoteOff) {
      return {
        deltaTime,
        type: 'noteOff',
        channel,
        noteNumber: msg.data[1],
        velocity: msg.data[2],
      } as MidiEvent;
    }


    // Skip unsupported messages
    return {
      deltaTime,
      type: 'meta',
      subtype: 'unknown',
    } as any;
  }).filter((event): event is MidiEvent => event.subtype !== 'unknown');

  // Add end-of-track meta event
  track.push({
    deltaTime: 100,
    type: 'endOfTrack',
  });

  const midiData: MidiData = {
    header: {
      format: 1,
      numTracks: 1,
      ticksPerBeat: 480,
    },
    tracks: [track],
  };

  const midiBytes = writeMidi(midiData);
  return new Blob([new Uint8Array(midiBytes)], { type: 'audio/midi' });
}

export function saveMidiFile(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recording.mid';
  a.click();
  URL.revokeObjectURL(url);
}
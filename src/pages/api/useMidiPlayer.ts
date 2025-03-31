// hooks/useMidiPlayer.ts
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';

export const useMidiPlayer = () => {
  const synth = new Tone.PolySynth().toDestination();
  let isPlaying = false;

  const playMidi = async (url: string) => {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    const midi = new Midi(arrayBuffer);

    await Tone.start();
    isPlaying = true;

    const now = Tone.now();
    midi.tracks[0].notes.forEach((note) => {
      if (!isPlaying) return;
      synth.triggerAttackRelease(note.name, note.duration, now + note.time, note.velocity);
    });
  };

  const stopMidi = () => {
    isPlaying = false;
    synth.releaseAll();
  };

  return { playMidi, stopMidi };
};
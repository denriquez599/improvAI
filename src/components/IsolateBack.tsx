
import * as mm from '@magenta/music';

/**
 * Isolates the backing track by removing the melody (highest pitch notes) from the MIDI file.
 * @param midiUrl - The URL or path to the MIDI file.
 * @returns A promise that resolves with a Blob URL of the isolated backing track.
 */
export const isolateBackingTrack = async (midiUrl: string): Promise<string> => {
  try {
    // Fetch and parse the MIDI file
    const midiData = await fetch(midiUrl).then((response) => response.arrayBuffer());
    const sequence = mm.midiToSequenceProto(midiData);

    // Group notes by start time
    const timeGroupedNotes: { [startTime: string]: mm.NoteSequence.INote[] } = {};
    sequence.notes.forEach((note) => {
      const key = note.startTime.toFixed(3);
      if (!timeGroupedNotes[key]) timeGroupedNotes[key] = [];
      timeGroupedNotes[key].push(note);
    });

    // Identify and remove melody notes (highest pitch at each start time)
    const melodyNotes = new Set<number>();
    for (const time in timeGroupedNotes) {
      const notes = timeGroupedNotes[time];
      const highestNote = notes.reduce((prev, curr) =>
        curr.pitch > prev.pitch ? curr : prev
      );
      melodyNotes.add(highestNote.pitch);
    }

    // Create a new sequence for the backing track
    const backingTrack = mm.sequences.clone(sequence);
    backingTrack.notes = backingTrack.notes.filter(
      (note) => !melodyNotes.has(note.pitch)
    );

    // Convert the modified sequence back to MIDI
    const backingTrackMidi = mm.sequenceProtoToMidi(backingTrack);
    const backingTrackBlob = new Blob([backingTrackMidi], { type: 'audio/midi' });

    // Return a Blob URL for playback
    return URL.createObjectURL(backingTrackBlob);
  } catch (error) {
    console.error('Error isolating backing track:', error);
    throw error;
  }
};

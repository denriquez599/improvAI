export const getChordName = (notes: string[]): string | null => {
    if (notes.length < 3) return null; // A chord typically requires at least three notes.
  
    // Function to strip octave information
    const stripOctave = (note: string) => note.replace(/[0-9]/g, '');
  
    // Map for major and minor chords
    const chordMap: Record<string, string> = {
        "C,E,G": "C Major",
        "C,Eb,G": "C Minor",
        "C,Eb,Gb": "C Diminished",
        "C,E,G#": "C Augmented",
        "C#,F,G#": "C# Major",
        "C#,E,G#": "C# Minor",
        "C#,E,G": "C# Diminished",
        "C#,F,A": "C# Augmented",
        "D,F#,A": "D Major",
        "D,F,A": "D Minor",
        "D,F,Ab": "D Diminished",
        "D,F#,A#": "D Augmented",
        "Eb,G,Bb": "Eb Major",
        "Eb,Gb,Bb": "Eb Minor",
        "Eb,Gb,A": "Eb Diminished",
        "Eb,G,C": "Eb Augmented",
        "E,G#,B": "E Major",
        "E,G,B": "E Minor",
        "E,G,Bb": "E Diminished",
        "E,G#,C": "E Augmented",
        "F,A,C": "F Major",
        "F,Ab,C": "F Minor",
        "F,Ab,B": "F Diminished",
        "F,A,C#": "F Augmented",
        "F#,A#,C#": "F# Major",
        "F#,A,C#": "F# Minor",
        "F#,A,C": "F# Diminished",
        "F#,A#,D": "F# Augmented",
        "G,B,D": "G Major",
        "G,Bb,D": "G Minor",
        "G,Bb,Db": "G Diminished",
        "G,B,Eb": "G Augmented",
        "Ab,C,Eb": "Ab Major",
        "Ab,B,Eb": "Ab Minor",
        "Ab,B,D": "Ab Diminished",
        "Ab,C,F": "Ab Augmented",
        "A,C#,E": "A Major",
        "A,C,E": "A Minor",
        "A,C,Eb": "A Diminished",
        "A,C#,F": "A Augmented",
        "Bb,D,F": "Bb Major",
        "Bb,Db,F": "Bb Minor",
        "Bb,Db,E": "Bb Diminished",
        "Bb,D,Gb": "Bb Augmented",
        "B,D#,F#": "B Major",
        "B,D,F#": "B Minor",
        "B,D,F": "B Diminished",
        "B,D#,G": "B Augmented",

        // Shell chords
        "C,E,B": "C Major 7 (no 5)",
        "C,Eb,Bb": "C Minor 7 (no 5)",
        "C,E,Bb": "C Dominant 7 (no 5)",
        "C,Eb,B": "C Minor/Major 7 (no 5)",
        "C#,F,B": "C# Major 7 (no 5)",
        "C#,E,A#": "C# Minor 7 (no 5)",
        "C#,F,A#": "C# Dominant 7 (no 5)",
        "C#,E,C": "C# Minor/Major 7 (no 5)",
        "D,F#,C#": "D Major 7 (no 5)",
        "D,F,B": "D Minor 7 (no 5)",
        "D,F#,B": "D Dominant 7 (no 5)",
        "D,F,C#": "D Minor/Major 7 (no 5)",

        // 7-no-3 chords
        "C,G,B": "C Major 7 (no 3)",
        "C,G,Bb": "C Dominant 7 (no 3)",
        "C,Gb,Bb": "C Minor 7 b5 (no 3)",
        "C,G#,B": "C Augmented 7 (no 3)",
        "C#,G#,B#": "C# Major 7 (no 3)",
        "C#,G#,B": "C# Dominant 7 (no 3)",
        "C#,G,A": "C# Minor 7 b5 (no 3)",
        "C#,G#,C": "C# Augmented 7 (no 3)",
        "D,A,C#": "D Major 7 (no 3)",
        "D,A,C": "D Dominant 7 (no 3)",
        "D,Ab,C": "D Minor 7 b5 (no 3)",
        "D,A,D#": "D Augmented 7 (no 3)",

        // Stack-o-Fourths
        "C,F,Bb": "C Sus 7 (no 5)",
        "C,F,B": "C Sus Major 7 (no 5)",
        "C,F#,B": "C Major 7 #11 (no 3,5)",
        "C#,F#,B": "C# Sus 7 (no 5)",
        "C#,F#,B#": "C# Sus Major 7 (no 5)",
        "C#,G,B#": "C# Major 7 #11 (no 3,5)",
        "D,G,C": "D Sus 7 (no 5)",
        "D,G,C#": "D Sus Major 7 (no 5)",
        "D,G,D#": "D Major 7 #11 (no 3,5)",
    };
  
    // Parse notes without octave
    const parsedNotes = notes.map(stripOctave);
  
    // Check direct match if there are exactly 3 notes
    if (parsedNotes.length === 3) {
      const sortedNotes = parsedNotes.sort().join(',');
      return chordMap[sortedNotes] || "Unknown Chord";
    }
  
    // Check all combinations of 3 notes for a chord match (if more than 3 notes)
    for (let i = 0; i < parsedNotes.length; i++) {
      // Create a combination excluding one note
      const subset = parsedNotes.filter((_, index) => index !== i);
      const sortedSubset = subset.sort().join(',');
  
      // Check if this subset matches a chord
      if (chordMap[sortedSubset]) {
        return chordMap[sortedSubset]; // Return the chord name if found
      }
    }
  
    // If no valid chord is found
    return "Unknown Chord";
  };
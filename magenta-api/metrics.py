import pretty_midi
from music21 import converter, key
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean, cosine
import numpy as np
from librosa.sequence import dtw


def extract_key(midi_path):
    """
    Extract the key of a MIDI file using music21, ignoring non-pitched tracks.
    """
    try:
        score = converter.parse(midi_path)
        keys_detected = []
        for part in score.parts:
            if len(part.flat.getElementsByClass('Note')) > 0:
                keys_detected.append(part.analyze('key'))
        return max(set(keys_detected), key=keys_detected.count) if keys_detected else None
    except Exception as e:
        print(f"Error extracting key: {e}")
        return None


def extract_pitch_classes(midi_path):
    """
    Extract pitch classes from a MIDI file for melodic profile comparison.
    """
    midi_data = pretty_midi.PrettyMIDI(midi_path)
    pitch_classes = []
    for instrument in midi_data.instruments:
        if not instrument.is_drum:
            pitch_classes.extend(note.pitch % 12 for note in instrument.notes)
    return np.bincount(pitch_classes, minlength=12)


def extract_note_timings(midi_path):
    """
    Extract note onset times (timing only) from a MIDI file.
    """
    midi_data = pretty_midi.PrettyMIDI(midi_path)
    note_timings = []
    for instrument in midi_data.instruments:
        if not instrument.is_drum:
            note_timings.extend([note.start for note in instrument.notes])
    return np.array(sorted(note_timings), dtype=np.float64)


def tonal_similarity(key1, key2):
    """
    Compute similarity between two keys based on tonal distance.
    """
    if not key1 or not key2:
        return 0
    try:
        circle_of_fifths = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]
        pos1 = circle_of_fifths.index(key1.tonic.pitchClass)
        pos2 = circle_of_fifths.index(key2.tonic.pitchClass)
        tonal_distance = min(abs(pos1 - pos2), 12 - abs(pos1 - pos2))
        return max(0, 10 - tonal_distance) 
    except ValueError:
        return 0


def melodic_similarity(midi_path1, midi_path2):
    """
    Compute similarity between two MIDI files based on melodic pitch class profiles.
    """
    pitch_profile1 = extract_pitch_classes(midi_path1)
    pitch_profile2 = extract_pitch_classes(midi_path2)
    return 1 - cosine(pitch_profile1, pitch_profile2)

def extract_note_timings(file_path):
    """
    Extract note onset times (timing only) from a MIDI file.
    """
    midi_data = pretty_midi.PrettyMIDI(file_path)
    note_timings = []
    for instrument in midi_data.instruments:
        if not instrument.is_drum:
            note_timings.extend([note.start for note in instrument.notes])
    return sorted(note_timings)

def compute_dtw_distance(sequence1, sequence2):
    """
    Compute the DTW distance between two timing sequences.
    """
    sequence1 = np.array(sequence1).reshape(1, -1)
    sequence2 = np.array(sequence2).reshape(1, -1)
    
    alignment_path = dtw(sequence1, sequence2, backtrack=False)
    dtw_distance = alignment_path[-1, -1]
    
    return dtw_distance

def score_rhythm_alignment(file1, file2):
    """
    Compute a rhythm alignment score on a scale of 1 to 10.
    """
    timings1 = extract_note_timings(file1)
    timings2 = extract_note_timings(file2)
    
    dtw_distance = compute_dtw_distance(timings1, timings2)
    
    max_distance = 5000
    normalized_score = max(1, 10 - (dtw_distance / max_distance) * 10)
    
    return round(normalized_score, 2)

def compare_midi_files(midi_path1, midi_path2):
    """
    Compare the musical similarity of two MIDI files based on key, melody, and rhythm.
    """
    key1 = extract_key(midi_path1)
    key2 = extract_key(midi_path2)
    key_similarity = tonal_similarity(key1, key2)

    melodic_similarity_score = melodic_similarity(midi_path1, midi_path2)

    rhythm_alignment_score = score_rhythm_alignment(midi_path1, midi_path2)

    print(f"Key of {midi_path1}: {key1}")
    print(f"Key of {midi_path2}: {key2}")
    print(f"Tonal similarity (Key): {key_similarity}/10")
    print(f"Melodic similarity (Pitch Class Profile): {melodic_similarity_score * 10:.2f}/10")
    print(f"Rhythm alignment score: {rhythm_alignment_score}/10")

    return {
        "key_similarity": key_similarity,
        "melodic_similarity": round(melodic_similarity_score * 10, 2),
        "rhythm_alignment": rhythm_alignment_score,
        "key1": key1,
        "key2": key2,
    }

midi_file1 = "./AutumnLeaves.mid"
midi_file2 = "./bad.mid"
result = compare_midi_files(midi_file1, midi_file2)
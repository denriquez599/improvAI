import math
from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import mido
import pretty_midi
from music21 import converter, key
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean, cosine
import numpy as np
from librosa.sequence import dtw
import magenta
import note_seq
import tensorflow

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # List of allowed origins (use "*" to allow all origins)
    allow_credentials=True,
    allow_methods=["*"],  # List of allowed HTTP methods
    allow_headers=["*"],  # List of allowed headers
)

BASE_URL = '/api/v1'

midi_messages = []



@app.post(f"{BASE_URL}/midi")
async def save_midi(request: Request):
    """
    Collect incoming MIDI messages, filter by channel, and normalize timestamps.
    """
    global midi_messages
    data = await request.json()

    # Ensure consistent timestamp normalization
    if not midi_messages:
        initial_timestamp = data["messages"][0]["timestamp"]
    else:
        initial_timestamp = midi_messages[0].time

    for message in data.get("messages", []):
        midi_message = mido.Message.from_bytes(message["data"])
        midi_message.time = max(0, message["timestamp"] - initial_timestamp)

        # Filter by channel and message type
        if midi_message.channel == 0 and midi_message.type in ["note_on", "note_off"]:
            if not midi_messages or midi_message != midi_messages[-1]:
                midi_messages.append(midi_message)

    print(f"Received messages: {len(midi_messages)}")  # Debugging
    return {"message": "MIDI messages received"}


@app.post(f"{BASE_URL}/midi-file")
def write_midi_file():
    global midi_messages

    if not midi_messages:
        return {"message": "No MIDI data to write"}

    try:
        midi_file = mido.MidiFile()
        track = mido.MidiTrack()
        midi_file.tracks.append(track)

        # Convert absolute timestamps to delta times
        last_time = 0
        for msg in midi_messages:
            delta_time = max(0, int(msg.time - last_time))
            msg.time = delta_time
            track.append(msg)
            last_time += delta_time

        # Add End of Track event
        track.append(mido.MetaMessage('end_of_track', time=0))

        # Save MIDI file
        filename = 'uploaded_output.mid'
        midi_file.save(filename)

        numMidi = len(midi_messages)
        midi_messages = []  # Clear only after saving

        return {"message": numMidi, "filename": filename}
    except Exception as e:
        return {"error": f"Failed to write MIDI file: {str(e)}"}
    

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


@app.get(f"{BASE_URL}/musicality")
def get_musicality(midi_file1: str, midi_file2: str):
    """
    Compute melodic similarity score based on pitch class profiles.
    """
    try:
        similarity_score = round(melodic_similarity(midi_file1, midi_file2), 2)
        return similarity_score * 10
    except Exception as e:
        return {"error": str(e)}


@app.get(f"{BASE_URL}/tonality")
def get_tonality(midi_file1: str, midi_file2: str):
    """
    Compute tonal similarity score based on the circle of fifths.
    """
    try:
        key1 = extract_key(midi_file1)
        key2 = extract_key(midi_file2)
        similarity_score = tonal_similarity(key1, key2)
        return similarity_score
    except Exception as e:
        return {"error": str(e)}


@app.get(f"{BASE_URL}/rhythm")
def get_rhythm_alignment(midi_file1: str, midi_file2: str):
    """
    Compute rhythmic alignment score based on DTW distance.
    """
    try:
        rhythm_score = score_rhythm_alignment(midi_file1, midi_file2)
        return rhythm_score
    except Exception as e:
        return {"error": str(e)}

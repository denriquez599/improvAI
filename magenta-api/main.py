from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import mido

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

@app.get(f"{BASE_URL}/musicality")
def get_rhythm():
    return 8

@app.get(f"{BASE_URL}/rhythm")
def get_rhythm():
    return 9

@app.get(f"{BASE_URL}/originality")
def get_rhythm():
    return 10
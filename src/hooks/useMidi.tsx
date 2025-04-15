import { useState, useEffect, useRef } from 'react';

export interface MidiMessage {
    data: number[];
    timestamp: number;
}

const useMidi = () => {
    const [midiMessages, setMidiMessages] = useState<MidiMessage[]>([]);
    const midiAccessRef = useRef<WebMidi.MIDIAccess | null>(null);
    const isRecordingRef = useRef(false);

    useEffect(() => {
        const initMidi = async () => {
            try {
                midiAccessRef.current = await navigator.requestMIDIAccess();
            } catch (err) {
                console.error('Failed to access MIDI devices:', err);
            }
        };

        initMidi();

        return () => {
            stop(); // cleanup listeners
        };
    }, []);

    const onMidiMessage = (event: WebMidi.MIDIMessageEvent) => {
        if (isRecordingRef.current) {
            setMidiMessages(prev => [
                ...prev,
                { data: Array.from(event.data), timestamp: event.timeStamp },
            ]);
        }
    };

    const start = () => {
        console.log('Starting MIDI recording...');
        if (!midiAccessRef.current) {
            console.error('MIDI access not initialized');
            return;
        }

        isRecordingRef.current = true;
        setMidiMessages([]);

        for (let input of Array.from(midiAccessRef.current.inputs.values())) {
            input.onmidimessage = onMidiMessage;
        }
    };

    const stop = () => {
        console.log('Stopping MIDI recording...');
        isRecordingRef.current = false;
        if (midiAccessRef.current) {
            for (let input of Array.from(midiAccessRef.current.inputs.values())) {
                input.onmidimessage = null;
            }
        }
    };

    return { midiMessages, start, stop };
};

export default useMidi;
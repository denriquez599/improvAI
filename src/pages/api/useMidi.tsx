import { useEffect, useState } from 'react';

export interface MidiMessage {
  data: Uint8Array;
  timestamp: number;
}

const useMidi = () => {
  const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null);
  const [midiMessages, setMidiMessages] = useState<MidiMessage[]>([]);

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      (navigator.requestMIDIAccess({sysex: true}) as Promise<WebMidi.MIDIAccess>).then(onMIDISuccess, onMIDIFailure);
    } else {
      console.error('Web MIDI API is not supported in this browser.');
    }
  }, []);

  const onMIDISuccess = (access: WebMidi.MIDIAccess) => {
    setMidiAccess(access);

    access.inputs.forEach((input) => {
      input.onmidimessage = handleMIDIMessage;
    });

    access.onstatechange = (event) => {
      if (event.port.state === 'connected' && event.port.type === 'input') {
        (event.port as WebMidi.MIDIInput).onmidimessage = handleMIDIMessage;
      }
    };
  };

  const onMIDIFailure = () => {
    console.error('Could not access your MIDI devices.');
  };

  let lastMessageTime = 0;
  const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
    const currentTime = performance.now();
    if (currentTime - lastMessageTime < 10) { // Adjust this debounce time as needed
      return; // Ignore messages that arrive too quickly
    }

    lastMessageTime = currentTime;

    const newMessage: MidiMessage = {
      data: new Uint8Array(message.data),
      timestamp: message.timeStamp,
    };

    setMidiMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return { midiAccess, midiMessages };
};

export default useMidi;

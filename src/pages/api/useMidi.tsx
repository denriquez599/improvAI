// import { useEffect, useState } from 'react';

// export interface MidiMessage {
//   data: Uint8Array;
//   timestamp: number;
// }

// const useMidi = () => {
//   const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null);
//   const [midiMessages, setMidiMessages] = useState<MidiMessage[]>([]);

//   useEffect(() => {
//     if (navigator.requestMIDIAccess) {
//       (navigator.requestMIDIAccess({sysex: true}) as Promise<WebMidi.MIDIAccess>).then(onMIDISuccess, onMIDIFailure);
//     } else {
//       console.error('Web MIDI API is not supported in this browser.');
//     }
//   }, []);

//   const onMIDISuccess = (access: WebMidi.MIDIAccess) => {
//     setMidiAccess(access);

//     access.inputs.forEach((input) => {
//       input.onmidimessage = handleMIDIMessage;
//     });

//     access.onstatechange = (event) => {
//       if (event.port.state === 'connected' && event.port.type === 'input') {
//         (event.port as WebMidi.MIDIInput).onmidimessage = handleMIDIMessage;
//       }
//     };
//   };

//   const onMIDIFailure = () => {
//     console.error('Could not access your MIDI devices.');
//   };

//   let lastMessageTime = 0;
//   const handleMIDIMessage = (message: WebMidi.MIDIMessageEvent) => {
//     const currentTime = performance.now();
//     if (currentTime - lastMessageTime < 10) { // Adjust this debounce time as needed
//       return; // Ignore messages that arrive too quickly
//     }

//     lastMessageTime = currentTime;

//     const newMessage: MidiMessage = {
//       data: new Uint8Array(message.data),
//       timestamp: message.timeStamp,
//     };

//     setMidiMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   return { midiAccess, midiMessages };
// };

// export default useMidi;

// pages/api/useMidi.ts


// hooks/useMidi.ts
import { useState, useEffect } from 'react';

export interface MidiMessage {
  data: number[];        // MIDI bytes
  timestamp: number;     // DOMHighResTimeStamp
}

const useMidi = (isListening: boolean) => {
  const [midiMessages, setMidiMessages] = useState<MidiMessage[]>([]);

  useEffect(() => {
    let midiAccess: WebMidi.MIDIAccess | null = null;

    const onMidiMessage = (event: WebMidi.MIDIMessageEvent) => {
      if (isListening) {
        setMidiMessages(prev => [...prev, {
          data: Array.from(event.data),
          timestamp: event.timeStamp
        }]);
      }
    };

    const initMidi = async () => {
      try {
        midiAccess = await navigator.requestMIDIAccess();
        for (let input of Array.from(midiAccess.inputs.values())) {
          input.onmidimessage = onMidiMessage;
        }
      } catch (error) {
        console.error('Failed to initialize MIDI:', error);
      }
    };

    initMidi();

    return () => {
      if (midiAccess) {
        for (let input of Array.from(midiAccess.inputs.values())) {
          input.onmidimessage = null;
        }
      }
    };
  }, [isListening]);

  return { midiMessages, clear: () => setMidiMessages([]) };
};

export default useMidi;
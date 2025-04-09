declare module 'react-midi-player' {
  import * as React from 'react';

  interface MidiPlayerProps {
    src: string;
    autoplay?: boolean;
    loop?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
    onEnd?: () => void;
  }

  const MidiPlayer: React.FC<MidiPlayerProps>;

  export default MidiPlayer;
}
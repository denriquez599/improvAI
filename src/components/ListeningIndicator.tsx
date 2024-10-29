import React from 'react';
import { motion } from 'framer-motion';

interface ListeningIndicatorProps {
  setIsListening: (isListening: boolean) => void;
  onListeningComplete: () => void;
}

const ListeningIndicator: React.FC<ListeningIndicatorProps> = ({ setIsListening, onListeningComplete }) => {
  const bounceTransition = {
    duration: 0.6,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <button 
      onClick={() => {
        setIsListening(false);
        onListeningComplete();
      }} 
      className="flex space-x-1 h-10 items-end focus:outline-none" // Add focus:outline-none to remove default button outline
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} // Button style
    >
      <motion.div
        className="w-1 bg-spotifyLightGrey"
        style={{ height: "100%" }}
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ ...bounceTransition, delay: 0 }}
      />
      <motion.div
        className="w-1 bg-spotifyLightGrey"
        style={{ height: "100%" }}
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ ...bounceTransition, delay: 0.2 }}
      />
      <motion.div
        className="w-1 bg-spotifyLightGrey"
        style={{ height: "100%" }}
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ ...bounceTransition, delay: 0.4 }}
      />
      <motion.div
        className="w-1 bg-spotifyLightGrey"
        style={{ height: "100%" }}
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ ...bounceTransition, delay: 0.6 }}
      />
    </button>
  );
};

export default ListeningIndicator;

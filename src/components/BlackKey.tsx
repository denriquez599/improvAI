import React from 'react';

interface Props {
  note: string;
}

const BlackKey: React.FC<Props> = ({ note }) => {
  return (
      <button className="bottom-0 h-1/2 text-center text-xs bg-black text-white">{note}</button>
  );
};

export default BlackKey;

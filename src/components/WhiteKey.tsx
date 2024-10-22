import React from 'react';

interface Props {
  note: string;
}

const WhiteKey: React.FC<Props> = ({ note }) => {
  return (
      <button className="bottom-0 h-full text-center text-sm text-gray-700">{note}</button>
  );
};

export default WhiteKey;

import React from 'react';
import songArray, { Song } from './MidiFiles';

interface SidebarProps {
  setPage: (page: string) => void;
  setSong: (song: Song) => void;
  song: Song;
}

const Sidebar: React.FC<SidebarProps> = ({ setPage, setSong, song}) => {
  return (
    <aside className="w-1/4 bg-black p-4 space-y-4">
      <div className="space-y-">
        <button onClick={() => setPage("Home Page")} className="text-white text-left w-full py-2 px-4 rounded-md mb-6 bg-spotifyGrey hover:bg-gray-700">
          Home
        </button>
          <p className="text-gray-400 flex flex-col mb-2">Setlist</p>
          <ul className="text-spotifyLightGrey space-y-1">
            {songArray.map((song, index) => (
              <li key={index} onClick={() => { setPage("Improvise"); setSong(song); }} className="hover:cursor-pointer hover:text-white">{song.title}</li>
            ))}
          </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

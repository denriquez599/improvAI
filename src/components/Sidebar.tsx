import React, { useState } from 'react';
import songArray, { Song } from './MidiFiles';

interface SidebarProps {
  setPage: (page: string) => void;
  setSong: (song: Song) => void;
  song: Song;
}

const Sidebar: React.FC<SidebarProps> = ({ setPage, setSong, song }) => {
  return (
    <aside className="w-1/4 bg-black p-4 space-y-4">
      <div>
        <button
          onClick={() => setPage("Home Page")}
          className="text-white text-left w-full py-2 px-4 rounded-md mb-6 bg-spotifyGrey hover:bg-gray-700"
        >
          Home
        </button>

        {/* Free-Play Library */}
        <div className="group">
          <p className="text-white text-left w-full py-2 px-4 rounded-md bg-spotifyGrey hover:bg-gray-700">
            Your Free-Play Library
          </p>
          <ul className="text-spotifyLightGrey max-h-0 overflow-hidden group-hover:max-h-96 group-hover:mt-2 transition-all duration-300 ease-in-out space-y-1 mt-0">
            {songArray.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setPage("Improvise");
                  setSong(song);
                }}
                className="hover:cursor-pointer hover:text-white px-4"
              >
                {song.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson Plans */}
        <div className="group mt-4">
          <p className="text-white text-left w-full py-2 px-4 rounded-md bg-spotifyGrey hover:bg-gray-700">
            Lesson Plans From Your Teacher
          </p>
          <ul className="text-spotifyLightGrey max-h-0 overflow-hidden group-hover:max-h-96 group-hover:mt-2 transition-all duration-300 ease-in-out space-y-1 mt-0">
            {songArray.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setPage("Improvise");
                  setSong(song);
                }}
                className="hover:cursor-pointer hover:text-white px-4"
              >
                {song.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};


export default Sidebar;

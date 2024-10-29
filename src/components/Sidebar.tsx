import React from 'react';

interface SidebarProps {
  setPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setPage }) => {
  return (
    <aside className="w-1/4 bg-black p-4 space-y-4">
      <div className="space-y-">
        <button onClick={() => setPage("Home Page")} className="text-white text-left w-full py-2 px-4 rounded-md mb-6 bg-spotifyGrey hover:bg-gray-700">
          Home
        </button>
          <p className="text-gray-400 flex flex-col mb-2">Setlist</p>
          <ul className="text-spotifyLightGrey space-y-1">
            <li className='hover:cursor-pointer hover:text-white'>True Blue</li>
            <li className='hover:cursor-pointer hover:text-white'>Road Song</li>
            <li className='hover:cursor-pointer hover:text-white'>Romantic Warrior</li>
            <li className='hover:cursor-pointer hover:text-white'>Sunday at the Village Vanguard</li>
            <li className='hover:cursor-pointer hover:text-white'>Undercurrent</li>
            <li className='hover:cursor-pointer hover:text-white'>Tutu</li>
          </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

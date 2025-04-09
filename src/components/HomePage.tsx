import React, { useState } from 'react';
import songArray, { Song } from './MidiFiles';

const HomePage: React.FC<{ setPage: (page: string) => void, setLesson: (lesson: Song[]) => void, setSong: (song: Song) => void}> = ({ setPage, setSong, setLesson}) => {

  function handleImproviseClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setPage('Improvise');
  }

  const [expandedFolderIndex, setExpandedFolderIndex] = useState<number | null>(null);

  // Split into folders of 3 songs each for demo
  const songFolders: Song[][] = [];
  for (let i = 0; i < songArray.length; i += 3) {
    songFolders.push(songArray.slice(i, i + 3));
  }


  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header with User Info */}
        <header className="flex justify-between">
          <h1 className="text-white items-center text-3xl">ImprovAI</h1>
          <div className="text-right">
            <span className="text-white mr-2">David</span>
            <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://via.placeholder.com/50"
              alt="User avatar"
            />
          </div>
        </header>
        
        {/* Improvisation Reports */}
        {/* <section>
          <h2 className="text-xl text-white font-bold mb-4">Improvisation Reports</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">September 14th, 2024</h3></div>
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">September 29th, 2024</h3></div>
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">October 18th, 2024</h3></div>
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">View All...</h3></div>
          </div>
        </section> */}

        {/* Songs you might like */}
        <section className="mt-8">
          <h2 className="text-xl text-white font-bold mb-4">Free Play</h2>
          <div className="flex gap-4 w-full max-w-6xl overflow-x-auto no-scrollbar">
            {songArray.map((song, index) => (
              <button key={index} onClick={() => { setPage("Improvise"); setSong(song); }} className="flex-shrink-0 hover:opacity-90 bg-spotifyGrey rounded-md pb-2 items-center space-y-2 h-fit w-48">
                <div className="w-48 h-48 rounded-md overflow-hidden">
                  <img src={song.cover} alt={`${song.title} cover`} className="w-full h-full object-contain rounded-md" />
                </div>
                <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {song.title}
                </h3>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
      <h2 className="text-xl text-white font-bold mb-4">Lessons</h2>
      <div className="flex gap-8 w-full max-w-6xl overflow-x-auto overflow-y-hidden no-scrollbar">
        {songFolders.map((folder, folderIndex) => (
          <div key={folderIndex} className="flex-shrink-0">
            {expandedFolderIndex === folderIndex ? (
              <button onClick={() => setPage("Lesson Plan")} className="hover:opacity-90 flex gap-0">
                {folder.map((song, index) => (
                  <div
                    key={index}
                    className="bg-spotifyGrey pb-2 items-center space-y-2 h-fit w-48"
                  >
                    <div className="w-48 h-48 overflow-hidden">
                      <img src={song.cover} alt={`${song.title} cover`} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                      {song.title}
                    </h3>
                  </div>
                ))}
              </button>
            ) : (
              <button
                className="relative group w-48 h-48"
                onClick={() => {setExpandedFolderIndex(folderIndex); setLesson(folder);}}
              >
                {/* Stacked Placeholder Tiles */}
                {folder.map((song, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full bg-spotifyGrey overflow-hidden rounded-md transition-all duration-300"
                    style={{
                      top: `${index}px`,
                      left: `${index * 8}px`,
                      zIndex: folder.length - index,
                    }}
                  >
                    <img
                      src={song.cover}
                      alt={`${song.title} cover`}
                      className="w-full h-full object-contain rounded-md opacity-70 group-hover:opacity-90"
                    />
  
                  </div>
                ))}
              </button>
              
            )}
            <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full mt-2">
              Lesson Folder
            </h3>
          </div>
        ))}
      </div>
    </section>
      </main>
    </div>
  );
};

export default HomePage;

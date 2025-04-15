import React, { useState } from 'react';
import songArray, { Song } from './MidiFiles';

const HomePage: React.FC<{ setPage: (page: string) => void, setFolder: (folder: Song[]) => void, setSong: (song: Song) => void, setDescription: (description: string) => void }> = ({ setPage, setSong, setFolder, setDescription }) => {

  const [expandedFolderIndex, setExpandedFolderIndex] = useState<number | null>(null);

  const improvLibrarySongs = [songArray[1], songArray[3], songArray[5]];

  // Hardcoded lesson plan stuff
  const lessonPlanDescriptions: string[] = [
    `### Demo Lesson Plan

This is the lesson plan created special for Create-X Demo Day!
Here's some things that I want you do work on today:
1. Learn "Twinkle Twinkle Little Star", focusing on self correcting any errors that you see in feedback.
2.  Practice improvisation over "Autumn Leaves", focusing on incorporating trills.`,

    `### Capstone Expo Lesson Plan

This lesson plan is designed for the final capstone exposition:

1. Perform your chosen piece confidently
2. Try to improvise over some songs
3. Highlight your creativity and musicality`,
  ];

  const lessonPlanFolderNames: string[] = [
    "Demo Day Lesson Plan",
    "Capstone Expo Lesson Plan",
  ];
  const lessonPlanFolders: Song[][] = [
    [songArray[1], songArray[6]],
    [songArray[2], songArray[3], songArray[5], songArray[6]],
  ];

  // Split into folders of 3 songs each for demo
  const songFolders: Song[][] = [];
  for (let i = 0; i < songArray.length; i += 3) {
    songFolders.push(songArray.slice(i, i + 3));
  }

  const handleFolderClick = (folderIndex: number, folder: Song[]) => {
    if (expandedFolderIndex === folderIndex) {
      // If already expanded, route to the lesson plan page
      setDescription(lessonPlanDescriptions[folderIndex]);
      setFolder(folder);
      setPage('Lesson Plan');
    } else {
      // Otherwise, expand the folder
      setExpandedFolderIndex(folderIndex);
    }
  };


  return (
    <div className="items-center w-full h-full justify-center">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header with User Info */}
        <header className="flex justify-between">
          <h1 className="text-white items-center text-3xl">ImprovAI - Home</h1>
          <div className="text-right">
            <span className="text-white mr-2">David</span>
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="davidImage.jpeg"
              alt="User avatar"
            />
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-xl text-white font-bold mb-4">Learn-To-Play Library</h2>
          <div className="flex gap-4 w-full overflow-x-auto no-scrollbar">
            {songArray.map((song, index) => (
              <button key={index} onClick={() => { setPage("Learn To Play"); setSong(song); }} className="flex-shrink-0 hover:opacity-90 bg-spotifyGrey rounded-md pb-2 items-center space-y-2 h-fit w-48">
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
          <h2 className="text-xl text-white font-bold mb-4">Improvisation Library</h2>
          <div className="flex gap-4 w-full overflow-x-auto no-scrollbar">
            {improvLibrarySongs.map((song, index) => (
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
          <h2 className="text-xl text-white font-bold mb-4">Lesson Plans From Your Teacher</h2>
          <div className="flex gap-8 w-full max-w-6xl overflow-x-auto overflow-y-hidden no-scrollbar">
            {lessonPlanFolders.map((folder, folderIndex) => (
              <div key={folderIndex} className="flex-shrink-0">
                <button
                  className="relative group w-48 h-48"
                  onClick={() => handleFolderClick(folderIndex, folder)} // Updated click handler
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
                <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full mt-2">
                  {lessonPlanFolderNames[folderIndex] || "Lesson Folder"}
                </h3>
                {expandedFolderIndex === folderIndex && (
                  <div className="mt-4 text-white text-sm">
                    {folder.map((song, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{song.title}</span>
                        <span className="text-gray-300">{song.type === 'improv' ? '🎵 Improv' : '📘 Learn-To-Play'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

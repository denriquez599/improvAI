import React, { useState } from 'react';
import Improv from './Improv';
import { Song } from './MidiFiles';
import LearnToPlay from './LearnToPlay';
import ReactMarkdown from 'react-markdown';

interface LessonPlansPageProps {
  folder: Song[];
  description: string;
}

const LessonPlansPage: React.FC<LessonPlansPageProps> = ({ folder, description }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);


  return (
    <div className="items-center w-full h-full justify-center">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between">
          <h1 className="text-white items-center text-3xl">ImprovAI - Lesson Plan</h1>
          <div className="text-right">
            <span className="text-white mr-2">David</span>
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="davidImage.jpeg"
              alt="User avatar"
            />
          </div>
        </header>

        {/* Song Thumbnails in Lesson Folder */}
        <section className="mt-8">
          <h2 className="text-xl text-white font-bold mb-4">Songs in This Lesson Plan</h2>
          <div className="flex gap-8 w-full max-w-6xl overflow-x-auto overflow-y-hidden no-scrollbar">
            {folder.map((song, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSong(song)}
                className="flex-shrink-0 hover:opacity-90 bg-spotifyGrey rounded-md pb-2 items-center space-y-2 h-fit w-48"
              >
                <div className="w-48 h-48 rounded-md overflow-hidden">
                  <img
                    src={song.cover}
                    alt={`${song.title} cover`}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {song.title}
                </h3>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 w-full max-w-6xl flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2">
            What your teacher wants you to know about this lesson plan:
          </h3>
          <div className="w-full md:w-[576px] p-4 rounded-md bg-spotifyGrey text-white whitespace-pre-line">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-semibold mb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-semibold mb-2" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-2 leading-relaxed" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="list-disc list-inside" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        </section>

        {/* Conditionally render Improv component */}
        {selectedSong?.type === 'improv' && (
          <div className="mt-12">
            <Improv song={selectedSong} setSong={setSelectedSong} />
          </div>
        )}

        {/* Conditionally render Learn To Play component */}
        {selectedSong?.type === 'learn_to_play' && (
          <div className="mt-12">
            <LearnToPlay song={selectedSong} setSong={setSelectedSong} />
          </div>
        )}
      </main>
    </div>

  );
};

export default LessonPlansPage;
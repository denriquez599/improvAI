import React, { useState } from 'react';
import studentsArray, { Student } from "@/components/Students";
import { useRouter } from 'next/router';

type Song = {
  title: string;
  cover: string;
  midi: string;
  artist: string;
  wav: string;
  beatsPerMeasure: number;
  beatsPerMinute: number;
  type: string;
  id: string;
};

type Props = {
  songArray: Song[];
  makingPlan: boolean;
  setPage: (page: string) => void;
  page: string;
};

function SongLibrary({ songArray, setPage, makingPlan = false }: Props) {
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
  const [showPopup, setShowPopup] = useState(false);
  const [lessonName, setLessonName] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const router = useRouter();


  const toggleSong = (id: string) => {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleStudent = (name: string) => {
    setSelectedStudents((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };
  
  function handleSaveClick() { 
    setShowPopup(false);
    setPage("Portal");
  }

  const selectedSongArray = songArray.filter(song => selectedSongs.has(song.id));

  return (
    <div className="w-full h-full overflow-y-auto p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-bold">All Songs in Library</h2>
        {makingPlan && (
          <button
            onClick={() => setShowPopup(true)}
            className="bg-spotifyGreen text-white font-semibold py-2 px-4 rounded hover:opacity-90"
          >
            Create Lesson Plan
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {songArray.map((song) => {
          const isSelected = selectedSongs.has(song.id);
          return (
            <button
              key={song.id}
              onClick={() => makingPlan && toggleSong(song.id)}
              className={`bg-spotifyGrey rounded-md shadow-md p-4 flex flex-col items-center transition-opacity duration-200 ${
                makingPlan && !isSelected ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <div className="w-full h-48 overflow-hidden rounded-md mb-2">
                <img
                  src={song.cover}
                  alt={`${song.title} cover`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                {song.title}
              </h3>
              <p className="text-sm text-gray-400 text-center">{song.artist}</p>
            </button>
          );
        })}
        <button>
          <div className="bg-spotifyGrey rounded-md shadow-md p-4 h-full flex flex-col text-center items-center">
            <h3 className="text-white font-semibold text-center justify-center text-ellipsis h-full overflow-hidden whitespace-nowrap w-full">
              Add New Song
            </h3>
          </div>
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-zinc-900 rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h3 className="text-white text-lg font-bold mb-4">Create Lesson Plan</h3>

            <div className="relative w-48 h-48 mx-auto">
              {selectedSongArray.slice(0, 4).map((song, i) => (
                <img
                  key={i}
                  src={song.cover}
                  alt="cover"
                  className="absolute w-full h-full object-contain rounded-md"
                  style={{ top: `${i}px`, left: `${i * 8}px`, zIndex: selectedSongArray.length - i }}
                />
              ))}
            </div>

            <div className='flex flex-col gap-4 mt-4'>
              <input
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                placeholder="Lesson Name"
                className="w-full p-2 rounded bg-zinc-800 text-white border border-gray-700"
              />
              <div className="max-h-32 overflow-y-auto border border-gray-700 rounded bg-zinc-800 text-white p-2">
                <p className="mb-1 text-sm text-gray-400">Assign to Students:</p>
                {studentsArray.map((student, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="checkbox"
                      className="mr-2 accent-spotifyGreen"
                      checked={selectedStudents.includes(student.name)}
                      onChange={() => toggleStudent(student.name)}
                    />
                    {student.name}
                  </label>
                ))}
              </div>
              <button onClick={handleSaveClick} className='mt-2 w-full h-10 bg-spotifyGreen hover:scale-105 text-white font-semibold rounded border-2 border-white hover:opacity-90'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SongLibrary;

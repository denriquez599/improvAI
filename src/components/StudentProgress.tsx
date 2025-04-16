import React from 'react';
import { Student } from './Students';
import { Song } from './MidiFiles';

interface StudentProgressProps {
  student: Student | null;
  onClose: () => void;
}

const StudentProgress: React.FC<StudentProgressProps> = ({ student, onClose }) => {
  if (!student) return null;
  console.log(student.songs[0])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-zinc-900 rounded-lg p-6 w-[90%] max-w-4xl relative shadow-2xl border border-white">
        <button
          className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-white text-2xl font-bold">{student.name}</h2>
        </div>

        <div className="text-white mb-4">
          <h3 className="text-lg font-semibold">Overall Score:</h3>
          <p className="text-spotifyGreen text-xl font-bold">
            {student.progress}%
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Completed Songs:</h3>
          {student.songs && student.songs.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {student.songs.map((song, idx) => (
                <div
                  key={idx}
                  className="bg-spotifyGrey rounded-md w-40 h-fit flex-shrink-0 p-2"
                >
                  <div className="w-full h-40 overflow-hidden rounded mb-2">
                    <img
                      src={song.cover}
                      alt={`${song.title} cover`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-white font-semibold text-sm text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                    {song.title}
                  </h4>
                  <p className="text-xs text-gray-300 text-center">Score: {student.progress}%</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No completed songs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
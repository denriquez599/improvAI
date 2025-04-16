import React, { useState } from 'react';
import { Song } from './MidiFiles';
import { LessonPlan } from './LessonPlans';

interface SideScrollLibraryProps {
  songArray: Song[];
  lessonPlans: LessonPlan[];
  setPage: (page: string) => void;
  setLessonPlan: (lessonPlan: LessonPlan) => void;
  setSong: (song: Song) => void;
  setMakingPlan: (isMakingPlan: boolean) => void;
  makingPlan?: boolean;
}

const SideScrollLibrary: React.FC<SideScrollLibraryProps> = ({
  songArray,
  lessonPlans,
  setPage,
  setLessonPlan,
  setMakingPlan,
  setSong,
  makingPlan
}) => {
  const [expandedLessonPlanIndex, setExpandedLessonPlanIndex] = useState<number | null>(null);

  const handleLessonPlanClick = (lessonPlanIndex: number) => {
    if (expandedLessonPlanIndex === lessonPlanIndex) {
      setExpandedLessonPlanIndex(null);
    } else {
      setExpandedLessonPlanIndex(lessonPlanIndex);
    }
  };

  return (
    <>
      <section className="mt-4">
        <h2 className="text-xl text-white font-bold indent-8 mb-4">Your Lesson Plans</h2>
        <div className="flex gap-8 w-full max-w-6xl overflow-x-auto ml-4 overflow-y-hidden no-scrollbar">
          {lessonPlans.map((lessonPlan, lessonPlanIndex) => (
            <div key={lessonPlanIndex} className="flex-shrink-0">
              {expandedLessonPlanIndex === lessonPlanIndex ? (
                <div
                  className="cursor-pointer flex gap-0"
                  onClick={() => setExpandedLessonPlanIndex(null)}
                >
                  {lessonPlan.songs.map((song, index) => (
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
                </div>
              ) : (
                <button
                  className="relative group w-48 h-48"
                  onClick={() => handleLessonPlanClick(lessonPlanIndex)}
                >
                  {lessonPlan.songs.map((song, index) => (
                    <div
                      key={index}
                      className="absolute w-full h-full bg-spotifyGrey overflow-hidden rounded-md transition-all duration-300"
                      style={{
                        top: `${index}px`,
                        left: `${index * 8}px`,
                        zIndex: lessonPlan.songs.length - index,
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
                {expandedLessonPlanIndex === lessonPlanIndex ? null : lessonPlan.title || "Lesson Folder"}
              </h3>
            </div>
          ))}

          <button
            className="bg-spotifyGrey hover:scale-105 rounded-md p-4 flex items-center justify-center w-48 h-48"
            onClick={() => {
              setPage("Library");
              setMakingPlan(true);
            }}
          >
            <h3 className="text-white font-semibold text-center">New Lesson Plan</h3>
          </button>
        </div>
      </section>
    </>
  );
};

export default SideScrollLibrary;

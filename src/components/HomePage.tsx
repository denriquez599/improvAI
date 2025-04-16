import React, { useState } from 'react';
import songArray, { Song } from './MidiFiles';
import lessonPlans, { LessonPlan } from './LessonPlans';

const HomePage: React.FC<{ setPage: (page: string) => void, setLessonPlan: (lessonPlan: LessonPlan) => void, setSong: (song: Song) => void }> = ({ setPage, setSong, setLessonPlan }) => {

  const [expandedLessonPlanIndex, setExpandedLessonPlanIndex] = useState<number | null>(null);

  const handleLessonPlanClick = (lessonPlanIndex: number, lessonPlan: LessonPlan) => {
    if (expandedLessonPlanIndex === lessonPlanIndex) {
      setLessonPlan(lessonPlan);
      setPage('Lesson Plan');
    } else {
      setExpandedLessonPlanIndex(lessonPlanIndex);
    }
  };

  return (
    <div className="items-center h-full w-full max-w-full overflow-x-hidden">
      <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
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
            {songArray.filter(song => song.type === "learn_to_play").map((song, index) => (
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
            {songArray.filter(song => song.type === "improv").map((song, index) => (
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
            {lessonPlans.map((lessonPlan, lessonPlanIndex) => (
              <div key={lessonPlanIndex} className="relative flex-shrink-0">
                {expandedLessonPlanIndex === lessonPlanIndex ? (
                  <div
                    className="flex gap-0 cursor-pointer"
                    onClick={() => handleLessonPlanClick(lessonPlanIndex, lessonPlan)}
                  >
                    {lessonPlan.songs.map((song, index) => (
                      <div
                        key={index}
                        className="bg-spotifyGrey pb-2 items-center space-y-2 h-fit w-48 flex-shrink-0"
                      >
                        <div className="w-48 h-48 overflow-hidden">
                          <img
                            src={song.cover}
                            alt={`${song.title} cover`}
                            className="w-full h-full object-contain"
                          />
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
                    onClick={() => setExpandedLessonPlanIndex(lessonPlanIndex)}
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
                  {lessonPlan.title || "Lesson Folder"}
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
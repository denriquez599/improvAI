import React, { useState } from 'react';
import songArray, { Song } from './MidiFiles';
import lessonPlans, { LessonPlan } from './LessonPlans';

interface SidebarProps {
  setPage: (page: string) => void;
  setSong: (song: Song) => void;
  setLessonPlan: (lessonPlan: LessonPlan) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setPage, setSong, setLessonPlan }) => {
  return (
    <aside className="w-1/4 flex-none bg-black p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">      <div>
      <button
        onClick={() => setPage("Home Page")}
        className="text-white text-left w-full py-2 px-4 rounded-t-md bg-spotifyGrey hover:bg-gray-700"
      >
        Home
      </button>

      {/* Learn-To-Play Library */}
      <div className="group">
        <p className="text-white text-left w-full py-2 px-4 bg-spotifyGrey hover:bg-gray-700">
          Your Learn-To-Play Library
        </p>
        <ul className="text-spotifyLightGrey max-h-0 overflow-hidden group-hover:max-h-96 group-hover:mt-2 transition-all duration-300 ease-in-out space-y-1 mt-0">
          {songArray
            .filter(song => song.type === "learn_to_play")
            .map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setPage("Learn To Play");
                  setSong(song);
                }}
                className="hover:cursor-pointer mt-2 mb-2 hover:text-white px-4"
              >
                {song.title}
              </li>
            ))}
        </ul>
      </div>

      {/* Improv Library */}
      <div className="group">
        <p className="text-white text-left w-full py-2 px-4 bg-spotifyGrey hover:bg-gray-700">
          Your Improvisation Library
        </p>
        <ul className="text-spotifyLightGrey max-h-0 overflow-hidden group-hover:max-h-96 group-hover:mt-2 transition-all duration-300 ease-in-out space-y-1 mt-0">
          {songArray
            .filter(song => song.type === "improv")
            .map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  setPage("Improvise");
                  setSong(song);
                }}
                className="hover:cursor-pointer mb-2 mt-2  hover:text-white px-4"
              >
                {song.title}
              </li>
            ))}
        </ul>
      </div>

      {/* Lesson Plans */}
      <div className="group">
        <p className="text-white text-left w-full py-2 rounded-b-md px-4 bg-spotifyGrey hover:bg-gray-700">
          Your Lesson Plans
        </p>
        <ul className="text-spotifyLightGrey max-h-0 overflow-hidden group-hover:max-h-96 group-hover:mt-2 transition-all duration-300 ease-in-out space-y-1 mt-0">
          {lessonPlans.map((plan, index) => (
            <li
              key={index}
              onClick={() => {
                setPage("Lesson Plan");
                setLessonPlan(plan);
              }}
              className="hover:cursor-pointer hover:text-white px-4"
            >
              {plan.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </aside>
  );
};


export default Sidebar;

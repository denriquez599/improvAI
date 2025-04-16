import React from 'react'
import { LessonPlan } from './LessonPlans'
import SideScrollLibrary from './SideScroller'
import StudentScroller from './StudentScroller';
import studentArray from './Students';
import { Song } from './MidiFiles';

type Props = {
    lessonPlans: LessonPlan[]; // <-- plural, correct type
    setLessonPlan: (lessonPlan: LessonPlan) => void;
    setPage: (page: string) => void;
    makingPlan: boolean;
    setMakingPlan: (isMakingPlan: boolean) => void;
    students: typeof studentArray; // <-- plural, correct type
  }

function PortalHome({lessonPlans, students, setLessonPlan, makingPlan, setMakingPlan, setPage}: Props) {
    const [expandedLessonPlanIndex, setExpandedLessonPlanIndex] = React.useState<number | null>(null);

  return (
    <div className='flex flex-col h-screen'>
        <div className='flex justify-between items-center p-4'>
            <h1 className='text-4xl ml-2 text-white'>Welcome!</h1>
            <button
            className="w-64 py-3 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
            onClick={() => {setPage("Library")}}
            >Library
        </button>
        </div>
        <SideScrollLibrary
              songArray={[]}
              lessonPlans={lessonPlans}
              makingPlan={makingPlan}
              setMakingPlan={setMakingPlan}
              setPage={setPage}
               setLessonPlan={function (lessonPlan: LessonPlan): void {
                  throw new Error('Function not implemented.');
              } } setSong={function (song: Song): void {
                  throw new Error('Function not implemented.');
              } } />
        <StudentScroller students={students}/>
    </div>
  )
}

export default PortalHome
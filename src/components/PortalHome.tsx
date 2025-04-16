import React from 'react';
import { LessonPlan } from './LessonPlans';
import SideScrollLibrary from './SideScroller';
import StudentScroller from './StudentScroller';
import studentArray, { Student } from './Students';
import { Song } from './MidiFiles';
import StudentProgress from './StudentProgress';

type Props = {
  lessonPlans: LessonPlan[];
  setLessonPlan: (lessonPlan: LessonPlan) => void;
  setPage: (page: string) => void;
  makingPlan: boolean;
  setMakingPlan: (isMakingPlan: boolean) => void;
  students: typeof studentArray;
  pickedStudent: Student | null;
  setPickedStudent: (student: Student | null) => void;
};

function PortalHome({
  lessonPlans,
  students,
  setLessonPlan,
  makingPlan,
  setPickedStudent,
  pickedStudent,
  setMakingPlan,
  setPage,
}: Props) {
  const [expandedLessonPlanIndex, setExpandedLessonPlanIndex] = React.useState<number | null>(null);

  function onStudentClick(student: Student): void {
    setPickedStudent(student);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl ml-2 text-white">Welcome!</h1>
        <button
          className="w-64 py-3 text-xl font-semibold text-white bg-spotifyGrey border border-white rounded hover:bg-spotifyLightGrey transition"
          onClick={() => {
            setPage('Library');
          }}
        >
          Library
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
        }}
        setSong={function (song: Song): void {
          throw new Error('Function not implemented.');
        }}
      />

      <StudentScroller students={students} onStudentClick={onStudentClick} />

      {pickedStudent && (
        <StudentProgress
          student={pickedStudent}
          onClose={() => setPickedStudent(null)}
        />
      )}
    </div>
  );
}

export default PortalHome;

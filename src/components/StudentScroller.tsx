import React from 'react';
import { Student } from './Students';

interface StudentScrollerProps {
  students: Student[];
  onStudentClick: (student: Student) => void;
}

const StudentScroller: React.FC<StudentScrollerProps> = ({ students, onStudentClick }) => {
  return (
    <section className="mt-8 w-full max-w-screen-lg mx-auto">
      <h2 className="text-xl text-white font-bold indent-8 mb-4">Students</h2>
      <div className="w-full max-w-full overflow-x-auto overflow-y-hidden no-scrollbar rounded-md px-4 py-2">
        <div className="flex gap-4 w-max">
          {students.map((student, index) => (
            <button
              key={index}
              onClick={() => onStudentClick(student)}
              className="flex-shrink-0 hover:opacity-90 bg-spotifyGrey rounded-md p-4 items-center w-48 h-fit text-white text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                <img
                  src={student.image}
                  alt={`${student.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-2 font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                {student.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentScroller;
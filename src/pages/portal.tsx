import Image from "next/image";
import { Inter } from "next/font/google";
import MidiInput from "@/components/MidiInput";
import Piano from "@/components/Piano";
import MidiFileReader from "@/components/MidiFileReader";
import HomePage from "@/components/HomePage";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Improv from "@/components/Improv";
import LearnToPlay from "@/components/LearnToPlay";
import LessonPlansPage from "@/components/LessonPlansPage";
import songArray, { Song } from "@/components/MidiFiles";
import lessonPlans, { LessonPlan } from "@/components/LessonPlans";
import PortalHome from "@/components/PortalHome";
import studentsArray, { Student } from "@/components/Students";
import SongLibrary from "@/components/SongLibrary";
import StudentProgress from "@/components/StudentProgress";
import studentArray from "@/components/Students";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState<string>("Portal");
  const [song, setSong] = useState<Song>(songArray[0]);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(lessonPlans[0]);
  const [students, setStudents] = useState<Student[]>(studentsArray);
  const [makingPlan, setMakingPlan] = useState<boolean>(false);
  const [pickedStudent, setPickedStudent] = useState<Student | null>(null);
  
  return (
    <div className='flex h-screen bg-gradient-to-b from-spotifyGrey to-blackground'>
      {/* {page == "Home Page" && <HomePage />} */}
      <Sidebar page={page} setPage={setPage} setSong={setSong} setLessonPlan={setLessonPlan} />
        {page=="Portal" && <PortalHome pickedStudent={pickedStudent} setPickedStudent={setPickedStudent} students={students} setPage={setPage} makingPlan={makingPlan} setMakingPlan={setMakingPlan} lessonPlans={lessonPlans} setLessonPlan={setLessonPlan} />}    
        {page=="Library" && <SongLibrary setPage={setPage} page={page} makingPlan={makingPlan} songArray={songArray}  />}
    </div>
  );
}

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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState<string>("Home Page");
  const [song, setSong] = useState<Song>(songArray[0]);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(lessonPlans[0]);
  return (
    <div className='flex h-screen overflow-y-scroll w-full overflow-x-auto bg-gradient-to-b from-spotifyGrey to-blackground'>
      {/* {page == "Home Page" && <HomePage />} */}
      <Sidebar page={page} setPage={setPage} setSong={setSong} setLessonPlan={setLessonPlan} />
      {page == "Home Page" && <HomePage setSong={setSong} setPage={setPage} setLessonPlan={setLessonPlan} />}
      {page == "Improvise" && <Improv setSong={setSong} song={song} />}
      {page == "Learn To Play" && <LearnToPlay setSong={setSong} song={song} />}
      {page == "Lesson Plan" && <LessonPlansPage lessonPlan={lessonPlan} />}
      {/* <Footer /> */}
    </div>
  );
}

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
import songArray, { Song } from "@/components/MidiFiles";
import LessonPlan from "@/components/LessonPlan";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState<string>("Home Page");
  const [song, setSong] = useState<Song>(songArray[0]);
  const [lesson, setLesson] = useState<Song[]>([]);
  return (
    <div className='flex h-screen bg-gradient-to-b from-spotifyGrey to-blackground'>
      {/* {page == "Home Page" && <HomePage />} */}
      <Sidebar setPage={setPage} setSong={setSong} song={song}/>
      {page == "Home Page" && <HomePage setSong={setSong} setPage={setPage} setLesson={setLesson}/>}
      {page == "Improvise" && <Improv setSong={setSong} song={song}/>}
      {page == "Lesson Plan" && <LessonPlan lesson={lesson}/>}
    </div>
  );
}
 
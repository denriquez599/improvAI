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

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [page, setPage] = useState<string>("Home Page");
  return (
    <div className='flex h-screen bg-gradient-to-b from-spotifyGrey to-blackground'>
      {/* {page == "Home Page" && <HomePage />} */}
      <Sidebar setPage={setPage} />
      {page == "Home Page" && <HomePage setPage={setPage}/>}
      {page == "Improvise" && <Improv/>}
      <Footer />
    </div>
  );
}
 
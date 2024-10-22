import Image from "next/image";
import { Inter } from "next/font/google";
import MidiInput from "@/components/MidiInput";
import Piano from "@/components/Piano";
import MidiFileReader from "@/components/MidiFileReader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className='flex h-screen flex-col'>
      <MidiInput />
      <MidiFileReader/>
    </div>
  );
}

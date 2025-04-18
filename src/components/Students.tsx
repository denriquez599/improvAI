import { LessonPlan } from "./LessonPlans";
import { Song } from "./MidiFiles";
import songArray from "./MidiFiles";

export interface Student {
  name: string;
  lessons: LessonPlan[];
  songs: Song[];
  progress: number;
  image?: string; // Optional property for the image
}

const studentArray: Student[] = [
    { name: "David Enriquez", lessons: [], songs: [songArray[0]], progress: 64, image: "/davidImage.jpeg" },
    { name: "J. Brandon Dixon", lessons: [], songs: [songArray[0]], progress: 85, image: "/dixon.png" },
    { name: "Craig Forest", lessons: [], songs: [], progress: 0, image: "/forest.jpeg" },
    { name: "Karthik", lessons: [], songs: [...songArray], progress: 100, image: "/karthik.webp" },
  ]
  
  export default studentArray;

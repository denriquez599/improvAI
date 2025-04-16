import { LessonPlan } from "./LessonPlans";
import { Song } from "./MidiFiles";

export interface Student {
  name: string;
  lessons: LessonPlan[];
  songs: Song[];
  progress: number;
  image?: string; // Optional property for the image
}

const studentArray: Student[] = [
    { name: "David Enriquez", lessons: [], songs: [], progress: 0, image: "/davidImage.jpeg" },
    { name: "J. Brandon Dixon", lessons: [], songs: [], progress: 0, image: "/dixon.png" },
    { name: "Craig Forest", lessons: [], songs: [], progress: 0, image: "/forest.jpeg" },
    { name: "Karthik", lessons: [], songs: [], progress: 0, image: "/karthik.webp" },
  ]
  
  export default studentArray;

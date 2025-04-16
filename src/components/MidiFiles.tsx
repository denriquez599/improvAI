import { LessonPlan } from "./LessonPlans";

export interface Song {
  title: string;
  cover: string;
  midi: string;
  artist: string;
  wav: string;
  beatsPerMeasure: number;
  beatsPerMinute: number;
  type: string;
  id: string;
}



const songArray: Song[] = [
  { title: 'Tutu', cover: 'songPictures/tutu.jpg', midi: 'midiFiles/Tutu.mid', artist: 'Miles Davis', wav: 'wavFiles/tutu.wav', beatsPerMeasure: 4, beatsPerMinute: 70, type: 'improv', id: "Tutu.mid" },
  { title: 'Autumn Leaves', cover: 'songPictures/autumnLeaves.jpg', midi: 'midiFiles/AutumnLeaves.mid', artist: 'Bill Evans', wav: 'wavFiles/autumnLeaves.wav', beatsPerMeasure: 4, beatsPerMinute: 138, type: 'improv', id: "AutumnLeaves.mid" },
  { title: 'Nardis', cover: 'songPictures/nardis.jpg', midi: 'midiFiles/Nardis.mid', artist: 'Bill Evans', wav: 'wavFiles/nardis.wav', beatsPerMeasure: 4, beatsPerMinute: 200, type: 'improv', id: "Nardis.mid" },
  { title: 'All Of Me', cover: 'songPictures/allOfMe.jpeg', midi: 'midiFiles/AllOfMe.mid', artist: 'Matsayoshi Takanaka', wav: 'wavFiles/allOfMe.wav', beatsPerMeasure: 4, beatsPerMinute: 130, type: 'improv', id: "AllOfMe.mid" },
  { title: 'There Will Never Be Another You', cover: 'songPictures/thereWillNeverBeAnotherYou.jpg', midi: 'midiFiles/ThereWillNeverBeAnotherYou.mid', artist: 'Chet Baker', wav: 'wavFiles/twinkletwinklelittlestar.wav', beatsPerMeasure: 4, beatsPerMinute: 120, type: 'improv', id: "ThereWillNeverBeAnotherYou.mid" },
  { title: '55 Dive', cover: 'songPictures/55Dive.jpeg', midi: 'midiFiles/55Dive.mid', artist: 'Mike Stern', wav: 'wavFiles/twinkletwinklelittlestar.wav', beatsPerMeasure: 4, beatsPerMinute: 120, type: 'improv', id: "55Dive.mid" },
  { title: 'Twinkle', cover: 'songPictures/twinkle.jpeg', midi: 'midiFiles/twinkle2correct.mid', artist: 'Dizzy Gillespie', wav: 'wavFiles/twinkletwinklelittlestar.wav', beatsPerMeasure: 4, beatsPerMinute: 100, type: 'learn_to_play', id: "twinkle2correct.mid" },
];

export default songArray;
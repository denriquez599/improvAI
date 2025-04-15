import songArray, { Song } from "./MidiFiles";

export interface LessonPlan {
    title: string;
    songs: Song[];
    description: string;
}

const lessonPlans: LessonPlan[] = [
    {
        title: "Demo Day Lesson Plan",
        songs: [songArray[1], songArray[6]],
        description: `### Demo Lesson Plan

This is the lesson plan created special for Create-X Demo Day!
Here's some things that I want you do work on today:
1. Learn "Twinkle Twinkle Little Star", focusing on self correcting any errors that you see in feedback.
2.  Practice improvisation over "Autumn Leaves", focusing on incorporating trills.`
    },
    {
        title: "Capstone Expo Lesson Plan",
        songs: [songArray[2], songArray[3], songArray[5], songArray[6]],
        description: `### Capstone Expo Lesson Plan

This lesson plan is designed for the final capstone exposition:

1. Perform your chosen piece confidently
2. Try to improvise over some songs
3. Highlight your creativity and musicality`
    },
    {
        title: "Twinkle Lesson Plan",
        songs: [songArray[6]],
        description: "Just Twinkle Twinkle little star. For fun!"
    }
];

export default lessonPlans;
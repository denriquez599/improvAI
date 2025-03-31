export interface Song {
    title: string;
    cover: string;
    midi: string;
    artist: string;
  }
  
const songArray: Song[] = [
    { title: 'Tutu', cover: '/tutu.jpg', midi: 'midiFiles/Tutu.mid', artist: 'Miles Davis' },
    { title: 'Autumn Leaves', cover: '/autumnLeaves.jpg', midi: 'midiFiles/AutumnLeaves.mid', artist: 'Bill Evans' },
    { title: 'Nardis', cover: '/nardis.jpg', midi: 'midiFiles/Nardis.mid', artist: 'Bill Evans' },
    { title: 'All Of Me', cover: '/allOfMe.jpeg', midi: 'midiFiles/AllOfMe.mid', artist: 'Matsayoshi Takanaka'},
    { title: 'There Will Never Be Another You', cover: '/thereWillNeverBeAnotherYou.jpg', midi: 'midiFiles/ThereWillNeverBeAnotherYou.mid', artist: 'Chet Baker'},
    { title: '55 Dive', cover: '/55Dive.jpeg', midi: 'midiFiles/55Dive.mid', artist: 'Mike Stern'},
    { title: 'Tinkle', cover: '/55Dive.jpg', midi: 'midiFiles/twinkle2correct.mid', artist: 'Dizzy Gillespie'},

];

export default songArray;
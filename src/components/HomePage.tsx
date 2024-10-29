import React from 'react';

const songArray = [
  { title: 'True Blue', cover: '/trueBlue.jpg' },
  { title: 'Tutu', cover: 'tutu.jpg' },
  { title: 'Road Song', cover: 'roadSong.jpg' },
  { title: 'Undercurrent', cover: 'undercurrent.jpg' },
  { title: 'Romantic Warrior', cover: 'romanticWarrior.jpg' },
  { title: 'Sunday at the Village...', cover: 'sunday.jpg' },
  { title: 'The Sidewinder', cover: 'sidewinder.jpg' }
];

const HomePage: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => {
  function handleImproviseClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setPage('Improvise');
  }

  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header with User Info */}
        <header className="flex justify-between">
          <h1 className="text-white items-center text-3xl">ImprovAI</h1>
          <div className="text-right">
            <span className="text-white mr-2">David</span>
            <img
              className="inline-block h-8 w-8 rounded-full"
              src="https://via.placeholder.com/50"
              alt="User avatar"
            />
          </div>
        </header>
        
        {/* Improvise Button */}
        <section>
          <div className="flex items-center justify-center">
            <button
              className="px-8 py-4 bg-spotifyGrey hover:bg-spotifyLightGrey border border-white text-white text-3xl rounded-md"
              onClick={handleImproviseClick}
            >
              Improvise
            </button>
          </div>
        </section>
        
        {/* Improvisation Reports */}
        <section>
          <h2 className="text-xl text-white font-bold mb-4">Improvisation Reports</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Sample report cards */}
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">September 14th, 2024</h3></div>
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">September 29th, 2024</h3></div>
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">October 18th, 2024</h3></div>
            <div className="bg-spotifyGrey p-4 rounded-md"><h3 className="text-white font-semibold">View All...</h3></div>
          </div>
        </section>

        {/* Songs you might like */}
        <section className="mt-8">
          <h2 className="text-xl text-white font-bold mb-4">Set List</h2>
          <div className="flex gap-4 w-full max-w-6xl overflow-x-auto no-scrollbar">
            {songArray.map((song, index) => (
              <button key={index} onClick={() => setPage("Improvise")} className="flex-shrink-0 hover:opacity-90 bg-spotifyGrey rounded-md pb-2 items-center space-y-2 h-fit w-48">
                <div className="w-48 h-48 rounded-md overflow-hidden">
                  <img src={song.cover} alt={`${song.title} cover`} className="w-full h-full object-contain rounded-md" />
                </div>
                <h3 className="text-white font-semibold text-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  {song.title}
                </h3>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

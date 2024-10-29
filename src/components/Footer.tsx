import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-spotifyGrey p-4">
      <div className="flex justify-between items-center">
        {/* Song info */}
        <div className="flex items-center space-x-4">
          <img
            src="trueBlue.jpg"
            alt="album cover"
            className="w-12 h-12"
          />
          <div>
            <h3 className="text-white text-sm">True Blue</h3>
            <p className="text-gray-400 text-xs">Tina Brooks</p>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-volume-down"></i>
          </button>
          <input type="range" className="w-24 h-1 bg-gray-700" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

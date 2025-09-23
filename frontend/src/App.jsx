import { useState } from 'react';

import SongList from './components/SongList.jsx';

import PlaylistList from './components/PlaylistList.jsx';



function App() {

  const [selectedSong, setSelectedSong] = useState(null);



  const handleSongSelect = (song) => {

    setSelectedSong(song);

  };



  return (

    <div className="h-screen bg-[#121212] text-white grid grid-rows-[1fr_auto]">

      <div className="grid grid-cols-[auto_1fr]">



        {/* Sidebar */}

        <aside className="bg-black w-60 p-6 flex flex-col">

          <div>

            <h1 className="text-2xl font-bold mb-8">My Music</h1>

            <nav>

              <ul>

                <li className="mb-4">

                  <a href="#" className="text-lg font-semibold hover:text-green-500">Home</a>

                </li>

                <li className="mb-4">

                  <a href="#" className="text-lg font-semibold hover:text-green-500">Search</a>

                </li>

                <li className="mb-4">

                  <a href="#" className="text-lg font-semibold hover:text-green-500">Your Library</a>

                </li>

              </ul>

            </nav>

          </div>

          <PlaylistList />

        </aside>



        {/* Main View */}

        <main className="p-8 overflow-y-auto">

          <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>

          <SongList onSongSelect={handleSongSelect} />

        </main>



      </div>



      {/* Player Bar at the bottom - UPDATED SECTION */}

      <footer className="bg-[#181818] p-4 text-left border-t border-gray-800">

        {selectedSong ? (

          <div>

            <p className="font-bold">Now Playing: {selectedSong.title}</p>

            <p className="text-sm text-gray-400 mb-2">{selectedSong.artist}</p>

           

            {/* The actual HTML audio player */}

            {selectedSong.songUrl ? (

              <audio controls autoPlay key={selectedSong.id} src={selectedSong.songUrl} className="w-full">

                Your browser does not support the audio element.

              </audio>

            ) : (

              <p className="text-xs text-gray-500">No audio file available for this song.</p>

            )}



          </div>

        ) : (

          <p>No song selected</p>

        )}

      </footer>

    </div>

  );

}

export default App;

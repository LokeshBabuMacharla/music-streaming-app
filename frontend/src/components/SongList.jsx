import { useState, useEffect } from 'react';
import SongItem from './SongItem.jsx';

function SongList({ onSongSelect }) {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input

  useEffect(() => {
    // Build the URL dynamically based on the search term
    let url = 'http://localhost:8080/api/songs';
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error("Error fetching songs:", error));
  }, [searchTerm]); // This tells React to re-run the effect whenever searchTerm changes

  const handleAddSongToPlaylist = (songId) => {
    const playlistId = window.prompt("Enter the ID of the playlist to add this song to:");
    if (!playlistId) return;

    fetch(`http://localhost:8080/api/playlists/${playlistId}/songs/${songId}`, {
      method: 'POST'
    })
    .then(response => {
      if (response.ok) {
        alert('Song added to playlist successfully!');
      } else {
        alert('Failed to add song to playlist. Check if the playlist ID is correct.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred.');
    });
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for songs or artists..."
          className="bg-gray-800 text-white rounded-full p-2 w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3 className="text-2xl font-semibold mb-4">Available Songs</h3>
      <ul className="space-y-2">
        {songs.map(song => (
          <SongItem
            key={song.id}
            song={song}
            onSongSelect={onSongSelect}
            onAddToPlaylistClick={handleAddSongToPlaylist}
          />
        ))}
      </ul>
    </div>
  );
}

export default SongList;
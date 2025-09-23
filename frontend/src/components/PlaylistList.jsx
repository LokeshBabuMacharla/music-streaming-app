import { useState, useEffect } from 'react';

function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState(''); // State for the new playlist title
  const userId = 1; // We'll continue to hardcode the user ID for now

  // Function to fetch playlists
  const fetchPlaylists = () => {
    if (!userId) return;
    fetch(`http://localhost:8080/api/users/${userId}/playlists`)
      .then(response => response.json())
      .then(data => setPlaylists(data))
      .catch(error => console.error("Error fetching playlists:", error));
  };

  // Fetch playlists when the component loads
  useEffect(() => {
    fetchPlaylists();
  }, [userId]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlaylist = { title: newPlaylistTitle };

    fetch(`http://localhost:8080/api/users/${userId}/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlaylist),
    })
    .then(() => {
      setNewPlaylistTitle(''); // Clear the input field
      fetchPlaylists();     // Refresh the list of playlists
    })
    .catch(error => console.error("Error creating playlist:", error));
  };

  return (
    <div className="mt-auto pt-4 border-t border-gray-800">
      <h3 className="text-lg font-semibold mb-4">Playlists</h3>
      <ul className="space-y-2 mb-4">
        {playlists.map(playlist => (
          <li key={playlist.id} className="text-gray-400 hover:text-white cursor-pointer">
            {playlist.title}
          </li>
        ))}
      </ul>

      {/* New Form to Create a Playlist */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newPlaylistTitle}
          onChange={(e) => setNewPlaylistTitle(e.target.value)}
          placeholder="New Playlist Name"
          className="bg-gray-800 text-white text-sm rounded p-2 w-full"
          required
        />
        <button type="submit" className="bg-green-600 hover:bg-green-500 rounded-full px-4 py-1 text-sm font-bold mt-2 w-full">
          Create
        </button>
      </form>
    </div>
  );
}

export default PlaylistList;
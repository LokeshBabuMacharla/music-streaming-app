import { useState, useEffect } from 'react';

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/songs')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => console.error("Error fetching songs:", error));
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Available Songs</h3>
      <ul className="space-y-2">
        {songs.map(song => (
          <li key={song.id} className="border-b border-gray-700 p-3 rounded-md hover:bg-gray-800 cursor-pointer">
            <p className="font-bold text-lg">{song.title}</p>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
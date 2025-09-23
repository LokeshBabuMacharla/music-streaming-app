import { useState, useEffect } from 'react';

function SongItem({ song, onSongSelect, onAddToPlaylistClick }) {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // State to show/hide details

  // State for the new review form
  const [newRatingValue, setNewRatingValue] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const userId = 1; // Hardcode user ID for submitting reviews

  // Function to fetch and update ratings
  const fetchRatings = () => {
    fetch(`http://localhost:8080/api/songs/${song.id}/ratings`)
      .then(response => response.json())
      .then(data => {
        setRatings(data);
        // Calculate average rating
        if (data.length > 0) {
          const total = data.reduce((acc, curr) => acc + curr.ratingValue, 0);
          setAverageRating(total / data.length);
        } else {
          setAverageRating(0); // Reset if there are no ratings
        }
      })
      .catch(error => console.error("Error fetching ratings:", error));
  };

  // Fetch ratings when the component first loads
  useEffect(() => {
    fetchRatings();
  }, [song.id]);

  // Handle the submission of a new review
  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const newRating = {
      ratingValue: newRatingValue,
      reviewText: newReviewText
    };

    fetch(`http://localhost:8080/api/songs/${song.id}/ratings?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRating),
    })
    .then(response => response.json())
    .then(() => {
      // Clear form and re-fetch ratings to show the new one
      setNewReviewText('');
      setNewRatingValue(5);
      fetchRatings();
    })
    .catch(error => console.error("Error submitting rating:", error));
  };

  return (
    <li className="border-b border-gray-700 p-3 rounded-md hover:bg-gray-800">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {/* Song Info */}
        <div>
          <p className="font-bold text-lg">{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist}</p>
          {averageRating > 0 && (
            <p className="text-xs text-yellow-400 mt-1">
              Avg Rating: {averageRating.toFixed(1)} / 5 ★
            </p>
          )}
        </div>
        {/* Add to Playlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToPlaylistClick(song.id); }}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded-full"
        >
          +
        </button>
      </div>

      {/* Collapsible Details Section with Reviews and Form */}
      {isExpanded && (
        <div className="mt-4 pl-4 border-l-2 border-gray-600">
          {/* Form to add a new review */}
          <form onSubmit={handleReviewSubmit} className="mb-4">
            <h4 className="font-semibold mb-2">Leave a Review</h4>
            <div className="flex items-center mb-2">
              <label htmlFor={`rating-${song.id}`} className="mr-2">Rating:</label>
              <select
                id={`rating-${song.id}`}
                value={newRatingValue}
                onChange={(e) => setNewRatingValue(e.target.value)}
                className="bg-gray-700 rounded p-1"
              >
                <option value="5">5 ★</option>
                <option value="4">4 ★</option>
                <option value="3">3 ★</option>
                <option value="2">2 ★</option>
                <option value="1">1 ★</option>
              </select>
            </div>
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Write your review..."
              className="bg-gray-700 rounded p-2 w-full text-sm mt-2"
              rows="2"
            ></textarea>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded-full text-sm mt-2">
              Submit Review
            </button>
          </form>

          {/* List of existing reviews */}
          <h4 className="font-semibold mb-2">Reviews:</h4>
          {ratings.length > 0 ? (
            <ul className="space-y-3">
              {ratings.map(rating => (
                <li key={rating.id} className="text-sm">
                  <p className="text-yellow-400">{'★'.repeat(rating.ratingValue)}</p>
                  <p className="text-gray-300 italic">"{rating.reviewText}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      )}
    </li>
  );
}

export default SongItem;
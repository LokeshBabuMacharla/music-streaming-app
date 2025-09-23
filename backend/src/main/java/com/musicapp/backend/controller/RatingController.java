package com.musicapp.backend.controller;

import com.musicapp.backend.model.Rating;
import com.musicapp.backend.model.Song;
import com.musicapp.backend.model.User;
import com.musicapp.backend.repository.RatingRepository;
import com.musicapp.backend.repository.SongRepository;
import com.musicapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/songs/{songId}/ratings")
public class RatingController {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private UserRepository userRepository;

    // Endpoint to get all ratings for a specific song
    @GetMapping
    public ResponseEntity<List<Rating>> getRatingsForSong(@PathVariable Long songId) {
        List<Rating> ratings = ratingRepository.findBySongId(songId);
        return ResponseEntity.ok(ratings);
    }

    // Endpoint to create a new rating for a song by a user
    @PostMapping
    public ResponseEntity<Rating> addRating(@PathVariable Long songId,
                                            @RequestParam Long userId,
                                            @RequestBody Rating ratingRequest) {
        // Find the song and user from the database
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new RuntimeException("Song not found with id: " + songId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Link them to the new rating object and save it
        ratingRequest.setSong(song);
        ratingRequest.setUser(user);
        Rating savedRating = ratingRepository.save(ratingRequest);

        return ResponseEntity.ok(savedRating);
    }
}
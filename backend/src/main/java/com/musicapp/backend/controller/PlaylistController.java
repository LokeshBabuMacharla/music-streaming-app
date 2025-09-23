package com.musicapp.backend.controller;

import com.musicapp.backend.model.Playlist;
import com.musicapp.backend.model.Song; // <-- Add Song import
import com.musicapp.backend.repository.PlaylistRepository;
import com.musicapp.backend.repository.SongRepository; // <-- Add SongRepository import
import com.musicapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <-- Add ResponseEntity import
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/playlists") // Changed for simplicity
public class PlaylistController {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SongRepository songRepository; // <-- Autowire SongRepository

    // This endpoint is now GET /api/playlists?userId=1
    @GetMapping
    public List<Playlist> getPlaylistsByUser(@RequestParam Long userId) {
        return playlistRepository.findByUserId(userId);
    }

    // This endpoint is now POST /api/playlists?userId=1
    @PostMapping
    public Playlist createPlaylist(@RequestParam Long userId, @RequestBody Playlist playlist) {
        return userRepository.findById(userId).map(user -> {
            playlist.setUser(user);
            return playlistRepository.save(playlist);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + userId));
    }

    // ADD THIS NEW METHOD
    // Endpoint to add a song to a playlist
    @PostMapping("/{playlistId}/songs/{songId}")
    public ResponseEntity<Playlist> addSongToPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new RuntimeException("Playlist not found"));
        Song song = songRepository.findById(songId).orElseThrow(() -> new RuntimeException("Song not found"));

        playlist.getSongs().add(song);
        playlistRepository.save(playlist);
        return ResponseEntity.ok(playlist);
    }
}
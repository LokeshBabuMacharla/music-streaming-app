package com.musicapp.backend.controller;

import com.musicapp.backend.model.Song;
import com.musicapp.backend.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin // Allow requests from any origin for local dev
@RestController
@RequestMapping("/api/songs")
public class SongController {

    @Autowired
    private SongRepository songRepository;

    // Endpoint to get all songs OR search for songs
    @GetMapping
    public List<Song> getAllSongs(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            // If a search term is provided, use the new search method
            return songRepository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(search, search);
        }
        // If no search term, return all songs as before
        return songRepository.findAll();
    }

    // Endpoint to add a new song
    @PostMapping
    public Song addSong(@RequestBody Song newSong) {
        return songRepository.save(newSong);
    }
}
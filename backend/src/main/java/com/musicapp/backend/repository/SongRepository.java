package com.musicapp.backend.repository;

import com.musicapp.backend.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Make sure this is imported

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    // New method for searching across multiple fields
    List<Song> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCase(String title, String artist);
}
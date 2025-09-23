package com.musicapp.backend.repository;

import com.musicapp.backend.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Add this import

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    // This method will automatically find all playlists for a given user ID
    List<Playlist> findByUserId(Long userId);
}
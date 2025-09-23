package com.musicapp.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "songs")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String artist;
    private String album;
    private String genre;
    private int durationInSeconds;

    private String songUrl; // <-- ADD THIS NEW FIELD

    @ManyToMany(mappedBy = "songs")
    @JsonIgnore
    private Set<Playlist> playlists = new HashSet<>();
}
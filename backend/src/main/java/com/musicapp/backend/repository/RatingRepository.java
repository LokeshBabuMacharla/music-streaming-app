package com.musicapp.backend.repository;

import com.musicapp.backend.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    // Custom method to find all ratings for a specific song
    List<Rating> findBySongId(Long songId);
}
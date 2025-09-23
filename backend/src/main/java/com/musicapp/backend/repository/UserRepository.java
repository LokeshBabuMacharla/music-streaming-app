package com.musicapp.backend.repository;

import com.musicapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA automatically creates methods like save(), findById(), etc.
    // We can add custom query methods here later if we need them.
}
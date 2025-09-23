package com.musicapp.backend.controller;

import com.musicapp.backend.model.User;
import com.musicapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List; // <-- Make sure this import is added

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    // ADD THIS NEW METHOD
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
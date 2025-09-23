# Music Streaming App

A full-stack music streaming application built with React, Spring Boot, and MySQL, containerized with Docker. This project was built to satisfy all requirements for the project review, including local development, full-stack Docker deployment, and a CI/CD pipeline.

## Features Implemented
- User Registration and Login
- Song and Playlist Creation
- Add Songs to Playlists
- Rate and Review Songs
- Search for Songs by Title or Artist
- Stream Music from Cloud Storage (AWS S3)

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Spring Boot, Spring Data JPA, Spring Security
- **Database:** MySQL
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

---

## How to Run the Project

### Method 1: Docker Compose (Recommended for Review)

This method runs the entire full-stack application with a single command.

1.  **Prerequisite:** Ensure Docker Desktop is installed and running.
2.  **Run:** Open a terminal in the project's root folder (the one containing `docker-compose.yml`) and run the following command:
    ```bash
    docker compose up --build
    ```
3.  **Access:** Once the containers are running, the application will be available at **`http://localhost`**.

### Method 2: Local Development Environment

1.  **Start Backend:** Open the `backend` folder in a Java IDE (like Eclipse) and run the `BackendApplication.java` file. The server will start on `http://localhost:8080`.
2.  **Start Frontend:** Open a terminal in the `frontend` folder and run `npm install`, followed by `npm run dev`. The application will be available at `http://localhost:5173`.
# Stage 1: Build the application using Maven
FROM maven:3.8-eclipse-temurin-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the project's pom.xml to download dependencies
COPY pom.xml .

# Copy the mvn wrapper
COPY .mvn .mvn

# Copy the source code
COPY src ./src

# Build the application, creating the .jar file. Skip tests to speed up the build.
RUN mvn package -DskipTests


# Stage 2: Create the final, smaller image using only the Java Runtime
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the .jar file from the 'build' stage into this final image
COPY --from=build /app/target/*.jar app.jar

# Tell Docker that the container will listen on this port
EXPOSE 8080

# The command to run when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]
# Getting Started Guide: Library Management System API

## Introduction

This guide provides instructions on how to set up and run the Library Management System API project. The project utilizes Docker Compose for managing dependencies and can be run either with Docker or directly on the host machine.

## Prerequisites

Ensure you have the following installed on your system:

-   Docker
-   Node.js (version 20 or higher)
-   npm (Node Package Manager)

## Running with Docker Compose

1. Clone the project repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to start the Docker containers:

    ```bash
    docker-compose up
    ```

4. Wait for the containers to start. Once started, the API will be accessible at `http://localhost:3000`.

## Running Service only on Docker (Application on host machine)

1. Clone the project repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to install dependencies:
    ```bash
    npm install
    ```
4. Run the following command to start the Docker containers:

    ```bash
    nom run start-service
    ```

5. Run the following command to initialize the project and build:
    ```bash
    npm run initialize
    ```
6. Start the application in development mode (Typescript and nodemon):
    ```bash
    npm run dev
    ```
7. Or run the built javascript version using
    ```bash
    npm run start
    ```
8. The API will be accessible at `http://localhost:3000`.

## Accessing API Documentation

-   The API documentation is available in Swagger UI.
-   Access it at `http://localhost:3000/documentation` while running in development mode (`NODE_ENV=development`).
-   or access the markdown version [here](./docs/api-docs.md)

## Notes

-   When running the Docker Compose setup, it may need to be restarted after the initial build due to intermittent behavior.
-   Ensure Docker is installed and running properly before attempting to start the project.
-   Make sure port 3000 is not occupied by any other application while running the API directly on the host machine.


## Accessing Additional Documentation

For more detailed information about the project architecture, database schema, and folder structure, refer to the following documents:

-   [Architecture Overview](./docs/architecture.md): Provides insights into the architecture of the Library Management System API, including its layers and components.
-   [Database Schema](./docs/db.md): Describes the database schema used in the project, detailing the tables and their relationships.
-   [Folder Structure](./docs/structure.md): Explains the folder structure of the project, highlighting the organization of files and directories.


Refer to these documents for comprehensive understanding and reference regarding the project components and structure.

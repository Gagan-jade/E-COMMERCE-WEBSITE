# Project Name

## Overview

This project consists of a backend server and a React frontend. Follow the instructions below to set up and run the project.

## Getting Started

### Prerequisites

- Node.js
- npm 
- MongoDB
- Cloudinary account (if using Cloudinary for image uploads)
- React
- Tailwind CSS

### Backend Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-name>/backend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

    Ensure you have `express`, `mongoose`, `bcrypt`, and other required dependencies. If you encounter a "module not found" error, install the missing module.

3. Open `index.js` and make sure the server is set to run on port 8080 or any other desired port. If you change the port, remember to update it in the frontend configuration.

4. Start the backend server:

    ```bash
    node index.js
    ```

    This should establish a connection to your MongoDB database and start the server.

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Update the frontend configuration to match the port used by the backend server if it differs from 8080.

4.  Ensure the `assets` folder is present in the root of the frontend folder.

5. Start the React app:

    ```bash
    npm start
    ```

### Configuration

- **Database**: If you want to use your own MongoDB database, update the connection string in the backend configuration.
- **Cloudinary**: Update the Cloudinary name in the configuration if you are using Cloudinary for image uploads.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.


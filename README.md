# Spotify Backend API

A Node.js backend API for a Spotify-like music streaming platform, built with Express.js, MongoDB, and JWT authentication. Supports user/artist roles, music uploads, album creation, and retrieval of music and albums.

## Features

- **User Authentication**: Register, login, and logout with JWT tokens.
- **Role-Based Access**: Separate permissions for users and artists.
- **Music Upload**: Artists can upload music files using ImageKit for storage.
- **Album Management**: Users can create albums containing multiple music tracks.
- **Music & Album Retrieval**: Public endpoints to fetch all music and albums.
- **Secure Storage**: File uploads handled via ImageKit cloud storage.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: ImageKit
- **Middleware**: Multer for file uploads, Cookie-parser for tokens
- **Other**: bcryptjs for password hashing, dotenv for environment variables

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shruti-patel06/Spotify-Backend.git
   cd Spotify-Backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your actual values:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     IMAGE_PRIVATE_KEY=your_imagekit_private_key
     ```

4. **Start the server**:
   - Development: `npm run dev` (uses nodemon)
   - Production: `npm start`

The server will run on `http://localhost:3000`.

## Usage

### Authentication
- **Register**: POST `/api/auth/register` - Body: `{ "username", "email", "password", "role" }`
- **Login**: POST `/api/auth/login` - Body: `{ "email", "password" }` - Returns JWT token in cookie.
- **Logout**: POST `/api/auth/logout` - Requires auth token.

### Music (Artist Only)
- **Upload Music**: POST `/api/music/upload` - Form-data: `music` (file), requires artist token.

### Albums (Authenticated Users)
- **Create Album**: POST `/api/music/album` - Body: `{ "title", "musics": ["id1", "id2"] }`, requires user token.

### Public Endpoints
- **Get All Music**: GET `/api/music/musics`
- **Get All Albums**: GET `/api/music/albums` - Requires user token.
- **Get Album by ID**: GET `/api/music/albums/:albumId` - Requires user token.

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register a new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/auth/logout | Logout user | Yes |
| POST | /api/music/upload | Upload music (artists only) | Yes (Artist) |
| POST | /api/music/album | Create album | Yes (User) |
| GET | /api/music/musics | Get all music | No |
| GET | /api/music/albums | Get all albums | Yes (User) |
| GET | /api/music/albums/:id | Get album by ID | Yes (User) |

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT signing.
- `IMAGE_PRIVATE_KEY`: ImageKit private key for file uploads.

## Project Structure

```
Spotify-Backend/
├── .env.example          # Environment variables template
├── .gitignore            # Ignored files
├── package.json          # Dependencies and scripts
├── server.js             # Server entry point
└── src/
    ├── app.js            # Express app setup
    ├── controllers/      # Route handlers
    │   ├── auth.controllers.js
    │   └── music.controllers.js
    ├── middlewares/      # Custom middlewares
    │   └── auth.middleware.js
    ├── models/           # Mongoose models
    │   ├── user.model.js
    │   ├── music.model.js
    │   └── albums.model.js
    ├── routes/           # API routes
    │   ├── auth.routes.js
    │   └── music.routes.js
    ├── services/         # External services
    │   └── storage.services.js
    └── db/               # Database connection
        └── db.js
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add feature'`.
4. Push to branch: `git push origin feature-name`.
5. Open a pull request.


## Project Structure

    ├── controllers/      # Route handlers
    │   ├── auth.controllers.js
    │   └── music.controllers.js
    ├── middlewares/      # Authentication middleware
    │   └── auth.middleware.js
    ├── models/           # Mongoose models
    │   ├── user.model.js
    │   ├── music.model.js
    │   └── albums.model.js
    ├── routes/           # API routes
    │   ├── auth.routes.js
    │   └── music.routes.js
    ├── services/         # External services
    │   └── storage.services.js
    └── db/               # Database connection
        └── db.js
```
## Future Enhancements

- Implement playlist creation.
- Add search and filtering for music/albums.
- Integrate with a frontend for full app.
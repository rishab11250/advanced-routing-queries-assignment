# Notes Management REST API (Assignment 02)

A robust RESTful API built with Node.js, Express, and MongoDB for managing personal notes. This project demonstrates advanced routing techniques including route parameters, query parameters, pagination, and sorting.

## 🚀 Live Links
- **Deployed API:** [https://advanced-routing-queries-assignment.onrender.com](https://advanced-routing-queries-assignment.onrender.com)
- **Postman Documentation:** [https://documenter.getpostman.com/view/50839472/2sBXqGpLyK](https://documenter.getpostman.com/view/50839472/2sBXqGpLyK)

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Environment Management:** dotenv
- **Development Tools:** Nodemon

## 📂 Project Structure (MVC)
```text
notes-app/
├── src/
│   ├── config/         # Database connection configuration
│   ├── models/         # Mongoose schema and model definitions
│   ├── controllers/    # Request handling logic
│   ├── routes/         # Route definitions and mapping
│   ├── app.js          # Express app configuration
│   └── index.js        # Server entry point
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

## 📝 Features & Endpoints

### 1. CRUD Operations
- `POST /api/notes`: Create a single note.
- `POST /api/notes/bulk`: Create multiple notes at once.
- `GET /api/notes`: Fetch all notes.
- `GET /api/notes/:id`: Fetch a specific note by ID.
- `PUT /api/notes/:id`: Full replacement of a note.
- `PATCH /api/notes/:id`: Partial update of a note.
- `DELETE /api/notes/:id`: Delete a single note.
- `DELETE /api/notes/bulk`: Delete multiple notes using an array of IDs.

### 2. Advanced Routing (Route Parameters)
- `GET /api/notes/category/:category`: Filter notes by specific category (work, personal, study).
- `GET /api/notes/status/:isPinned`: Filter notes by pinned status (true/false).
- `GET /api/notes/:id/summary`: Fetch a note with only specific fields (title, category, isPinned, createdAt).

### 3. Query Parameter Filtering
- `GET /api/notes/filter`: General filter using query strings (e.g., `?category=work&isPinned=true`).
- `GET /api/notes/filter/pinned`: Fetch pinned notes with optional category filter.
- `GET /api/notes/filter/category`: Filter by category name using `?name=work`.
- `GET /api/notes/filter/date-range`: Filter notes within a specific date range (`?from=YYYY-MM-DD&to=YYYY-MM-DD`).

### 4. Pagination & Sorting
- `GET /api/notes/paginate`: Get paginated results (`?page=1&limit=10`).
- `GET /api/notes/paginate/category/:category`: Paginated notes within a specific category.
- `GET /api/notes/sort`: Sort all notes by field and order (`?sortBy=title&order=asc`).
- `GET /api/notes/sort/pinned`: Sort only pinned notes.

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd advanced-routing-queries-assignment
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the server:**
   - For development: `pnpm run dev`
   - For production: `pnpm start`

## 📜 License
This project is for educational purposes as part of the SEM-2 Backend Assignment.

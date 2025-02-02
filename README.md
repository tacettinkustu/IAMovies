# 📽️ IAMovies - Movie Search & Discovery App
IAMovies is a **React-based movie search and discovery** application powered by **OMDb API**. Users can browse movies, filter by year/type, view detailed information, and paginate through results.

---

![ScreenRecording2025-02-02at2 46 37PM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/706c11a1-4152-454b-a513-d5e8803dcc4a)

---
## 🚀 Features
- 🎬 **Search for movies** by name with a default search query (`Pokemon`).
- 🗂️ **Browse movie listings** in a **grid layout** (5 per row on desktop).
- 🔎 **Filter movies by year and type** (Movies, TV Series, Episodes).
- 📄 **Paginated results** (10 movies per page).
- 📜 **Detailed movie pages** including:
  - Movie poster 🎥
  - Title, release year 📅
  - IMDb rating ⭐
  - Cast & genre 🎭
  - Director & plot 📖
- 🎞️ **Responsive UI** (works on all screen sizes).

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Redux Toolkit
- **Styling:** Tailwind CSS, SCSS
- **State Management:** Redux Toolkit (RTK Query)
- **Data Source:** [OMDb API](https://www.omdbapi.com/)
- **Routing:** React Router DOM
- **Animations:** Framer Motion

---

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/IAMovies.git
cd IAMovies
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure API Key
Create a **`.env`** file in the root directory and add your **OMDb API Key**:
```sh
VITE_OMDB_API_KEY=your_api_key_here
VITE_OMDB_API_BASE_URL=https://www.omdbapi.com/
```

### 4️⃣ Run the Project
```sh
npm run dev
```
This will start the development server at `http://localhost:5173`.

---

## 📂 Project Structure
```
📦 IAMovies
 ┣ 📂 src
 ┃ ┣ 📂 common          # Reusable components (Loader, Header, Footer, etc.)
 ┃ ┣ 📂 components      # UI Components (MovieCard, Casts, Genre, etc.)
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 Catalog      # Movie listing page
 ┃ ┃ ┣ 📂 Detail       # Movie detail page
 ┃ ┃ ┗ 📂 NotFound     # 404 page
 ┃ ┣ 📂 services       # API calls (Redux Toolkit Query)
 ┃ ┣ 📂 styles         # SCSS/Tailwind CSS styles
 ┃ ┣ 📜 App.tsx        # Main app file
 ┃ ┣ 📜 main.tsx       # React entry point
 ┃ ┗ 📜 types.ts       # TypeScript interfaces
 ┣ 📜 package.json     # Project dependencies
 ┣ 📜 tailwind.config.js  # Tailwind CSS config
 ┣ 📜 tsconfig.json    # TypeScript config
 ┣ 📜 vite.config.ts   # Vite config
 ┗ 📜 README.md        # Project documentation
```

---

## 🎬 Usage Guide
### 🔎 Searching for Movies
- Enter a movie name in the **search bar**.
- Results appear dynamically with **pagination**.
- **Default search**: `Pokemon`

### 📅 Filtering
- Filter movies by **year** and **type** (Movie, TV Series, Episode).

### 📜 Viewing Movie Details
- Click a movie to open the **detailed page**.
- See **poster, title, IMDb rating, genre, director, and cast**.

---

## 🎨 UI Preview
🚀 **Dark & Light Mode Support!**  
🖼 **Responsive Design!**  
📜 **Movie Details View!**

---

## 🛠️ API Integration (OMDb API)
### Endpoints Used
1️⃣ **Search Movies**:  
   ```
   GET https://www.omdbapi.com/?s={search}&apikey={API_KEY}&page={page}
   ```
2️⃣ **Get Movie Details**:  
   ```
   GET https://www.omdbapi.com/?i={imdbID}&apikey={API_KEY}&plot=full
   ```

---

## 👨‍💻 Contributors
💡 Developed by **[Your Name]**  
💌 Feel free to **contribute, fork, or report issues**.

---

## 📜 License
This project is **open-source** under the **MIT License**.

---

### 🚀 IAMovies - Enjoy exploring movies! 🎬🍿


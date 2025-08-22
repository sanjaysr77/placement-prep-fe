This is the frontend of a Quiz Web Application built using React, TypeScript, and Tailwind CSS.
The application allows users to attempt quizzes, track their progress, and get instant validation against the correct answers stored in the backend.

✨ Features

Randomized Questions: Fetches 10 random questions from the database for every quiz attempt.

Multiple Choice Support: Each question comes with multiple options displayed as checkboxes/radio buttons.

Answer Validation: User’s selected options are validated against the correct answer from the database.

Responsive UI: Fully responsive interface styled with Tailwind CSS for seamless use across devices.

Dynamic Rendering: Uses React hooks (useState, useEffect) to manage question state, selections, and results dynamically.

🛠️ Tech Stack

React + Next.js – Component-based UI and routing

TypeScript – Type safety for cleaner, scalable code

Tailwind CSS – Utility-first styling

ShadCN UI (optional, if used) – Prebuilt accessible UI components

📌 Frontend Flow

Fetches 10 random questions from backend API.

Renders each question with its multiple-choice options.

Allows users to select answers and submit.

Displays result/validation instantly.

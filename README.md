## Taskbar Project
## Overview
The Taskbar Project is a full‑stack application built with React (frontend) and FastAPI (backend). It provides a clean interface for creating, editing, and tracking tasks with real‑time updates. The project demonstrates seamless frontend–backend integration and unified deployment.

## Features
1. Task creation, editing, and deletion

2. Responsive React UI with modern styling

3. FastAPI backend with RESTful endpoints

4. Real‑time updates via Fetch API

5. Unified deployment (frontend + backend together)

## Tech Stack
1. Frontend: React + Vite

2. Backend: FastAPI (Python)

3. Build Tools: npm, pip

## Installation
## Backend

cd Backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Frontend

cd task-board-frontend
npm install
npm run dev   # for development
npm run build # creates dist folder for production

## Deployment
Copy the React dist folder into the FastAPI static directory to serve both frontend and backend from one server.

## Usage
1. Start the FastAPI backend.

2. Run the React frontend (or serve the built dist).

3. Open the app in your browser and begin managing tasks.

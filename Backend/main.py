from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve React static files
app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")


# In-memory storage
tasks = []
task_id_counter = 1


# Task model
class Task(BaseModel):
    title: str
    completed: bool = False


# Serve React app
@app.get("/")
def serve_react():
    return FileResponse("static/index.html")


# Add new task
@app.post("/tasks")
def add_task(task: Task):
    global task_id_counter

    new_task = {
        "id": task_id_counter,
        "title": task.title,
        "completed": task.completed
    }

    tasks.append(new_task)
    task_id_counter += 1

    return new_task


# Get all tasks
@app.get("/tasks")
def list_tasks():
    return tasks


# Mark task as complete
@app.put("/tasks/{task_id}/complete")
def complete_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
            return task
    return {"error": "Task not found"}


# Delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return {"message": "Task deleted"}
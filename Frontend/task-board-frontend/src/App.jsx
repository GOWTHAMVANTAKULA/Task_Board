import { useState, useEffect } from "react";

function App() {

  const API = "";

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  const fetchTasks = () => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = () => {

    if (newTask.trim() === "") return;

    fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newTask })
    })
      .then(res => res.json())
      .then(task => {
        setTasks([...tasks, task]);
        setNewTask("");
      });
  };

  // Mark task complete
  const toggleTask = (id) => {

    fetch(`${API}/tasks/${id}/complete`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t => (t.id === id ? updated : t)));
      });

  };

  // Delete task
  const deleteTask = (id) => {

    fetch(`${API}/tasks/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });

  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  return (

    <div style={{
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>

      <div style={{
        width: "450px",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
      }}>

        <h1 style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333"
        }}>
          Task Board
        </h1>

        {/* Input Section */}

        <div style={{
          display: "flex",
          marginBottom: "20px"
        }}>

          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px"
            }}
          />

          <button
            onClick={addTask}
            style={{
              marginLeft: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Add
          </button>

        </div>

        {/* Task List */}

        <div>

          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fafafa",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #eee"
              }}
            >

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span>
                  {task.title}
                </span>

              </div>

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>
          ))}

        </div>

        {/* Progress Bar */}

        <div style={{ marginTop: "25px" }}>

          <div style={{
            background: "#ddd",
            height: "10px",
            borderRadius: "5px"
          }}>

            <div
              style={{
                background: "#28a745",
                height: "10px",
                width: `${progress}%`,
                borderRadius: "5px",
                transition: "0.3s"
              }}
            ></div>

          </div>

          <p style={{
            marginTop: "8px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            {completedCount} of {tasks.length} tasks completed
          </p>

        </div>

      </div>

    </div>

  );
}

export default App;
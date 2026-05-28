import React, { useEffect, useState } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

const API = import.meta.env.VITE_API_URL || "/api"
export default function App() {
  const [tasks, setTasks] = useState([])

  async function loadTasks() {
    const res = await fetch(`${API}/tasks`)
    const data = await res.json()
    setTasks(data)
  }

  async function addTask(title) {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    loadTasks()
  }

  async function toggleDone(task) {
    await fetch(`${API}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    })
    loadTasks()
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" })
    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>TaskFlow</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleDone} onDelete={deleteTask} />
    </div>
  )
}
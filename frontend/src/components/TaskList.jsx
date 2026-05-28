import React from "react"

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p style={{ color: "#888" }}>No tasks yet.</p>
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task)}
          />
          <span
            style={{
              flex: 1,
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "#aaa" : "#000",
            }}
          >
            {task.title}
          </span>
          <button
            onClick={() => onDelete(task.id)}
            style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
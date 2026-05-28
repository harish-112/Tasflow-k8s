import React, { useState } from "react"

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flex: 1, padding: "8px", fontSize: "16px" }}
      />
      <button type="submit" style={{ padding: "8px 16px", fontSize: "16px" }}>
        Add
      </button>
    </form>
  )
}
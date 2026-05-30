import { useState } from 'react'
import axios from 'axios'
import '../styles/TaskCard.css'

function TaskCard({ task, token, onTasksChange }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async (newStatus) => {
    setLoading(true)
    try {
      await axios.put(`/api/tasks/${task._id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      onTasksChange()
    } catch (err) {
      console.error('Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true)
      try {
        await axios.delete(`/api/tasks/${task._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        onTasksChange()
      } catch (err) {
        console.error('Failed to delete task')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      await axios.put(`/api/tasks/${task._id}`,
        editedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setIsEditing(false)
      onTasksChange()
    } catch (err) {
      console.error('Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  const getPriorityClass = (priority) => {
    return `priority-${priority}`
  }

  const getStatusClass = (status) => {
    return `status-${status}`
  }

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
          className="edit-input"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
          className="edit-textarea"
        />
        <select
          value={editedTask.priority}
          onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
          className="edit-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="edit-buttons">
          <button className="btn btn-primary" onClick={handleUpdate} disabled={loading}>
            Save
          </button>
          <button className="btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </div>
      </div>
      
      {task.description && <p className="task-description">{task.description}</p>}
      
      <div className="task-meta">
        {task.dueDate && (
          <span className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
          disabled={loading}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn-edit" onClick={() => setIsEditing(true)} disabled={loading}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard

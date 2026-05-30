import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import '../styles/Dashboard.css'

function Dashboard({ setIsAuthenticated }) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchTasks()
    setupSocket()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTasks(response.data)
    } catch (err) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const setupSocket = () => {
    const socket = io('http://localhost:5000')
    socket.on('connect', () => {
      socket.emit('join-room', user.id)
    })
    socket.on('task-created', (task) => {
      setTasks([task, ...tasks])
    })
    socket.on('task-updated', (updatedTask) => {
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t))
    })
    socket.on('task-deleted', (taskId) => {
      setTasks(tasks.filter(t => t._id !== taskId))
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Management</h1>
        <div className="header-right">
          <span>Welcome, {user.name}</span>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <TaskForm onTaskCreated={fetchTasks} token={token} />

        <div className="tasks-section">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
              onClick={() => setFilter('todo')}
            >
              To Do
            </button>
            <button 
              className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList tasks={filteredTasks} token={token} onTasksChange={fetchTasks} />
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard

import TaskCard from './TaskCard'
import '../styles/TaskList.css'

function TaskList({ tasks, token, onTasksChange }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard 
          key={task._id} 
          task={task} 
          token={token}
          onTasksChange={onTasksChange}
        />
      ))}
    </div>
  )
}

export default TaskList

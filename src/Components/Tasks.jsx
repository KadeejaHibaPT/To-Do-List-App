import React, { useState } from 'react';
import { FaBell, FaEdit, FaTrash } from 'react-icons/fa';
import Calendar from './Calendar.jsx';
import '../Components/TasksPage.css';

const TasksPage = ({
  setPage,
  groupTasks,
  setGroupTasks,
  tasksByDate,
  setTasksByDate
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [filter, setFilter] = useState('all');
  const [editingIndex, setEditingIndex] = useState(null);

  const [newTask, setNewTask] = useState({
    label: '',
    title: '',
    time: '',
    status: 'todo',
  });

  const updateGroupProgress = (label, newStatus) => {
    const updatedGroups = groupTasks.map(group => {
      if (group.title === label) {
        const updated = { ...group };
        updated.tasks += 1;
        if (newStatus === 'done') updated.completed += 1;
        updated.percentage = Math.min(100, Math.round((updated.completed / updated.tasks) * 100));
        return updated;
      }
      return group;
    });
    setGroupTasks(updatedGroups);
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.label) return;

    const updated = { ...tasksByDate };
    const taskForDay = updated[selectedDay] || [];

    if (editingIndex !== null) {
      taskForDay[editingIndex] = newTask;
      setEditingIndex(null);
    } else {
      taskForDay.push({ ...newTask });
      updateGroupProgress(newTask.label, newTask.status);
    }

    updated[selectedDay] = [...taskForDay];
    setTasksByDate(updated);
    setNewTask({ label: '', title: '', time: '', status: 'todo' });
  };

  const handleDeleteTask = index => {
    const updated = { ...tasksByDate };
    const taskForDay = updated[selectedDay] || [];
    taskForDay.splice(index, 1);
    updated[selectedDay] = taskForDay;
    setTasksByDate(updated);
  };

  const handleEditTask = index => {
    const task = tasksByDate[selectedDay][index];
    setNewTask(task);
    setEditingIndex(index);
  };

  const filteredTasks = (tasksByDate[selectedDay] || []).filter(
    task => filter === 'all' || task.status === filter
  );

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <button className="back-button" onClick={() => setPage('dashboard')}>←</button>
        <h2>Today's Tasks</h2>
        <FaBell className="notification-icon" />
      </header>

      <Calendar selectedDay={selectedDay} onDayClick={setSelectedDay} />

      <div className="add-task-form">
        <select
          value={newTask.label}
          onChange={e => setNewTask({ ...newTask, label: e.target.value })}
        >
          <option value="">Select Group</option>
          {groupTasks.map((group, index) => (
            <option key={index} value={group.title}>
              {group.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="time"
          value={newTask.time}
          onChange={e => setNewTask({ ...newTask, time: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={e => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="todo">To-do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={handleAddTask}>
          {editingIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="task-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'todo' ? 'active' : ''} onClick={() => setFilter('todo')}>To do</button>
        <button className={filter === 'in-progress' ? 'active' : ''} onClick={() => setFilter('in-progress')}>In Progress</button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Completed</button>
      </div>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, i) => {
            const indexInOriginal = (tasksByDate[selectedDay] || []).findIndex(
              t => t === task
            );
            return (
              <div key={i} className={`task-card ${task.status}`}>
                <p className="label">{task.label}</p>
                <h4>{task.title}</h4>
                <p className="time">{task.time}</p>
                <span className={`status ${task.status}`}>{task.status.replace('-', ' ')}</span>
                <div className="task-actions">
                  <button onClick={() => handleEditTask(indexInOriginal)} title="Edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteTask(indexInOriginal)} title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default TasksPage;

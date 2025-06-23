import React, { useState, useEffect } from 'react';
import './App1.css';
import { FaTasks, FaUser, FaPlus , FaBook,FaTrash } from 'react-icons/fa';
import Tasks from './Tasks.jsx';
import Profile from './Profile.jsx';

// ✅ Move Dashboard to separate file if desired
const Dashboard = ({ setPage, groupTasks, setGroupTasks, profile }) => {
  const [newGroup, setNewGroup] = useState({ title: '', tasks: '', completed: '' });

  const iconMap = {
    FaTasks: <FaTasks className="icon pink" />,
    FaUser: <FaUser className="icon purple" />,
    FaBook: <FaBook className="icon orange" />,
    default: <FaTasks className="icon" />
  };

  const handleAddGroup = () => {
    if (!newGroup.title || !newGroup.tasks || !newGroup.completed) return;
    const tasks = parseInt(newGroup.tasks);
    const completed = parseInt(newGroup.completed);
    const percentage = Math.min(100, Math.round((completed / tasks) * 100));
    setGroupTasks([
      ...groupTasks,
      {
        title: newGroup.title,
        tasks,
        completed,
        percentage,
        icon: 'FaTasks',
        color: 'gray'
      }
    ]);
    setNewGroup({ title: '', tasks: '', completed: '' });
  };

  const handleDeleteGroup = (index) => {
    const updatedGroups = groupTasks.filter((_, i) => i !== index);
    setGroupTasks(updatedGroups);
  };

  const totalTasks = groupTasks.reduce((sum, group) => sum + group.tasks, 0);
  const totalCompleted = groupTasks.reduce((sum, group) => sum + group.completed, 0);
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div className="user-info">
          {profile.avatar ? (
            <img src={profile.avatar} alt="User Avatar" className="avatar" onClick={() => setPage('profile')} />
          ) : (
            <div className="avatar-placeholder" onClick={() => setPage('profile')}>👤</div>
          )}
          <div>
            <p className="greeting">Hello!</p>
            <h2 className="username">{profile.name || 'User'}</h2>
          </div>
        </div>
      </section>

      <section className="task-status">
        <p>Your today’s task almost done!</p>
        <div className="task-progress">
          <div className="progress-circle">
            <span>{overallPercentage}%</span>
          </div>
          <button className="view-task-btn" onClick={() => setPage('tasks')}>View Task</button>
        </div>
      </section>

      <section className="task-groups">
        <h3>Task Groups</h3>
        <div className="group-form">
          <input type="text" placeholder="Group Title" value={newGroup.title} onChange={e => setNewGroup({ ...newGroup, title: e.target.value })} />
          <input type="number" placeholder="Total Tasks" value={newGroup.tasks} onChange={e => setNewGroup({ ...newGroup, tasks: e.target.value })} />
          <input type="number" placeholder="Completed Tasks" value={newGroup.completed} onChange={e => setNewGroup({ ...newGroup, completed: e.target.value })} />
          <button onClick={handleAddGroup}>Add Group</button>
        </div>

        <div className="group-list">
          {groupTasks.map((group, index) => (
            <div key={index} className="group">
              {iconMap[group.icon] || iconMap.default}
              <div className="group-details">
                <p>{group.title}</p>
                <small>{group.completed} of {group.tasks} Tasks</small>
              </div>
              <span className={`percentage ${group.color}`}>{group.percentage}%</span>
              <button onClick={() => handleDeleteGroup(index)} className="delete-btn"><FaTrash /></button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState('dashboard');

  const [groupTasks, setGroupTasks] = useState(() => {
    const stored = localStorage.getItem('groupTasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [tasksByDate, setTasksByDate] = useState(() => {
    const stored = localStorage.getItem('tasksByDate');
    return stored ? JSON.parse(stored) : {};
  });

  const [profile, setProfile] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('userProfile'));
    return saved || { name: '', email: '', bio: '', avatar: null };
  });

  useEffect(() => {
    localStorage.setItem('groupTasks', JSON.stringify(groupTasks));
  }, [groupTasks]);

  useEffect(() => {
    localStorage.setItem('tasksByDate', JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  return (
    <div className="app-container">
      {page === 'dashboard' ? (
        <Dashboard
          setPage={setPage}
          groupTasks={groupTasks}
          setGroupTasks={setGroupTasks}
          profile={profile}
        />
      ) : page === 'tasks' ? (
        <Tasks
          groupTasks={groupTasks}
          setGroupTasks={setGroupTasks}
          tasksByDate={tasksByDate}
          setTasksByDate={setTasksByDate}
          setPage={setPage}
        />
      ) : (
        <Profile
          setPage={setPage}
          profile={profile}
          setProfile={setProfile}
        />
      )}

      <footer className="bottom-nav">
        <div className="nav-item" onClick={() => setPage('dashboard')}>
          <FaTasks className={`nav-icon ${page === 'dashboard' ? 'active' : ''}`} />
          <span className={`nav-label ${page === 'dashboard' ? 'active' : ''}`}>Home</span>
        </div>
        <div className="nav-item plus-button" onClick={() => setPage('tasks')}>
          <FaPlus />
          <span className="nav-label">Add</span>
        </div>
        <div className="nav-item" onClick={() => setPage('profile')}>
          <FaUser className={`nav-icon ${page === 'profile' ? 'active' : ''}`} />
          <span className={`nav-label ${page === 'profile' ? 'active' : ''}`}>Profile</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

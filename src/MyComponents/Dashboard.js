import React from 'react';
// import { formatTime } from './utils'; 

const Dashboard = ({ todos }) => {
  // Calculate the total number of tasks
  const totalTasks = todos.length;

  // Calculate the number of completed and incomplete tasks
  const completedTasks = todos.filter(todo => todo.stat).length;
  const incompleteTasks = totalTasks - completedTasks;

  // Calculate the total time spent on tasks
  const totalTimeSpent = todos.reduce((total, todo) => total + todo.elapsedTime, 0);

  return (
    <div style={dashboardStyles.container}>
      <h2 style={dashboardStyles.header}>Dashboard</h2>
      <div style={dashboardStyles.stats}>
        <div style={dashboardStyles.statItem}>
          <h3>Total Tasks:</h3>
          <p>{totalTasks}</p>
        </div>
        <div style={dashboardStyles.statItem}>
          <h3>Completed Tasks:</h3>
          <p>{completedTasks}</p>
        </div>
        <div style={dashboardStyles.statItem}>
          <h3>Incomplete Tasks:</h3>
          <p>{incompleteTasks}</p>
        </div>
        <div style={dashboardStyles.statItem}>
          <h3>Total Time Spent:</h3>
          <p>{formatTime(totalTimeSpent)}</p>
        </div>
      </div>
    </div>
  );
};

const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

// Example inline styles
const dashboardStyles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  statItem: {
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '150px',
    textAlign: 'center',
  }
};

export default Dashboard;




import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch Tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('Tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleTaskDelete = (TaskId) => {
    // Remove the Task with the corresponding id from the list and update local storage
    const updatedTasks = Tasks.filter((Task) => Task.id !== TaskId);
    setTasks(updatedTasks);
    localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="home-container">
      <h2>Task List</h2>
      {Tasks.length > 0 ? (
        <ul className="Task-list">
          {Tasks.map((Task) => (
            <li key={Task.id} className="Task-item">
              <span>Name - {Task.name}</span>
              <span>Description - {Task.dosage}</span>
              <span>Frequency - {Task.frequency}</span>
              <span>
                Time - {' '}
                {Task.morning && 'Morning '}
                {Task.afternoon && 'Afternoon '}
                {Task.night && 'Night'}
              </span>
              <button className='delbtn' onClick={() => handleTaskDelete(Task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-Tasks">No Task added yet, please add some by clicking on add Task in navbar.</p>
      )}
    </div>
  );
};

export default Home;


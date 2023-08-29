


import React, { useState, useEffect } from 'react';
import './TaskReminder.css';

const TaskReminder = () => {
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch Tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('Tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const now = new Date();

    // Filter Tasks for today
    const todayTasks = Tasks.filter((Task) => {
      if (Task.frequency.includes('Daily')) {
        return true;
      } else if (Task.frequency.includes('Weekly')) {
        return now.getDay() === new Date(Task.date).getDay();
      } else if (Task.frequency.includes('Monthly')) {
        return now.getDate() === new Date(Task.date).getDate();
      }
      return false;
    });

    // Filter Tasks for the next day
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);

    const upcomingTasks = Tasks.filter((Task) => {
      if (Task.frequency.includes('Daily')) {
        return true;
      } else if (Task.frequency.includes('Weekly')) {
        return nextDay.getDay() === new Date(Task.date).getDay();
      } else if (Task.frequency.includes('Monthly')) {
        return nextDay.getDate() === new Date(Task.date).getDate();
      }
      return false;
    });

    setTodayTasks(todayTasks);
    setUpcomingTasks(upcomingTasks);
  }, [Tasks]);

  const handleTaskTaken = (TaskId) => {
    // Remove the Task with the corresponding id from the reminder list for today
    const updatedTodayTasks = todayTasks.filter((Task) => Task.id !== TaskId);
    setTodayTasks(updatedTodayTasks);
  };

  return (
    <div className="Taskremindercontainer">
      <h2>Task Reminder</h2>
      <h3>⚫ Today's Task</h3>
      {todayTasks.length > 0 ? (
        <ul className="Tasklist">
          {todayTasks.map((Task) => (
            <li key={Task.id} className="Taskitem">
              <span>Name: {Task.name}</span>
              <span>Description: {Task.dosage}</span>
              <span>Frequency: {Task.frequency}</span>
              <span>
                Time:{' '}
                {Task.morning && 'Morning '}
                {Task.afternoon && 'Afternoon '}
                {Task.night && 'Night'}
              </span>
              <button className='takenbtn' onClick={() => handleTaskTaken(Task.id)}>incomplete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="noTasks">No Task scheduled for today.</p>
      )}

      <h3>⚫ Tomorrow's Task</h3>
      {upcomingTasks.length > 0 ? (
        <ul className="Tasklist">
          {upcomingTasks.map((Task) => (
            <li key={Task.id} className="Taskitem">
              <span>Name: {Task.name}</span>
              <span>Dosage: {Task.dosage}</span>
              <span>Frequency: {Task.frequency}</span>
              <span>
                Time:{' '}
                {Task.morning && 'Morning '}
                {Task.afternoon && 'Afternoon '}
                {Task.night && 'Night'}
              </span>
              <button className='tomtakenbtn' disabled >Incomplete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="noTasks">No Task scheduled for the next day.</p>
      )}
    </div>
  );
};

export default TaskReminder;


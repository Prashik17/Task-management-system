import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const navigate = useNavigate();
  const [Task, setTask] = useState({
    id: Date.now(), // Unique ID for each Task
    name: '',
    dosage: '',
    frequency: '',
    morning: false,
    afternoon: false,
    night: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if any required field is empty
    if (!Task.name || !Task.dosage || !Task.frequency) {
      alert('Please fill in all required fields (Task Name, Dosage, and Frequency).');
      return;
    }
  
    // Save Task to local storage
    const existingTasks = JSON.parse(localStorage.getItem('Tasks')) || [];
    const updatedTasks = [...existingTasks, Task];
    localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
  
    // Clear form fields after submission
    setTask({ name: '', dosage: '', frequency: '', morning: false, afternoon: false, night: false });

    navigate('/');
  };
  

  return (
    <div className="add-Task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" name="name" value={Task.name} placeholder='Enter name' onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="string" name="dosage" value={Task.dosage} placeholder='Enter details' onChange={handleChange} />
        </label>
        <label>
          Frequency:
          <select name="frequency" value={Task.frequency} onChange={handleChange}>
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Twice Daily">Twice Daily</option>
            <option value="Thrice Daily">Thrice Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>
        <label>
          Time:
          <div className="time-checkboxes">
            <label>
              <input type="checkbox" name="morning"  checked={Task.morning} onChange={handleChange} />
              Morning
            </label>
            <label>
              <input type="checkbox" name="afternoon" checked={Task.afternoon} onChange={handleChange} />
              Afternoon
            </label>
            <label>
              <input type="checkbox" name="night" checked={Task.night} onChange={handleChange} />
              Night
            </label>
          </div>
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;

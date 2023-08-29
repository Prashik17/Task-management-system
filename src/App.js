import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddTask from './components/AddTask';
import TaskReminder from './components/TaskReminder';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" Component={<App />} />
          <Route path="/add-Task" element={<AddTask />} />
          <Route path="/Task-reminder" element={<TaskReminder />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;

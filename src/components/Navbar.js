import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="navbar">
       <img style={{width:'30px'}}
            src="https://cdn-icons-png.flaticon.com/128/2387/2387635.png"
            alt="Logo"
          />
      <div className='heading'><b> Task Management</b>  </div>
      <ul className='abc'>
       
        <li>
          <NavLink to="/" >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-Task" >
            Add Task
          </NavLink>
        </li>
        <li>
          <NavLink to="/Task-reminder" >
            Task Status
          </NavLink>
        </li>
      </ul>
      <div className="clock">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </nav>
  );
};

export default Navbar;

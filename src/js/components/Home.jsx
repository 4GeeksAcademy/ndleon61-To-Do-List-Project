import React, { useEffect, useState } from "react";
import './home.css';

const username = "david_leon"

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");


  useEffect( () => {

	fetch(`https://playground.4geeks.com/todo/users/${username}`), {
		method: 'GET',
	}

  }, []);

  
  const addTask = () => {
  
  };

 
  const deleteTask = () => {
  
  };

  return (
    <div className="container">
      <h1>TO-DO LIST <i className="fa-solid fa-square-check"></i></h1>

      <div className="input">
        <input 
          type="text" 
          className="tasks-container"
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <button className="add-button" onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="tasks">
            <span>{task.text}</span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import './home.css';

const user_name = "david_leon"

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const loadTasks = async () => {
    try {
      const res = await fetch(`https://playground.4geeks.com/todo/users`);
      if (res.status === 404) {
        console.log("User not found. Creating user david_leon");
        const createRes = await fetch (`https://playground.4geeks.com/todo/users/${user_name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application.json'
          },
          body: JSON.stringify
        });
        if (!createRes.ok) throw new Error("Failed to create user");
        return loadTasks();
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);





  /*useEffect( () => {

    fetch(`https://playground.4geeks.com/todo/users/${user_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error('Error:', error)
    })

  }, []);*/

  
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
        {Array.isArray(tasks) ? (
          tasks.map((task) => (
            <li key={task.id} className="tasks">
              <span>{task.label}</span>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No tasks found</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
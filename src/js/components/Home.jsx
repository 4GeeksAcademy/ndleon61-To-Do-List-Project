import React, { useEffect, useState } from "react";
import './home.css';

const user_name = "david_leon";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const loadTasks = async () => {
    const res = await fetch(`https://playground.4geeks.com/todo/users/${user_name}`);
    const data = await res.json();
    console.log(data);
    setTasks(data.todos || []); 
    
  };

  useEffect(() => {
    loadTasks();
  }, []);


  const addTask = async () => {
  if (!input.trim()) return; 

  const newTask = {
    label: input,
    is_done: false
  };

  const res = await fetch(`https://playground.4geeks.com/todo/todos/${user_name}`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  const data = await res.json();
  setTasks(prevTasks => [...prevTasks, data]);
  setInput("");

};


const deleteTask = async (todo_id) => {
await fetch (`https://playground.4geeks.com/todo/todos/${todo_id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
});

setTasks(prevTasks => prevTasks.filter(task => task.id !== todo_id));

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
        {Array.isArray(tasks) && tasks.map((task, index) => (
          <li key={task.id || index} className="tasks">
            <span>{task.label}</span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
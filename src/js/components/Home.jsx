import React, { useEffect, useState } from "react";
import './home.css';

const user_name = "david_leon";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");


// Setting a new user 

  const setNewUser = async () => {
    const res = await fetch(`https://playground.4geeks.com/todo/users/${user_name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
  }

 const loadTasks = async () => {
  const res = await fetch(`https://playground.4geeks.com/todo/users/${user_name}`);

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data = await res.json();
  console.log(data);
  setTasks(data.todos || []);
};

// Load tasks. If user does not exist create new user and then load tasks

 useEffect(() => {
  const initialize = async () => {
    try {
      await loadTasks();
    } catch (error) {
      if (error.message.includes("404")) {
        console.log("User doesn't exist. Creating...");
        await setNewUser();
        await loadTasks(); 
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  initialize();
}, []);

// Adding a task 

  const addTask = async () => {
  if (!input.trim()) return; 

  const newTask = {
    label: input,
    is_done: false
  };

  const res = await fetch(`https://playground.4geeks.com/todo/todos/${user_name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
  const data = await res.json();
  setTasks(prevTasks => [...prevTasks, data]);
  setInput("");

};

// Deleting a task 

const deleteTask = async (todo_id) => {
await fetch (`https://playground.4geeks.com/todo/todos/${todo_id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
});

setTasks(prevTasks => prevTasks.filter(task => task.id !== todo_id));

};

// Toggle function when a task has been completed

const toggleTask = async (todo_id, newStatus) => {
  const taskToChange = tasks.find(task => task.id === todo_id);
  if (!taskToChange) return;

  const res = await fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      is_done: newStatus,
      label: taskToChange.label
    })
  });

  if (!res.ok) {
    console.error("Failed to update task on server");
    return;
  }
  const updatedTask = await res.json();

  setTasks(prevTasks =>
    prevTasks.map(task =>
      task.id === todo_id ? updatedTask : task
    )
  );
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
           <input 
            type="checkbox" 
            checked={task.is_done}
            onChange={() => toggleTask(task.id, !task.is_done)}
          />
            <span>{task.label}</span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
import React, {useState} from "react";
import './home.css';


//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	const addTask = () =>{
		if (input.trim() !==""){
			setTasks([...tasks, {id: Date.now(), text:input}]);
			setInput("");
		}
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter(task => task.id !== id));
	};


	return (
		<div className="container">
			<h1>TO-DO LIST <i class="fa-solid fa-square-check"></i></h1>

			<div className="input">
				<input 
					type="text" 
					className="tasks-container"
					placeholder='"Add a task"'
					value={input}
					onChange={(e) => setInput(e.target.value)} 
				/>
				<button className="add-button" onClick={addTask}>Add</button>
			</div>
			

			<ul>
  				{tasks.map((task) => (
    				<li key={task.id} className="tasks"><span>{task.text}</span><button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button></li>
  				))}
			</ul>

		</div>
	);
};

export default Home;
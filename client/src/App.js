// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { data } = await axios.get('http://localhost:5000/tasks');
        setTasks(data);
    };

    const addTask = async () => {
        if (!newTask) return;
        await axios.post('http://localhost:5000/tasks', { text: newTask });
        setNewTask("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.text}
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

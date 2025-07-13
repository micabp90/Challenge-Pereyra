import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(() => alert('Error al cargar tareas'));
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f0ff' }}>
            <h1 style={{ color: 'purple' }}>Lista de Tareas</h1>
            <Link to="/new" style={{ color: 'purple', textDecoration: 'none' }}>Crear nueva tarea</Link>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
}

export default TaskList;

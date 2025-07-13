import React from 'react';
import { Link } from 'react-router-dom';

function TaskItem({ task }) {
    return (
        <li style={{ border: '1px solid purple', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
            <h3 style={{ color: 'purple' }}>
                {task.title} {task.completed ? '(Completada)' : ''}
            </h3>
            <p>{task.description}</p>
            <p>Creada: {new Date(task.createdAt).toLocaleString()}</p>
            <Link to={`/edit/${task.id}`} style={{ color: 'purple', textDecoration: 'none' }}>Editar</Link>
        </li>
    );
}

export default TaskItem;

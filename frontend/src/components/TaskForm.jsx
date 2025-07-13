import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    id: '',
    title: '',
    description: '',
    completed: false,
    createdAt: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => setTask(data))
        .catch(() => alert('Error al cargar la tarea'));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/tasks/${id}` : '/api/tasks';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...task,
        id: id || Date.now().toString(),
        createdAt: task.createdAt || new Date().toISOString(),
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar tarea');
        return res.json();
      })
      .then(() => navigate('/'))
      .catch(() => alert('Error al guardar tarea'));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f0ff' }}>
      <h2 style={{ color: 'purple' }}>{id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color: 'purple' }}>Título:</label><br />
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div>
          <label style={{ color: 'purple' }}>Descripción:</label><br />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div>
          <label style={{ color: 'purple' }}>
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
            />
            Completada
          </label>
        </div>
        <button type="submit" style={{ backgroundColor: 'purple', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

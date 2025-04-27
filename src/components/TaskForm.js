import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description, assignedTo, status: 'todo' });
    setTitle('');
    setDescription('');
    setAssignedTo('');
    onTaskCreated();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
        style={{ margin: '5px', padding: '5px' }}
      />
      <button type="submit" style={{ margin: '5px', padding: '5px' }}>Add Task</button>
    </form>
  );
};

export default TaskForm;

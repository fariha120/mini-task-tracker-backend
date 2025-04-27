import React from 'react';

const TaskCard = ({ task, onDelete }) => {
  return (
    <div style={{ border: '1px solid gray', margin: '10px 0', padding: '10px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p><strong>Assigned to:</strong> {task.assignedTo}</p>
      <button onClick={() => onDelete(task._id)} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px' }}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;


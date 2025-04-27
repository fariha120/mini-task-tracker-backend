import React, { useEffect, useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { getTasks, updateTask, deleteTask } from '../services/api';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

 const fetchTasks = async () => {
  // TEMP DATA until backend ready
  const dummyData = [
    { _id: '1', title: 'Task 1', description: 'First task', assignedTo: 'User A', status: 'todo' },
    { _id: '2', title: 'Task 2', description: 'Second task', assignedTo: 'User B', status: 'inprogress' },
    { _id: '3', title: 'Task 3', description: 'Third task', assignedTo: 'User C', status: 'done' },
  ];
  setTasks(dummyData);

  // Later use real API:
  // const data = await getTasks();
  // setTasks(data);
};


  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;

    const task = tasks.find((t) => t._id === draggableId);
    if (task) {
      await updateTask(draggableId, { ...task, status: destination.droppableId });
      fetchTasks();
    }
  };

  const statuses = ['todo', 'inprogress', 'done'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <TaskForm onTaskCreated={fetchTasks} />
      <DragDropContext onDragEnd={handleDragEnd}>
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ width: 250, minHeight: 500, border: '1px solid black', padding: 10 }}
              >
                <h2 style={{ textAlign: 'center' }}>{status.toUpperCase()}</h2>
                {tasks.filter(task => task.status === status).map((task, index) => (
                  <Draggable draggableId={task._id} index={index} key={task._id}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TaskCard task={task} onDelete={handleDelete} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;

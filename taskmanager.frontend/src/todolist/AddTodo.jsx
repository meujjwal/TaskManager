// AddTodo.jsx

import React, { useState } from "react";
import "./todo.css";

export const AddTodo = ({ addTodo }) => {
  const [newTask, setNewTask] = useState({
    Title: "",
    Description: "",
    DueDate: "",
    Priority: 0,
  });
  //const [isEditing, setIsEditing] = useState(false);

    /*useEffect(() => {
        if (editedTask) {
            setNewTask(editedTask);
            setIsEditing(true);
        } else {
            // If editedTask is null or undefined, reset the newTask state
            setNewTask({
                Title: "",
                Description: "",
                DueDate: "",
                Priority: "",
            });
            setIsEditing(false);
        }
    }, [editedTask]);*/


    const handleChange = (e) => {
        
           const { name, value } = e.target;
            setNewTask({
                ...newTask,
                [name]: value,
            });
        
  };

    const handleAddOrUpdate = () => {
       if (!newTask.Title || !newTask.Description || !newTask.DueDate || !newTask.Priority) {
      return;
    }
    
      addTodo(newTask);
      setNewTask({
        Title: "",
        Description: "",
        DueDate: "",
        Priority: "",
      });
    
  };

  return (
    <div className="add-todo">
      <input
        className="input-field"
        type="text"
        name="Title"
        placeholder="Enter the task title"
        value={newTask.Title}
        onChange={handleChange}
      />
      <br/>
      <input
        className="input-field"
        type="text"
        name="Description"
        placeholder="Enter the task description"
        value={newTask.Description}
        onChange={handleChange}
      />
      <br/>
      <input
        className="input-field"
        type="date"
        name="DueDate"
        placeholder="Enter the task due date"
        value={newTask.DueDate}
        onChange={handleChange}
      />
      <br/>
          <select
              className="input-field"
              name="Priority"
             // value={newTask.Priority}
              onChange={handleChange}
          >
              <option value="">Select Priority</option>
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
          </select>

      <button
        className="todo-add-btn rounded-md"
        onClick={handleAddOrUpdate}
      >
        + New Task
      </button>
    </div>
  );
};

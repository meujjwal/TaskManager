// EditTodo.jsx

import React, { useState } from "react";
import "./todo.css";

export const EditTodo = ({ editedTask: editedTask, updateTodo: updateTodo }) => {
    const [newTask, setNewTask] = useState({
        Id: editedTask.id,
        Title: editedTask.title,
        Description: editedTask.description,
        DueDate: editedTask.dueDate.substr(0, 10),
        Priority: editedTask.priority
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

        updateTodo(newTask);
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
            <br />
            <input
                className="input-field"
                type="text"
                name="Description"
                placeholder="Enter the task description"
                value={newTask.Description}
                onChange={handleChange}
            />
            <br />
            <input
                className="input-field"
                type="date"
                name="DueDate"
                placeholder="Enter the task due date"
                value={newTask.DueDate}
                onChange={handleChange}
            />
            <br />
            <select
                className="input-field"
                name="Priority"
                value={newTask.priority} // Set the value of the select element
                onChange={handleChange}
            >
                <option value="">Select Priority</option>
                {parseInt(newTask.priority) === 0 ? <option value="0" selected>Low</option> : <option value="0">Low</option>}
                {parseInt(newTask.priority) === 1 ? <option value="1" selected>Medium</option> : <option value="1">Medium</option>}
                {parseInt(newTask.priority) === 2 ? <option value="2" selected>High</option> : <option value="2">High</option>}
            </select>

            <button
                className="todo-add-btn rounded-md"
                onClick={handleAddOrUpdate}
            >
               Update Task
            </button>
        </div>
    );
};

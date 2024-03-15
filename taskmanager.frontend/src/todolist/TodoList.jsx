// TodoList.jsx

import React, { useState, useEffect } from "react";
import "./todo.css";
import { TodoItem } from "./TodoItem";
import { AddTodo } from "./AddTodo";
import { EditTodo } from "./EditTodo";

export const TodoList = () => {
 const [items, setItems] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
    const API_URL = "https://localhost:44334/api/Task";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch tasks: ", error);
    }
  };


    const addTask = async (newTask) => {
        newTask.Priority = parseInt(newTask.Priority);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    setItems([...items, data]); // Assuming the backend returns the newly added todo item
    };

    const updateTodo = async (newTask) => {
        newTask.Priority = parseInt(newTask.Priority);
        const response = await fetch(API_URL + '/' + newTask.Id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
        //const data = await response.json();
        console.log(response.status);
        if (response.status == 204) {
            // Define a function to update the properties of an item with a specific ID
            
                // Map through the items array
                const updatedItems = items.map(item => {
                    // Check if the current item's ID matches the target ID
                    if (item.id === newTask.Id) {
                        var replacement = {
                            id: newTask.Id,
                            title: newTask.Title,
                            description: newTask.Description,
                            dueDate: newTask.DueDate,
                            priority: newTask.Priority
                        };
                        // If it matches, update the properties of the item
                        return {
                            ...item, ...replacement
                        };
                    } else {
                        // If it doesn't match, return the item as is
                        return item;
                    }
                });
                 
            console.log(updatedItems);
            setEditedTask(null);
            setItems(updatedItems);
        }
        else {
            setEditedTask(null);
            setItems(items);
        }
        //return;
        // Assuming the backend returns the newly added todo item
    };

  const editTodo = async (id) => {
      const editedItem = items.find((item) => item.id === id);
      console.log(editedItem);
      //return;
      setEditedTask(editedItem);
  };

    const deleteTodo = async (id) => {
        var ans = confirm("Are you sure you want to delete this item?");
        if (ans) {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            const newItems = items.filter((item) => item.id !== id);
            setItems(newItems);
        } else {
            return;
        }
  };
  

  return (
    <div>
      <div className="bar">
        <h2 className="heading">Task Manager</h2>
          </div>
          {editedTask != null ? <EditTodo editedTask={editedTask} updateTodo={updateTodo} /> : <AddTodo addTodo={addTask} />}
      <div className="todo-list shadow-lg">
        {items.map((item, key) => (
          <TodoItem
                key={key}
                id={item.id}
                title={item.title}
                deleteTodo={() => {
                    deleteTodo(item.id);
                }}
                editTodo={() => {
                    editTodo(item.id);
                }}
                description={item.description}
                dueDate={item.dueDate}
                priority={item.priority}
          />
        ))}
      </div>
    </div>
  );
};

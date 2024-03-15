import React, { useState } from "react";
import "./todo.css";
import DeleteIcon from "../assets/deleteicon.png";
import UpdateIcon from "../assets/download.png";
import ArrowRight from "../assets/arrow-right.png";

export const TodoItem = ({ id, title, description, dueDate, priority, deleteTodo, editTodo }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    function getBadge(priority) {
        switch (priority) {
            case 0:
                return <div className="badge green">Low Priority</div>;
            case 1:
                return <div className="badge yellow">Medium Priority</div>;
            case 2:
                return <div className="badge red">High Priority</div>;
            default:
                return null;
        }
    }

    function getPriorityText(priority) {
        switch (priority) {
            case 0:
                return 'Low';
            case 1:
                return 'Medium';
            case 2:
                return 'High';
            default:
                return 'Unknown';
        }
    }

    return (
        <div className="todo-item" id={`todo-${id}`}>
            <img
                className="todo-icon"
                src={ArrowRight}
                alt="See Details"
                onClick={toggleModal}
            />
            <p className="todo-task-title"><strong>{title}</strong></p>
            {getBadge(parseInt(priority))}
            <div className="icons">
                <img
                    className="check-icon todo-icon"
                    src={UpdateIcon}
                    alt="Edit icon"
                    onClick={() => editTodo(id)}
                />
                <img
                    className="todo-icon"
                    src={DeleteIcon}
                    alt="Delete icon"
                    onClick={() => deleteTodo(id)}
                />
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2 className="modal-title"><strong>{title}</strong></h2>
                            <button className="close-btn" onClick={toggleModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Description:</strong> {description}</p>
                            <p><strong>Due Date:</strong> {dueDate && dueDate.substr(0, 10)}</p>
                            <p><strong>Priority:</strong> {getPriorityText(parseInt(priority))}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

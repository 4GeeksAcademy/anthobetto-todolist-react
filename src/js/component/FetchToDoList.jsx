import React, { useEffect, useState } from "react";

export const FetchToDoList = () => {
    const host = 'https://playground.4geeks.com/todo';
    const user = "srzerosss";
    const [newActivity, setNewActivity] = useState([]);
    const [inputValue, setInputValue] = useState("");  // Manejo del valor del input

    const getActivities = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'GET'
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            return createUser()
        }
        const data = await response.json();
        setNewActivity(data.todos);
    };

    const postActivity = async () => {
        const dataToSend = {
            "label": inputValue,
            "is_done": false
        };
        const uri = `${host}/todos/${user}`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            return;
        }
        setInputValue("");
        getActivities();
    };

    const deleteActivity = async (designateNumber) => {
        const uri = `${host}/todos/${designateNumber}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            return;
        }
        getActivities();
    };

    const createUser = async () => {
        const uri = `${host}/users/${user}`;
        const options = {
            method: 'POST'
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
            return
        }
        getActivities()

    }

    useEffect(() => {
        getActivities()
    }, []);
    useEffect(() => { }, [newActivity])

    return (
        <div className="container mt-5">
            <div className="card col-md-8 offset-md-2 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">To-Do List</h3>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                            name="todoInput"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={postActivity}
                        >
                            Add
                        </button>
                    </div>
                    <ul className="list-group list-group-flush">
                        {newActivity.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                {item.label}
                                <button
                                    onClick={() => deleteActivity(item.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    <i className="fas fa-minus-square"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
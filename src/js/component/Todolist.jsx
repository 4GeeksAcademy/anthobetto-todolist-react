import React, { useState } from 'react';

export const Todolist = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('')
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddItem = (event) => {
        event.preventDefault(); 
        if (inputValue !== '') {
            setItems([...items, inputValue]);
            setInputValue('');
        };
    };

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    return (
        <div className="constainer list-group p-5">
            <form onSubmit={handleAddItem}>
                <input
                    className='input-group mb-3'
                    type="text"
                    placeholder="What needs to be done?"
                    value={inputValue}
                    onChange={handleChange}
                />
            </form>
            <ul className="list-group list-group-flush" style={{ listStyleType: 'none'}}>
                {items.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {item}
                        <button
                            onClick={() => handleDelete(index)}
                            className="btn btn-danger btn-sm"
                        >
                        <i class="fas fa-minus-square"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
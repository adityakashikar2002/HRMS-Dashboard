import React from 'react';
import './TodoList.css';

const TodoList = ({ items }) => {
  return (
    <div className="todo-list">
      <h3>To do List</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className="todo-title">{item.title}</div>
            <div className="todo-description">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
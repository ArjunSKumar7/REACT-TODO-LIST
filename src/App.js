import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
const getLocalItems = () => {
  let list = localStorage.getItem('todos');
  console.log('list', list);

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const TodoList = () => {
  const [todos, setTodos] = useState(getLocalItems());
  const [inputValue, setInputValue] = useState('');

  
  // useEffect(() => {
  //   const storedTodos = localStorage.getItem('todos');
  //   if (storedTodos) {
  //     setTodos(JSON.parse(storedTodos));
  //   }
  // }, []);   



  


  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const updateTodo = (index, newValue) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newValue;
    setTodos(updatedTodos);
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Todos stored in local storage:', todos);
  }, [todos]);

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? 'todo-item completed' : 'todo-item'}
          >
            <input
              className='checkbox'
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span>{todo.text}</span>
            <div className="button-container">
              <button onClick={() => deleteTodo(index)}>Delete</button>
              <button onClick={() => updateTodo(index, prompt('Enter new value'))}>
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

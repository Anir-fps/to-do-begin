import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([{ text: "Buy milk", completed: false }]);
  const inputRef = useRef();

  const handle_ADD_To_Do = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    
    // Pro tweak: Use a unique ID (Date.now()) instead of relying on index
    const newItem = { id: Date.now(), text, completed: false };
    setTodos([...todos, newItem]);
    inputRef.current.value = ""; 
  };

  // Toggle completion: Use .map() to create a new array
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
  };

  // Delete item: Use .filter() to exclude the clicked item
  const deleteItem = (e, id) => {
    e.stopPropagation(); // Prevents clicking "X" from also toggling "Complete"
    const filteredTodos = todos.filter(item => item.id !== id);
    setTodos(filteredTodos);
  };

  // Allow adding tasks by pressing "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handle_ADD_To_Do();
  };

  return (
    <div className="App">
      <h1>TO-DO LIST</h1>
      
      <div className="input-group">
        <input 
          ref={inputRef} 
          onKeyDown={handleKeyDown}
          placeholder='What needs to be done?' 
        />
        <button onClick={handle_ADD_To_Do}>ADD</button>
      </div>

      <ul>
        {todos.map((item) => (
          <li 
            key={item.id} 
            className={item.completed ? "todo-item done" : "todo-item"}
            onClick={() => toggleComplete(item.id)}
          > 
            <span className="todo-text">{item.text}</span>
            <button className="delete-btn" onClick={(e) => deleteItem(e, item.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

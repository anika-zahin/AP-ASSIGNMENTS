import { useState } from "react";


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');


  * { box-sizing: border-box; margin: 0; padding: 0; }


  body {
    background: #111111;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
  }


  .app {
    width: 480px;
    padding: 48px 40px;
    background: #111;
    border: 1px solid #222;
    position: relative;
    overflow: hidden;
  }


  .app::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, #ff4d6d, #ff9f1c, #4cc9f0);
  }


  .header {
    margin-bottom: 36px;
  }


  .label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    color: #555;
    text-transform: uppercase;
    margin-bottom: 8px;
  }


  h1 {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: #f0f0f0;
    line-height: 1;
  }


  h1 span {
    color: #ff4d6d;
  }


  .counter {
    font-size: 11px;
    color: #444;
    margin-top: 6px;
  }


  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 32px;
  }


  input {
    flex: 1;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    color: #ddd;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.2s;
  }


  input::placeholder { color: #3a3a3a; }


  input:focus { border-color: #ff4d6d; }


  button {
    background: #ff4d6d;
    border: none;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    padding: 12px 20px;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: background 0.15s, transform 0.1s;
  }


  button:hover { background: #e63655; }
  button:active { transform: scale(0.97); }


  .divider {
    border: none;
    border-top: 1px solid #1e1e1e;
    margin-bottom: 24px;
  }


  .empty {
    color: #333;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-align: center;
    padding: 24px 0;
  }


  .todo-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }


  .todo-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: #161616;
    border-left: 2px solid #2a2a2a;
    transition: border-color 0.2s;
    animation: slideIn 0.2s ease;
  }


  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }


  .todo-item:hover { border-left-color: #ff4d6d; }


  .todo-index {
    font-size: 10px;
    color: #333;
    min-width: 20px;
  }


  .todo-text {
    font-size: 13px;
    color: #ccc;
    flex: 1;
  }


  .todo-delete {
    background: none;
    border: none;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    padding: 0 4px;
    line-height: 1;
    transition: color 0.15s;
  }


  .todo-delete:hover { background: none; color: #ff4d6d; }
`;


export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");


  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, trimmed]);
    setInput("");
  };


  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };


  const handleKey = (e) => {
    if (e.key === "Enter") addTodo();
  };


  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <p className="label">/ task manager</p>
          <h1>TO<span>.</span>DO</h1>
          <p className="counter">{todos.length} task{todos.length !== 1 ? "s" : ""} pending</p>
        </div>


        <div className="input-row">
          <input
            type="text"
            placeholder="what needs doing?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={addTodo}>ADD</button>
        </div>


        <hr className="divider" />


        {todos.length === 0 ? (
          <p className="empty">— nothing here yet —</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo, i) => (
              <li key={i} className="todo-item">
                <span className="todo-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="todo-text">{todo}</span>
                <button className="todo-delete" onClick={() => deleteTodo(i)} title="Remove">×</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}







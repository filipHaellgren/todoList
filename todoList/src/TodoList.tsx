import React, { useState } from "react";

interface item {
    id: number;
    text: string;
    completed: boolean;
}
export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<item[]>([

    ]);

    const [input, setInput] = useState<string>("");

    const handleToggle = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    };

    const handleRemove = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Stop event propagation to prevent handleToggle from being called
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleClick = () => {
        const newTodo: item = { id: Date.now(), text: input, completed: false };
        setTodos([...todos, newTodo]);
        setInput("");
    };

    return (
        <div className="main-container">
            <h1> To Do List</h1>
            <div className="todos-container">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="todo-item"
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo.id)}
                            />
                            <span>{todo.text}</span>
                        </label>
                        <button onClick={(e) => handleRemove(todo.id, e)}>X</button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Add new to do"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button onClick={handleClick}> Add</button>
        </div>
    );
};

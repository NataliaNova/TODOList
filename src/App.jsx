import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (err) {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false, dueDate }]);
      setNewTodo("");
      setDueDate("");
    }
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const pendingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-800 md:text-5xl lg:text-6xl">
        Mi lista ToDo
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-600">
        Tareas pendientes: {pendingTodos}
      </p>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nueva tarea"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="addButton" onClick={handleAddTodo}>
        {" "}
        <p className="font-bold">Agregar</p>{" "}
      </button>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
        <button onClick={() => setFilter("pending")}>Pendientes</button>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completado" : ""}>
            {todo.text} : {todo.dueDate}
            <div>
              <button onClick={() => handleToggleTodo(index)}>
                {todo.completed ? "Deshacer" : "Completado"}
              </button>
              <button onClick={() => handleDeleteTodo(index)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

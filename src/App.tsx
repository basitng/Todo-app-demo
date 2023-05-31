import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [updatedTodo, setUpdatedTodo] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index: number) => {
    setEditingIndex(index);
    setUpdatedTodo(todos[index]);
  };

  const handleUpdateTodo = () => {
    if (updatedTodo.trim() !== "") {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex!] = updatedTodo;
      setTodos(updatedTodos);
      setEditingIndex(null);
      setUpdatedTodo("");
    }
  };

  const handleCancelUpdate = () => {
    setEditingIndex(null);
    setUpdatedTodo("");
  };

  return (
    <div className="container mx-auto py-8 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4 w-[30%]">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-l w-full"
          placeholder="Enter a new todo..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul className="w-[30%] list-disc pl-8">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2 flex justify-between">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  className="px-2 py-1 border border-gray-300 rounded"
                  value={updatedTodo}
                  onChange={(e) => setUpdatedTodo(e.target.value)}
                />
                <div>
                  <button
                    className="mr-2 text-green-500"
                    onClick={handleUpdateTodo}
                  >
                    Save
                  </button>
                  <button className="text-red-500" onClick={handleCancelUpdate}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{todo}</span>
                <div>
                  <button
                    className="mr-2 text-blue-500"
                    onClick={() => handleEditTodo(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

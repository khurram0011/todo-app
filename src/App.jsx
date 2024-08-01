import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleAdd = () => {
    if (editId) {
      const updatedTodos = todos.map(item =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    let todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.todo);
    setEditId(id);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const todosToDisplay = showAll ? todos : todos.slice(0, 5);

  const stylediv = {
    padding: '24px 20px',
    borderRadius: '5px',
    marginTop: '-58px', 

  };
  const bgGradient={
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)', 
  }

  return (
    <>
      <Navbar />
      <div style={bgGradient} className="container mx-auto my-10 p-5 rounded-lg min-h-[80vh]  flex flex-col items-center justify-cente">
        <div className="addTodo">
          <div style={stylediv} className=' bg-purple-500 text-white p-4 rounded-xl mt-1 flex'>
          <h2  className='text-lg font-bold'>Todo App</h2>

          </div>
          <input className='my-6 p-2 rounded-sm' placeholder='Enter Your Tasks' onChange={handleChange} value={todo} type="text" />
          <button className='mx-3 rounded-sm text-white px-5  py-2.5 bg-blue-600' onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
        </div>
        <div className="todos">
          {todos.length === 0 && <div> No Task Available </div>}
          {todosToDisplay.map(item => (
            <div key={item.id} className="todo flex justify-between items-center gap-9 w-600 my-2">
              <div className='flex gap-4'>
                <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button className='mx-3 rounded-sm text-white px-5  py-2.5 bg-green-600' onClick={() => handleEdit(item.id)}>Edit</button>
                <button className='mx-1 rounded-sm text-white px-5  py-2.5 bg-red-500' onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
          {todos.length > 5 && (
            <button className='text-blue-800 underline font-bold' onClick={toggleShowAll}>
              {showAll ? "Show Less" : "View All"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

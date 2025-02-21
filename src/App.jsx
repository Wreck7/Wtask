import { useState, useEffect } from 'react'
import './App.css'
import { AiFillEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  useEffect(() => {
    let data = localStorage.getItem('todos')
    if(data){
      let todos = JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  },[])
   const saveDataLS = () => {
     localStorage.setItem('todos', JSON.stringify(todos))
   }
   const toggleShowFinished = () => {
      setShowFinished(!showFinished)
   }
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    console.log(todos)
    saveDataLS()
    setTodo('')
    // console.log(todos)
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleEdit = (e, id) => {
    let edited = todos.filter(item => {
      return item.id === id
    })
    setTodo(edited[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id !== id
   })
   setTodos(newTodos)
   saveDataLS()
  }
  const handleDelete = (e, id) => {
    if(confirm('Are you sure you want to delete this ToDo?') === true){
      let newTodos = todos.filter(item =>{
       return item.id !== id
    })
    setTodos(newTodos)
  }
  else{
    setTodos(todos)
    }
    saveDataLS()
}
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(todo => {
      return todo.id === id})
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveDataLS()
  }
  return (
    <>
      <Navbar />
      <div className="main mx-auto my-3 flex justify-center items-center">
        <div className="title min-w-[60vw] bg-gray-300
        py-4 rounded-3xl px-5 min-h-[85vh]">
          <div className="main flex justify-between gap-4">
          <h1 className='font-bold md:text-xl text-zinc-700'>Your ToDo's</h1>
          <div className="addTodo flex">
            <input onChange={handleChange} value={todo} type="text" className='addInput bg-white max-w-3xs shrink p-1 px-1.5 rounded outline-none' placeholder='Add your ToDo here!' />
            <button onClick={handleAdd} disabled={todo.length<3} className='p-2 py-1.5 font-bold text-sm text-white rounded cursor-pointer bg-emerald-600 hover:bg-zinc-700 transition-colors duration-900 ease-out'>Save</button>
          </div>
        </div>
        <div className='h-[1px] bg-zinc-700 my-4 opacity-30'></div>
        <div className={todos.length === 0? "flex justify-center items-center max-w-5xl my-5 min-h-80": "todos max-w-5xl my-5"}>
          <label id='101' className='cursor-pointer'><input type="checkbox" checked={showFinished} id='101' className='m-1.5 cursor-pointer' onChange={toggleShowFinished}/> Show finished</label>
          {todos.length === 0 && <h1 className='text-center font-bold text-2xl text-zinc-600'>No ToDo's to display!</h1>}
        {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todoPara bg-zinc-100 p-2 rounded-3xl flex my-1.5 justify-between">
            <div className={item.isCompleted?"line-through flex gap-1": "flex gap-1"}>
              <input type="checkbox" onChange={handleCheckBox} className="cursor-pointer" name={item.id} checked={item.isCompleted}/>
            <p className='text-zinc-700 font-normal mx-1'>{item.todo}</p></div>
            <div className="btns">
              <button onClick={(e) => {handleEdit(e, item.id)}} className='p-2 py-1 font-bold text-sm text-white rounded cursor-pointer bg-emerald-600 mx-1 hover:bg-zinc-700 transition-colors duration-900 ease-out'><AiFillEdit />
              </button>
              <button onClick={(e) =>{handleDelete(e, item.id)}} className='p-2 py-1 font-bold text-sm text-white rounded cursor-pointer bg-emerald-600 mx-1.5 hover:bg-zinc-700 transition-colors duration-900 ease-out'><AiTwotoneDelete />
              </button>
            </div>
          </div>
        })}

          
        </div>
      </div>
      </div>
    </>
  )
}
export default App

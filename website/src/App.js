import TodoList from './TodoList'
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; //function that generates a random id so you will always have a random id

const LOCAL_STORAGE_KEY = 'todoApp.todoList'

function App() { 
  const [todos, setTodos] = useState([]) //useState returns an array
  const todoNameRef = useRef()

  useEffect(() => { //loads our todos
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //changes string to array
    if (storedTodos) setTodos(storedTodos) //if we have storedtodos then set the setTodos to storedTodos
  }, []) //only recalls once the array changes (if array stays the same then nothing happens)

  useEffect(() => { //function that calls another function
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) //pass an array through this. anytime todos passes, it saves

  function toggleTodo(id) {
    const newTodos = [...todos] //creates copy. you should never modify the state in react
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name == '') return //returns nothing if nothing is inputted
    setTodos(prevTodos => { //function that gives the previous todos
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}] //... spreads it over the array
    })
    todoNameRef.current.value = null //clears out input after past input
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos) //sets newtodos to only not completed ones
  }

  return ( //return with ()
    <test> 
      <TodoList todoList={todos} toggleTodo={toggleTodo}/> 
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add To Do</button>
      <button onClick={handleClearTodos}>Clear Completed To Dos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </test>
  ); 
}

export default App;

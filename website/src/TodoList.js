import React from 'react'
import Todo from './Todo'

export default function TodoList({ todoList, toggleTodo }) {
    return (
        todoList.map(todo => { //loops over the array by using .map
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} /> //key allows react to only render the component that needs to be changed
        })
    )
}

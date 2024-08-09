import React from 'react'
import TodoList from './TodoList'

const Todos = (props) => {
  return (
    <div>
        <h2 className='text-center'>Dashboard</h2>
        {
          props.todo.length===0 ? "No Todos to Display" :
          props.todo.map((arr)=>
          {
            return <TodoList todo = {arr} key = {arr.sno} onDelete = {props.onDelete} updateStat = {props.updateStat}/>
          })
        }
    </div>
  )
}

export default Todos

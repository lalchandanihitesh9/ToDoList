import React from 'react'
import TodoList from './TodoList'

const Todos = (props) => {
  return (
    <div>
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

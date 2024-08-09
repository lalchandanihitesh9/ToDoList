import React from 'react'
// import Todos from './Todos';

export default function TodoList(props) {
    // const onDelete = (sno) =>
    // {
    //     console.log("I am onDelete function of", sno);
    //     // props.com.splice(sno-1,1);
    //     // <Todos todo={props.com}></Todos>
    // }
  return (
    // <>
    <div>
      <h4>{props.todo.title}</h4>
      <p>{props.todo.desc}</p>
      <button className="btn btn-danger" onClick={() => props.onDelete(props.todo)}>Delete</button>
      <hr/>
    </div>
    //  <hr/>
    // </> 
  )
}

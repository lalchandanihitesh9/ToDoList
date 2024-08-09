import React from 'react'
// import Todos from './Todos';

export default function TodoList(props) {
    const onCompletion = (todo) =>
    {

      if(todo.stat===false)
      {
          props.updateStat(todo.sno, true);
      }
      else{
        props.updateStat(todo.sno, false);
      }

    }

      // Timer function to format elapsed time
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};


  return (
    <div id='taskContainer' style={{backgroundColor: props.todo.stat ? 'green' : 'white'}}>
      <h4>{props.todo.title}</h4>
      <p>{props.todo.desc}</p>
      <p>Elapsed Time: {formatTime(props.todo.elapsedTime)}</p>
      <button style={{padding : "5px", backgroundColor : "red", marginLeft :"4px", borderRadius: "20%"}} onClick={() => props.onDelete(props.todo)}>Delete</button>
      <button style={{padding : "5px", backgroundColor : "lightgreen", marginLeft :"8px", borderRadius: "20%"}} onClick={()=> onCompletion(props.todo)}>Done</button>
      <hr/>
    </div>
  )
}

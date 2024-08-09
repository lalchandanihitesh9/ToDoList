import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import AddTodo from './MyComponents/AddTodo';
import { useState, useEffect } from 'react';
import React from 'react';
import {
  // BrowserRouter,
  Routes,
  // Link,
  Route,
} from "react-router-dom";


function App() {
  let initTodo;
  if(localStorage.getItem("todos")==null)
  {
    initTodo = [];
  }
  else
  {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);
  
  const updateStat = (sno, newStat) => {
    setTodos(todos.map(todo =>
      todo.sno === sno ? { ...todo, stat: newStat } : todo
    ));
  };

  const onDelete = (todo) =>
  {
    setTodos(todos.filter((e)=>
    {
      return e!==todo;
    }));
  }

  const addIt = (title1, desc1) =>
  {
    let sno1 = todos.length + 1;
    let todo1 = {
      sno : sno1,
      title : title1,
      desc : desc1,
      stat : false
    }
    setTodos([...todos, todo1]);
  }

  useEffect(() =>
  {
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  return (
    <>
      <Header title = "Todos List" />
      <Routes>
        <Route exact path = "/" element = {
          <>
          <AddTodo addIt = {addIt}></AddTodo>
          <Todos todo = {todos} onDelete = {onDelete} updateStat = {updateStat}/>
          </>
        }/>
      </Routes>
      <Footer/>
      
    </>
    

  );
}

export default App;

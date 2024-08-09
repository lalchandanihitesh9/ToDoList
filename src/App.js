//import logo from './logo.svg';
import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import AddTodo from './MyComponents/AddTodo';
import About from './MyComponents/About';
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

  const [todos, setTodos] = useState(initTodo
  //   [
  //   {
  //     sno : 1,
  //     title : "Learn React",
  //     desc : "We will be Learning React"
  //   },
  //   {
  //     sno : 2,
  //     title : "watch friends",
  //     desc : "We will be watching season 1"
  //   }
  // ]
  );
  
  

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
      desc : desc1
    }
    setTodos([...todos, todo1]);
    // console.log(todos);
    // console.log(todo1);
  }

  useEffect(() =>
  {
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  return (
    //   {/*<div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    // </div>*/}

    <>
      <Header title = "Todos List" searchBar = {true}/>
      <Routes>
        <Route exact path = "/" element = {
          <>
          <AddTodo addIt = {addIt}></AddTodo>
          <Todos todo = {todos} onDelete = {onDelete}/>
          </>
        }/>
          
        {/* </Route> */}
        <Route exact path = "/about" element = {<About/>}/>
          {/* <About></About>
        </Route> */}
      </Routes>
      {/* <AddTodo addIt = {addIt}></AddTodo>
      <Todos todo = {todos} onDelete = {onDelete}/> */}
      <Footer/>
      
    </>
    
      
  );
}

export default App;

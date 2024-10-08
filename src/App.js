import "./App.css";
import Header from "./MyComponents/Header";
import Todos from "./MyComponents/Todos";
import Footer from "./MyComponents/Footer";
import AddTodo from "./MyComponents/AddTodo";
import { useState, useEffect } from "react";
import React from "react";
import {
  // BrowserRouter,
  Routes,
  // Link,
  Route,
} from "react-router-dom";
import Dashboard from "./MyComponents/Dashboard";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") == null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  const updateStat = (sno, newStat) => {
    setTodos(
      todos.map((todo) =>
        todo.sno === sno ? { ...todo, stat: newStat } : todo
      )
    );
  };

  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
  };
  
  const addIt = (title1, desc1) => {
    // let sno1 = todos.length + 1;
    let todo1 = {
      sno: nextSno,
      title: title1,
      desc: desc1,
      stat: false,
      startTime: Date.now(),  // Start timer when task is created
      elapsedTime: 0
    };
    setTodos([...todos, todo1]);
    setNextSno(nextSno + 1);
  };

  const addItApi = async () => {
    try {
      // Fetching a quote (for title) and its author (for description) from the API
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${nextSno}`);

      const data = await response.json();

      const title1 = data.id;
      const desc1 = data.title;

      let todo1 = {
        sno: nextSno,
        title: title1,
        desc: desc1,
        stat: false,
        startTime: Date.now(),
        elapsedTime: 0
      };
  
      setTodos([...todos, todo1]);
      setNextSno(nextSno + 1);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "complete") return todo.stat;
    if (filter === "incomplete") return !todo.stat;
    return true; // 'all'
  });



  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map(todo => {
          if (todo.startTime && !todo.stat) {
            const now = Date.now();
            const elapsedTime = now - todo.startTime;
            return { ...todo, elapsedTime };
          }
          return todo;
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [nextSno, setNextSno] = useState(() => {
    // Load nextSno from localStorage if available
    const savedNextSno = localStorage.getItem('nextSno');
    return savedNextSno ? parseInt(savedNextSno, 10) : 1;
  });

  useEffect(() => {
    // Save nextSno to localStorage whenever it changes
    localStorage.setItem('nextSno', nextSno);
  }, [nextSno]);

  return (
    <>
      <Header title="Todos List" />
      <Routes>
        <Route exact path="/"
          element={
            <>
              <AddTodo addIt={addIt}></AddTodo>
              <button style={{padding : "5px", backgroundColor : "lightblue", margin :"8px"}} onClick={addItApi}>Add Quote</button>
              <h2 className="text-center">ToDo List</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    margin: "0 10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: filter === "all" ? "bold" : "normal",
                    color: filter === "all" ? "white" : "black",
                    backgroundColor: filter === "all" ? "#007bff" : "#f0f0f0",
                  }}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    margin: "0 10px",
                    // backgroundColor: '#f0f0f0',
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: filter === "complete" ? "bold" : "normal",
                    color: filter === "complete" ? "white" : "black",
                    backgroundColor:
                      filter === "complete" ? "#28a745" : "#f0f0f0",
                  }}
                  onClick={() => setFilter("complete")}
                >
                  Complete
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    margin: "0 10px",
                    // backgroundColor: '#f0f0f0',
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: filter === "incomplete" ? "bold" : "normal",
                    color: filter === "incomplete" ? "white" : "black",
                    backgroundColor:
                      filter === "incomplete" ? "#dc3545" : "#f0f0f0",
                  }}
                  onClick={() => setFilter("incomplete")}
                >
                  Incomplete
                </button>
              </div>
              <Todos todo={filteredTodos} onDelete={onDelete} updateStat={updateStat}/>
            </>
          }
        />
        <Route exact path = "/Dashboard" element={
          <Dashboard todos={todos}></Dashboard>
        }/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

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
    let sno1 = todos.length + 1;
    let todo1 = {
      sno: sno1,
      title: title1,
      desc: desc1,
      stat: false,
      startTime: Date.now(),  // Start timer when task is created
      elapsedTime: 0
    };
    setTodos([...todos, todo1]);
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

  return (
    <>
      <Header title="Todos List" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <AddTodo addIt={addIt}></AddTodo>
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
              <Todos
                todo={filteredTodos}
                onDelete={onDelete}
                updateStat={updateStat}
              />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

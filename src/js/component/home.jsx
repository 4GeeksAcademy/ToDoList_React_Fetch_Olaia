import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {


  const [tareas, setTareas] = useState([])
  const [inputValue, setInputValue] = useState("")
  const handlechange = (e) => {
    setInputValue(e.target.value);

  };
  const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/OlaiaTodo", {
      method: "POST",
    })
      .then((response) => {
        if (response.status === 404) {
          return fetch(
            "https://playground.4geeks.com/todo/users/OlaiaTodo",
            {
              method: "POST",
            }
          );
        }
        return response.json();
      })
      .then((response) => getUser())
      .catch((error) => console.error("Error:", error));
  };

  const getUser = () => {
    fetch("https://playground.4geeks.com/todo/users/OlaiaTodo")
      .then((response) => response.json())
      .then((response) => setTareas(response.todos));
  };

  const addTask = () => {
    const newTask = { label: inputValue, is_done: false };
    fetch("https://playground.4geeks.com/todo/todos/OlaiaTodo", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => getUser())
      .catch((error) => console.error(error));
  };

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json)
      .then((response) => getUser())
      .cath((error) => console.log(error));
  };

  useEffect(() => {
    createUser();
  }, []);
  console.log(tareas);


  return (
    <div className="Container text-center">
      <h1>Lista de tareas de Olaia</h1>
      <div className="inputContainer">
        <input type="text" onChange={handlechange} value={inputValue} />
        <button className="AgregarTarea"
          onClick={() => {
            addTask();
            setInput("");
          }}
        >
          <b>Agregar tarea</b>
        </button>
      </div>
      <ul>
        {tareas?.map((tarea) => {
          return <ul className="list-item mt-3">{tarea.label} <button type="button" className="btn-close mx-3" onClick={() => {
            deleteTask(tarea.id);
          }}
          ></button>

          </ul>;
        })}
      </ul>

    </div>
  );
};

export default Home;

















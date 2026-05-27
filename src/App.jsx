
import stats from "./components/stats";
import TaskInput from "./components/TaskInput";
import TaskCard from "./components/TaskCard";
import clock from "./components/clock";


import "./App.css";

import { useState, useEffect } from "react";

function App() {

  const [task, setTask] = useState("");

  const [darkMode, setDarkMode] = useState(

  function() {

    const savedTheme = localStorage.getItem("darkMode");

    return savedTheme === "true";

  }

);

  const [search, setSearch] = useState("");

  const [time, setTime] = useState(new Date());

  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState(

    function() {

      const savedTasks = localStorage.getItem("tasks");

      return savedTasks

        ? JSON.parse(savedTasks)

        : [];

    }

  );

  const [editIndex, setEditIndex] = useState(null);



  useEffect(

    function() {

      localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

      );

    },

    [tasks]

  );

  useEffect(

  function() {

    localStorage.setItem(

      "darkMode",

      darkMode

    );

  },

  [darkMode]

);

useEffect(

  function() {

    const timer = setInterval(

      function() {

        setTime(new Date());

      },

      1000

    );



    return function() {

      clearInterval(timer);

    };

  },

  []

);



  function addTask() {

    if (task.trim() === "") return;



    // EDIT MODE
    if (editIndex !== null) {

      const updatedTasks = tasks.map(

        function(item, index) {

          if (index === editIndex) {

            return {

              ...item,

              text: task

            };

          }

          return item;

        }

      );



      setTasks(updatedTasks);

      setEditIndex(null);

    }

    // ADD MODE
    else {

      setTasks([

        ...tasks,

        {

          text: task,

          completed: false,

          deadline:deadline

        }

      ]);

    }



    setTask("");

    setDeadline("");

  }



  function deleteTask(indexToDelete) {

    const updatedTasks = tasks.filter(

      function(item, index) {

        return index !== indexToDelete;

      }

    );



    setTasks(updatedTasks);

  }



  function editTask(index) {

    setTask(tasks[index].text);

    setEditIndex(index);

  }



  function toggleComplete(indexToToggle) {

    const updatedTasks = tasks.map(

      function(item, index) {

        if (index === indexToToggle) {

          return {

            ...item,

            completed: !item.completed

          };

        }

        return item;

      }

    );



    setTasks(updatedTasks);

  }
  function toggleDarkMode() {

  setDarkMode(!darkMode);

}

function clearAllTasks() {

  setTasks([]);

}
const filteredTasks = tasks.filter(

  function(item) {

    return item.text

      .toLowerCase()

      .includes(

        search.toLowerCase()

      );

  }

);

const hour = new Date().getHours();

let greeting = "";

if (hour < 12) {

  greeting = "Good Morning ☀️";

}

else if (hour < 18) {

  greeting = "Good Afternoon 🌤️";

}

else {

  greeting = "Good Evening 🌙";

}

const quotes = [

  "Stay consistent 🚀",

  "Small progress is still progress 💪",

  "Code. Learn. Repeat 🔥",

  "Discipline beats motivation ⚡",

  "Every expert was once a beginner 🌱"

];

const [randomQuote] = useState(

  quotes[

    Math.floor(

      Math.random() * quotes.length

    )

  ]

);

  return (

  <div className={darkMode ? "app dark" : "app"}>

    <div className="clock">

  {

    time.toLocaleTimeString()

  }

  </div>  

    <div className="container">

      <h1 className="title">Todo App</h1>
      
      <br/>

      <h2 className="greeting">

      {greeting}

      </h2>

      <p className="quote">

      {randomQuote}

      </p>

      <button onClick={toggleDarkMode}>

        {

          darkMode

            ? "Light Mode"

            : "Dark Mode"

        }

      </button>



      <div className="stats">

        <p>Total Tasks: {tasks.length}</p>

        <p>
          Completed Tasks:
          {

            tasks.filter(function(item) {

              return item.completed;

            }).length

          }
        </p>

        <p>
          Remaining Tasks:
          {

            tasks.filter(function(item) {

              return !item.completed;

            }).length

          }
        </p>

      </div>



      <div className="input-section">

        <input
          type="text"
          placeholder="Search tasks"

          value={search}

          onChange={function(e) {

            setSearch(e.target.value);

          }}
        />



       <input
  type="text"
  placeholder="Enter task"

  value={task}

  onChange={function(e) {

    setTask(e.target.value);

  }}

  onKeyDown={function(e) {

    if (e.key === "Enter") {

      addTask();

    }

  }}
/>

<input
  type="datetime-local"

  value={deadline}

  onChange={function(e) {

    setDeadline(e.target.value);

  }}
/>


        <button onClick={addTask}>

          {

            editIndex !== null

              ? "Update"

              : "Add"

          }

        </button>

      </div>



      {

        tasks.length === 0

          ? (

              <p>No Tasks Available</p>

            )

          : (

              filteredTasks.map(function(item, index) {

                return (

                  <div key={index} className="task-card">

                    <p
                      style={{

                        textDecoration:

                          item.completed

                            ? "line-through"

                            : "none"

                      }}
                    >

                      {item.text}

                      <br />

                      <small>

                      Deadline:

                      {

                        item.deadline

                        ? new Date(item.deadline)

                        .toLocaleString()

                        : "No Deadline"

                      }

                      </small>
                      {

                        item.deadline &&

                        !item.completed &&

                        new Date(item.deadline) < new Date()

                        && (

                          <p className="reminder">

                            ⚠️ Deadline Passed!

                          </p>

                        )

                      }

                    </p>



                    <div className="task-buttons">

                      <button
                        onClick={function() {

                          editTask(index);

                        }}
                      >

                        Edit

                      </button>



                      <button
                        onClick={function() {

                          deleteTask(index);

                        }}
                      >

                        Delete

                      </button>



                      <button
                        onClick={function() {

                          toggleComplete(index);

                        }}
                      >

                        {

                          item.completed

                            ? "Undo"

                            : "Complete"

                        }

                      </button>

                    </div>

                  </div>

                );

              })

            )

      }



      {

        tasks.length > 0 && (

          <button
            className="clear-btn"

            onClick={clearAllTasks}
          >

            Clear All

          </button>

        )

      }

    </div>

  </div>

);
}

export default App;
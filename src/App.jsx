import "./App.css";

import { useState, useEffect } from "react";


function App() {

  // =========================
  // STATES
  // =========================

  const [task, setTask] = useState("");

  const [search, setSearch] = useState("");

  const [deadline, setDeadline] = useState("");

  const [priority, setPriority] = useState("Medium");

  const [category, setCategory] = useState("Personal");

  const [filter, setFilter] = useState("all");

  const [time, setTime] = useState(new Date());

  const [editIndex, setEditIndex] = useState(null);

  // DARK MODE

  const [darkMode, setDarkMode] = useState(
    function () {

      const savedTheme =
        localStorage.getItem("darkMode");

      return savedTheme === "true";

    }
  );

  // TASKS

  const [tasks, setTasks] = useState(

    function () {

      const savedTasks =
        localStorage.getItem("tasks");

      const parsedTasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];

      return parsedTasks.map(
        function (item, index) {

          return {

            id:
              item.id ||
              Date.now() + index,

            text:
              item.text || "",

            completed:
              item.completed || false,

            deadline:
              item.deadline || "",

            priority:
              item.priority || "Medium",

            category:
              item.category || "Personal"

          };

        }
      );

    }

  );

  // =========================
  // SAVE TASKS
  // =========================

  useEffect(

    function () {

      localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
      );

    },

    [tasks]

  );

  // =========================
  // SAVE DARK MODE
  // =========================

  useEffect(

    function () {

      localStorage.setItem(
        "darkMode",
        darkMode
      );

    },

    [darkMode]

  );

  // =========================
  // CLOCK
  // =========================

  useEffect(

    function () {

      const timer = setInterval(

        function () {

          setTime(new Date());

        },

        1000

      );

      return function () {

        clearInterval(timer);

      };

    },

    []

  );

  // =========================
  // ADD TASK
  // =========================

  function addTask() {

    if (task.trim() === "") return;

    // EDIT MODE

    if (editIndex !== null) {

      const updatedTasks = tasks.map(

        function (item, index) {

          if (index === editIndex) {

            return {

              ...item,

              text: task,

              deadline: deadline,

              priority: priority,

              category: category

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

          id: Date.now(),

          text: task,

          completed: false,

          deadline: deadline,

          priority: priority,

          category: category

        }

      ]);

    }

    setTask("");

    setDeadline("");

    setPriority("Medium");

    setCategory("Personal");

  }

  // =========================
  // DELETE TASK
  // =========================

  function deleteTask(indexToDelete) {

    const updatedTasks = tasks.filter(

      function (item, index) {

        return index !== indexToDelete;

      }

    );

    setTasks(updatedTasks);

  }

  // =========================
  // EDIT TASK
  // =========================

  function editTask(index) {

    setTask(tasks[index].text);

    setDeadline(tasks[index].deadline);

    setPriority(tasks[index].priority);

    setCategory(tasks[index].category);

    setEditIndex(index);

  }

  // =========================
  // TOGGLE COMPLETE
  // =========================

  function toggleComplete(indexToToggle) {

    const updatedTasks = tasks.map(

      function (item, index) {

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

  // =========================
  // DARK MODE
  // =========================

  function toggleDarkMode() {

    setDarkMode(!darkMode);

  }

  // =========================
  // CLEAR ALL
  // =========================

  function clearAllTasks() {

    setTasks([]);

  }

  // =========================
  // DRAG & DROP
  // =========================


  // =========================
  // FILTER TASKS
  // =========================

  const filteredTasks = tasks.filter(

    function (item) {

      const matchesSearch =
        item.text
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      if (filter === "completed") {

        return (
          matchesSearch &&
          item.completed
        );

      }

      if (filter === "pending") {

        return (
          matchesSearch &&
          !item.completed
        );

      }

      return matchesSearch;

    }

  );

  // =========================
  // GREETING
  // =========================

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

  // =========================
  // QUOTES
  // =========================

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

  // =========================
  // RETURN
  // =========================

  return (

    <div className={darkMode ? "app dark" : "app"}>

      {/* CLOCK */}

      <div className="clock">

        {
          time.toLocaleTimeString()
        }

      </div>

      <div className="container">

        {/* TITLE */}

        <h1 className="title">

          Todo App

        </h1>

        {/* GREETING */}

        <h2 className="greeting">

          {greeting}

        </h2>

        {/* QUOTE */}

        <p className="quote">

          {randomQuote}

        </p>

        {/* DARK MODE BUTTON */}

        <button onClick={toggleDarkMode}>

          {
            darkMode
              ? "Light Mode"
              : "Dark Mode"
          }

        </button>

        {/* FILTER BUTTONS */}

        <div className="filter-buttons">

          <button onClick={function () {

            setFilter("all");

          }}>

            All

          </button>

          <button onClick={function () {

            setFilter("completed");

          }}>

            Completed

          </button>

          <button onClick={function () {

            setFilter("pending");

          }}>

            Pending

          </button>

        </div>

        {/* STATS */}

        <div className="stats">

          <p>

            Total:
            {tasks.length}

          </p>

          <p>

            Completed:
            {
              tasks.filter(function (item) {

                return item.completed;

              }).length
            }

          </p>

          <p>

            Remaining:
            {
              tasks.filter(function (item) {

                return !item.completed;

              }).length
            }

          </p>

        </div>

        {/* INPUT SECTION */}

        <div className="input-section">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search tasks"
            value={search}
            onChange={function (e) {

              setSearch(e.target.value);

            }}
          />

          {/* TASK */}

          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={function (e) {

              setTask(e.target.value);

            }}
            onKeyDown={function (e) {

              if (e.key === "Enter") {

                addTask();

              }

            }}
          />

          {/* DEADLINE */}

          <input
            type="datetime-local"
            value={deadline}
            onChange={function (e) {

              setDeadline(e.target.value);

            }}
          />

          {/* PRIORITY */}

          <select
            value={priority}
            onChange={function (e) {

              setPriority(e.target.value);

            }}
          >

            <option value="High">

              High Priority

            </option>

            <option value="Medium">

              Medium Priority

            </option>

            <option value="Low">

              Low Priority

            </option>

          </select>

          {/* CATEGORY */}

          <select
            value={category}
            onChange={function (e) {

              setCategory(e.target.value);

            }}
          >

            <option value="Personal">

              Personal

            </option>

            <option value="Study">

              Study

            </option>

            <option value="Work">

              Work

            </option>

            <option value="Shopping">

              Shopping

            </option>

          </select>

          {/* ADD BUTTON */}

          <button onClick={addTask}>

            {
              editIndex !== null
                ? "Update"
                : "Add"
            }

          </button>

        </div>

        {/* TASK LIST */}

        {
  tasks.length === 0

    ? (

      <p>No Tasks Available</p>

    )

    : (

      filteredTasks.map(function (item, index) {

        return (

          <div
            key={item.id}
            className="task-card"
          >

            <p
              style={{

                textDecoration:
                  item.completed
                    ? "line-through"
                    : "none"

              }}
            >

              {item.text}

            </p>

            <div className="deadline">

              📅 Deadline:

              {
                item.deadline
                  ? new Date(
                      item.deadline
                    ).toLocaleString()
                  : " No Deadline"
              }

            </div>

            {
              item.deadline &&
              !item.completed &&
              new Date(item.deadline) < new Date()
              && (

                <span className="reminder">

                  ⚠️ Deadline Passed!

                </span>

              )
            }

            <div
              className={`priority ${item.priority}`}
            >

              Priority:
              {item.priority}

            </div>

            <div className="category">

              📂 {item.category}

            </div>

            <div className="task-buttons">

              <button
                onClick={function () {

                  editTask(index);

                }}
              >

                Edit

              </button>

              <button
                onClick={function () {

                  deleteTask(index);

                }}
              >

                Delete

              </button>

              <button
                onClick={function () {

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
        {/* CLEAR BUTTON */}

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
function TaskInput({

  task,

  setTask,

  search,

  setSearch,

  deadline,

  setDeadline,

  addTask,

  editIndex

}) {

  return (

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

  );

}

export default TaskInput;
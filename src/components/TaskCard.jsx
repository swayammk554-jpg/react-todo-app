function TaskCard({

  item,

  index,

  editTask,

  deleteTask,

  toggleComplete

}) {

  return (

    <div className="task-card">

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

}

export default TaskCard;
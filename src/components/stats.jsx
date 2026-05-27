function Stats({ tasks }) {

  return (

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

  );

}

export default Stats;
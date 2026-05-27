function Clock({ time }) {

  return (

    <div className="clock">

      {

        time.toLocaleTimeString()

      }

    </div>

  );

}

export default Clock;
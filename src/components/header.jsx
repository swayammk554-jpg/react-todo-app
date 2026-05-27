function Header({

  greeting,

  randomQuote,

  darkMode,

  toggleDarkMode

}) {

  return (

    <>

      <h1 className="title">

        Todo App

      </h1>



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

    </>

  );

}

export default Header;
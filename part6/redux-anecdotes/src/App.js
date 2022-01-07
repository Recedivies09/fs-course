import React, { useEffect, useState } from "react";
// import AnecdotesForm from "./components/AnecdoteForm";
// import AnecdoteList from "./components/AnecdoteList";
// import Filter from "./components/Filter";
// import Notification from "./components/Notification";

import { initialAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [test, setTest] = useState("");
  // const [time, setTime] = useStaet(0);
  useEffect(() => {
    // if (counter != 0) {

    if (test) {
      const interval = setInterval(() => {
        console.log(counter);
        setCounter(counter + 1);
      }, 2000);
      return () => clearInterval(interval);
    }

    // console.log(counter);
    // setInterval(() => {
    // setCounter(counter + 1);
    // console.log();
    // }, 3000);

    // }
  }, [test]);
  // const dispatch = useDis patch();
  // useEffect(() => {
  //   dispatch(initialAnecdotes());
  // }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      {counter} {test}
      <form>
        <div>
          <input type="text" onChange={(e) => setTest(e.target.value)} />
        </div>
      </form>
      {/* <button onClick={() => setCounter(counter + 1)}>cnt++</button> */}
      {/* <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdotesForm /> */}
    </div>
  );
};

export default App;

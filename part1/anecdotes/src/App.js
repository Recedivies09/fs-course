import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [votes, setVotes] = useState(Array(7).fill(0));
  const [selected, setSelected] = useState(0);

  const handleVotes = (selected) => {
    votes[selected]++;
    setVotes([...votes]);
  };

  const pickLargest = () => {
    let mx = 0,
      id = -1;
    votes.forEach((val, idx) => {
      if (mx <= val) {
        mx = val;
        id = idx;
      }
    });
    return id;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>
        has {votes[selected]}{" "}
        {votes[selected] < 2 ? <span>vote</span> : <span>votes</span>}
      </p>
      <button onClick={() => handleVotes(selected)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>
        Next Anecdotes
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[pickLargest()]}</p>
      <p>
        {votes[pickLargest]} has {votes[pickLargest()]}{" "}
        {votes[pickLargest()] < 2 ? <span>vote</span> : <span>votes</span>}
      </p>
    </div>
  );
};

export default App;

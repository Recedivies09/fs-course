import React, { useState } from "react";

const StatisticLine = ({ text, value, percent }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {percent ? <span>%</span> : <span></span>}
      </td>
    </tr>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const style = {
    "border-spacing": "0.5em 0.5em",
  };
  return (
    <div style={style}>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine
        text="average"
        value={(good - bad) / (good + bad + neutral)}
      />
      <StatisticLine
        text="positive"
        value={(good / (good + bad + neutral)) * 100}
        percent={true}
      />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h2>Statistics</h2>
      {!good && !bad && !neutral ? (
        <div>
          <p>No feedback given</p>
        </div>
      ) : (
        <div>
          <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
      )}
    </div>
  );
};

export default App;

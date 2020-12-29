import React, { useState } from "react";
import ReactDOM from "react-dom";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const random = Math.floor(Math.random() * 5);

  const handleSelected = () =>
    selected === random ? setSelected(0) : setSelected(random);

  const handleVoted = () => {
    setVoted({ ...voted, [selected]: voted[selected] + 1 || 0 });
  };

  const keys = Object.keys(voted);
  const largestValue = Math.max.apply(
    null,
    keys.map((key) => voted[key])
  );
  const mostVoted = keys.reduce((mostVoted, key) => {
    if (voted[key] === largestValue) {
      mostVoted.push(key);
    }
    return mostVoted;
  }, []);

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
      </div>
      <div>
        <button onClick={handleVoted}>Vote</button>
        <button onClick={handleSelected}>Next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {largestValue ? (
          <p>
            {props.anecdotes[mostVoted[0]]} has {largestValue} votes
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById("root")
);

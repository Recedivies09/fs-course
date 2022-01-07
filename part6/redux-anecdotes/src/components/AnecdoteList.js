import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;
  const voteAnecdote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    props.vote(anecdote, id);
    props.setNotification(anecdote.content, 5);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const st = state.filter;
  const filtered = state.anecdote.filter(
    (el) => el.content.toLowerCase().indexOf(st.toLowerCase()) !== -1
  );
  const anecdotes = filtered.sort((a, b) => b.votes - a.votes);
  return {
    anecdotes,
  };
};

export default connect(mapStateToProps, { vote, setNotification })(
  AnecdoteList
);

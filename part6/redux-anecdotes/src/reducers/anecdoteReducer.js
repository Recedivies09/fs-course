import anecdoteService from "../services/anecdoteService";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL_ANECDOTE":
      return action.data;
    case "VOTE":
      const id = action.data.id;
      const updatedAnecdote = action.data;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    case "ADD_ANECDOTE":
      return [...state, action.content];
    default:
      return state;
  }
};

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INITIAL_ANECDOTE",
      data: anecdotes,
    });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch({
      type: "ADD_ANECDOTE",
      content: newAnecdote,
    });
  };
};

export const vote = (anecdote, id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.updateVoteAnecdote(
      anecdote,
      id
    );
    dispatch({
      type: "VOTE",
      data: votedAnecdote,
    });
  };
};

export default reducer;

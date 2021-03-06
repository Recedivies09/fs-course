import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const data = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const updateVoteAnecdote = async (anecdote, id) => {
  const data = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  const response = await axios.patch(`${baseUrl}/${id}`, data);
  return response.data;
};

export default { getAll, createAnecdote, updateVoteAnecdote };

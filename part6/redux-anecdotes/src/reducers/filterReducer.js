const reducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.data;
    default:
      return state;
  }
};

export const filter = (data) => {
  return {
    type: "FILTER",
    data,
  };
};

export default reducer;

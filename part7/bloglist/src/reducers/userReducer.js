import APIUser from "../services/users";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "GET_USERS":
      return action.users;
    default:
      return state;
  }
};

export const getAllUser = () => async (dispatch) => {
  const users = await APIUser.getAll();
  dispatch({
    type: "GET_USERS",
    users,
  });
};

export default reducer;

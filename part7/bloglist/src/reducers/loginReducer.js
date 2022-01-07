import APILogin from "../services/login";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGGED_IN":
      return action.user;
    default:
      return state;
  }
};

export const getUser = () => async (dispatch) => {
  const loggedinUser = window.localStorage.getItem("loggedinUser");
  if (loggedinUser) {
    const user = JSON.parse(loggedinUser);
    dispatch({
      type: "LOGGED_IN",
      user,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const user = await APILogin.login({ username, password });

  window.localStorage.setItem("loggedinUser", JSON.stringify(user));
  dispatch({
    type: "LOGIN",
    user,
  });
};

export default reducer;

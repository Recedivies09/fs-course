const reducer = (state = "", action) => {
  switch (action.type) {
    case "SETTING":
      return action.notifciation;
    case "REMOVE":
      return "";
    default:
      return state;
  }
};

let timer = null;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SETTING",
      notifciation: content,
    });
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      dispatch({
        type: "REMOVE",
      });
    }, time * 1000);
  };
};

export default reducer;

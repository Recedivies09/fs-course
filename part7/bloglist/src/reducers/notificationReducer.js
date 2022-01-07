const reducer = (state = "", action) => {
  switch (action.type) {
    case "SUCCESS_NOTIF":
      return { message: action.notification, success: true };
    case "ERROR_NOTIF":
      return { message: action.notification, success: false };
    case "REMOVE_NOTIF":
      return "";
    default:
      return state;
  }
};

let timer = null;

export const setNotification = (message, time, success) => async (dispatch) => {
  dispatch({
    type: success ? "SUCCESS_NOTIF" : "ERROR_NOTIF",
    notification: message,
  });

  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  timer = setTimeout(() => {
    dispatch({
      type: "REMOVE_NOTIF",
    });
  }, time * 1000);
};

export default reducer;

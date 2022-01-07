import React from "react";

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null;
  }
  return (
    <div className={errorMessage === null ? "success" : "error"}>
      {errorMessage === null ? successMessage : errorMessage}
    </div>
  );
};

export default Notification;

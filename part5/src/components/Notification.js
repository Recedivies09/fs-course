import React from "react";

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) return null;
  return (
    <div className={successMessage ? "success" : "error"}>
      {successMessage === null ? errorMessage : successMessage}
    </div>
  );
};

export default Notification;

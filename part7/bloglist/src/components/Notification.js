import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const message = props.notification.message;
  if (!message) return null;
  const success = props.notification.success;
  return (
    <div className={success ? "success" : "error"}>
      {message ? message : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);

import React from "react";

const Button = (props) => {
  let { type, clickhandler } = props;
  return (
    <button
      className={`${type === "red" ? "btn-red" : "btn-blue"} btn-general`}
      onClick={clickhandler}
    >
      {props.children}
    </button>
  );
};

export default Button;

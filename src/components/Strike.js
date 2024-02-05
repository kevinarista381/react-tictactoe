import React from "react";

const Strike = ({ strikeType }) => {
  console.log(strikeType);
  return <div className={`strike strike-${strikeType}`}></div>;
};

export default Strike;

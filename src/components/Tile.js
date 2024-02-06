import React from "react";
const Tile = (props) => {
  let { tileValue, onTileClick, playerTurn, isClickable } = props;

  return (
    <div className="tile" onClick={isClickable && onTileClick}>
      <span className={!tileValue && "hoverClass"}>
        {tileValue ?? (isClickable && playerTurn)}
      </span>
    </div>
  );
};

export default Tile;

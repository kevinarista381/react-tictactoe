import React from "react";

const Announcement = (props) => {
  let { gameTurn, playerTurn, winner, isDraw } = props;
  let isStarting = gameTurn <= 0;

  if (winner || isDraw)
    return (
      <div className="announcement">
        <h1>{winner ? `Player ${winner} Wins!` : "Its a draw!"}</h1>
      </div>
    );
  return (
    <div className="announcement">
      {isStarting ? (
        <h1>Please choose who starts first</h1>
      ) : (
        <h1>Its player {playerTurn}'s Turn!</h1>
      )}
    </div>
  );
};

export default Announcement;

import React, { useCallback, useEffect, useState } from "react";
import Tile from "./Tile";
import GeneralModal from "./shared-components/GeneralModal";
import Announcement from "./Announcement";
import Strike from "./Strike";

const PLAYER_X = "X";
const PLAYER_O = "O";
const DIAGONAL_INDEXES_1 = [0, 4, 8];
const DIAGONAL_INDEXES_2 = [2, 4, 6];

const Board = () => {
  let [tileValues, setTileValues] = useState(Array(9).fill(null));
  let [gameTurn, setGameTurn] = useState(0);
  let [playerTurn, setPlayerTurn] = useState();
  let [winner, setWinner] = useState(null);
  let [strikeType, setStrikeType] = useState();

  let buttons = [
    {
      type: "blue",
      text: PLAYER_X,
      handler: () => {
        setPlayerTurn(PLAYER_X);
        setGameTurn(1);
      },
    },
    {
      type: "blue",
      text: PLAYER_O,
      handler: () => {
        setPlayerTurn(PLAYER_O);
        setGameTurn(1);
      },
    },
  ];

  let allEqual = (arr) =>
    arr.every((item) => item === arr[0]) && !arr.includes(null);

  let checkWinner = useCallback((newtileValues, index) => {
    let row = index >= 6 ? 2 : index >= 3 ? 1 : 0;
    let column = index - 3 * row;
    let diagonalArr1 = DIAGONAL_INDEXES_1.map((index) => newtileValues[index]);
    let diagonalArr2 = DIAGONAL_INDEXES_2.map((index) => newtileValues[index]);
    let rowArr = [];
    let colArr = [];
    for (let i = 0; i < 3; i++) {
      rowArr.push(newtileValues[3 * row + i]);
      colArr.push(newtileValues[3 * i + column]);
    }

    if (allEqual(rowArr)) {
      setWinner(playerTurn);
      setStrikeType(`row-${row}`);
      return;
    }

    if (allEqual(colArr)) {
      setWinner(playerTurn);
      setStrikeType(`col-${column}`);
      return;
    }

    if (DIAGONAL_INDEXES_1.includes(index) && allEqual(diagonalArr1)) {
      setWinner(playerTurn);
      setStrikeType(`diagonal-1`);
      return;
    }
    if (DIAGONAL_INDEXES_2.includes(index) && allEqual(diagonalArr2)) {
      setWinner(playerTurn);
      setStrikeType(`diagonal-2`);
      return;
    }

    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
  });

  let onTileClick = useCallback((index) => {
    if (tileValues[index]) return;
    let newtileValues = [...tileValues];
    newtileValues[index] = playerTurn;
    setTileValues(newtileValues);
    checkWinner(newtileValues, index);
  });

  return (
    <div className="board">
      {[...Array(9)].map((_, index) => (
        <Tile
          key={`tiles-${index}`}
          tileValue={tileValues[index]}
          onTileClick={() => !winner && onTileClick(index)}
          playerTurn={playerTurn}
          isClickable={!winner}
        />
      ))}

      <Announcement
        gameTurn={gameTurn}
        isDraw={!tileValues.includes(null)}
        playerTurn={playerTurn}
        winner={winner}
      />

      <GeneralModal
        isVisible={!!!gameTurn}
        prompt="Choose which player to go first"
        buttons={buttons}
      />

      {winner && <Strike strikeType={strikeType} />}
    </div>
  );
};

export default Board;

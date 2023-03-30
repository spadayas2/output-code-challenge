import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";

const NewHockeyCard = (props) => {
  const [cardQuantity, setCardQuantity] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [subTotal, setSubTotal] = useState(0);

  const cardQuantityHandler = (event) => {
    const quatity = event.target.value;
    const total = quatity * 10;
    setCardQuantity(quatity);
    setSubTotal(total);
    props.updateHockeyCard({
      id: props.value.id,
      selectedPlayer: selectedPlayer,
      quantity: quatity,
      subTotal: total,
    });
  };

  const playerDropDownHandler = (event) => {
    const player = event.target.value;
    setSelectedPlayer(event.target.value);
    props.updateHockeyCard({
      id: props.value.id,
      selectedPlayer: player,
      quantity: cardQuantity,
      subTotal: subTotal,
    });
  };

  return (
    <div>
      <div>
        <select value={selectedPlayer} onChange={playerDropDownHandler}>
          <option value="">Select a Player</option>
          {props.playersDropDownData.map((player) => (
            <option value={player}>{player}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          onChange={cardQuantityHandler}
          value={cardQuantity}
          disabled={selectedPlayer === ""}
        ></input>
        <label>$ {subTotal.toFixed(2)}</label>
      </div>
    </div>
  );
};

export default NewHockeyCard;

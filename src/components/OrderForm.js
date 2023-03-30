import React, { useState, useEffect } from "react";
import NewHockeyCard from "./NewHockeyCard";
import "./OrderForm.css";
import { Navigate } from "react-router-dom";
import Logo from './Logo';

const urlPlayers =
  "https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster";

const OrderForm = () => {
  const [dropDownData, setdropDownData] = useState([]);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLasttName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [newHockeyCardList, setNewHockeyCardList] = useState([]);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [showInvoice, setShowInvoice] = useState(false);

  let ddData = [];

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(urlPlayers);

      result.json().then((json) => {
        let rosterArray = json.teams.map((team) => {
          return {
            teamName: team.name,
            roster: team.roster.roster.map((persons) => persons.person),
          };
        });

        rosterArray
          .map((team) =>
            team.roster.map((person) => team.teamName + " - " + person.fullName)
          )
          .map((team) => {
            ddData = ddData.concat(team);
          });

        setdropDownData(ddData);
      });
    };
    fetchData();
  }, []);

  const firstNameHandler = (event) => {
    setEnteredFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setEnteredLasttName(event.target.value);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const addNewCardHandler = () => {
    setNewHockeyCardList((prevState) => {
      return [
        ...prevState,
        {
          id: Math.random().toString(),
          selectedPlayer: "",
          quantity: 0,
          subTotal: 0,
        },
      ];
    });
  };

  const updateHockeyCardList = (cardData) => {
    const index = newHockeyCardList.findIndex((card) => {
      return card.id === cardData.id;
    });
    setNewHockeyCardList((prev) => {
      prev[index] = cardData;
      setInvoiceTotal(
        prev.reduce((total, card) => (total += card.subTotal), 0)
      );
      return [...prev];
    });
  };

  const invoiceHandler = () => {
    setShowInvoice(true);
  };

  const isValidInvoice = () => {
    let isValid = true;

    if (enteredFirstName.trim() === "") isValid = false;

    if (enteredLastName.trim() === "") isValid = false;

    if (enteredEmail.trim() === "") isValid = false;

    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!enteredEmail || regex.test(enteredEmail) === false) {
      isValid = false;
    }

    if (newHockeyCardList.length <= 0) isValid = false;

    if (invoiceTotal <= 0) isValid = false;

    newHockeyCardList.forEach((card) => {
      if (card.selectedPlayer === "") {
        isValid = false;
      }
    });

    return isValid;
  };

  return (
    <div>
      <div className="card">
        <div>
        <Logo />
        </div>
        <div className="order-form-input">
          <label>First Name : </label>
          <input type="text" onChange={firstNameHandler}></input>
        </div>
        <div className="order-form-input">
          <label>Last Name : </label>
          <input type="text" onChange={lastNameHandler}></input>
        </div>
        <div className="order-form-input">
          <label>Email : </label>
          <input type="text" onChange={emailHandler}></input>
        </div>
        <div className="order-form-input">
          {newHockeyCardList.map((hockeyCard) => (
            <NewHockeyCard
              key={hockeyCard.id}
              value={hockeyCard}
              playersDropDownData={dropDownData}
              updateHockeyCard={updateHockeyCardList}
            />
          ))}
        </div>
        <div className="order-form-input">
          <button onClick={addNewCardHandler} className="order-form-button">Add New Card</button>
        </div>
        <div className="order-form-input-total">
          <label className="total"><h2>Total: $ {invoiceTotal.toFixed(2)} </h2></label>
        </div>
        <div className="order-form-input">
          <button onClick={invoiceHandler} disabled={!isValidInvoice()} className="order-form-button">
            Create Invoice
          </button>
        </div>
      </div>
      {showInvoice && (
        <Navigate
          to="/invoice"
          state={{ data: newHockeyCardList, total: invoiceTotal }}
        />
      )}
    </div>
  );
};

export default OrderForm;

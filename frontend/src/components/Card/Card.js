import React, { useState, useContext, useEffect } from "react";
import "./Card.scss";

const Card = ({ ChromeLista, removeCard }) => {
  return (
    <>
      <div className="logo_card">
        <h1>TechniCard</h1>
      </div>
      <div className="Card">
        <h3>CARD</h3>
        {ChromeLista.map((product) => {
          return (
            <div
              key={product.split(",")[0]}
              className="Cardproduct"
              id={product.split(",")[4]}
            >
              <p>{product.split(",")[1]}</p>
              <p>{product.split(",")[2]}</p>
              <p>{product.split(",")[3]} zł</p>
              <button
                className="button_delete"
                onClick={() => removeCard(product)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;

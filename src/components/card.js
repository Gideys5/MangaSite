import React, { Component, useContext } from "react";
import CartContext from "../context/CartContext";


const Card = ({ card }) => {
    const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
    const inCart = isInCart(card.id);

    return (
        <div className='col'>
            <div className="card" style={{width: `18rem`, textAlign: 'center'}}>
                <img src={card.immagine} className="card-img-top" alt="..."
                     style={{width: `18rem`, height: `16rem`, textAlign: 'center'}}/>
                <div className="card-body">
                    <h5 className="card-title">{card.nome}</h5>
                    <p className="card-text">{card.trama}</p>
                    {inCart ? (
                        <button className="btn btn-outline-danger" onClick={() => removeFromCart(card.id)}>Rimuovi dalla
                            Libreria</button>
                    ) : (
                        <button className="btn btn-outline-primary" onClick={() => addToCart(card)}>Aggiungi alla
                            Libreria</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;
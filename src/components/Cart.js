import React, {useContext} from "react";
import CartContext from "../context/CartContext";
import {Link} from "react-router-dom";

const Cart = () => {
    const {cart, removeFromCart} = useContext(CartContext);

    return (
        <div className={"container"}>
            <h3>Il tuo carrello</h3>
            <ul className="list-group">
                {cart.map(item => (
                    <li key={item.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center" style={{textAlign: 'center'}}>
                            <img src={item.immagine} alt={item.nome} style={{width: `12rem`, height: `10rem`}}/>
                            <div>
                                <h5>{item.nome}</h5>
                                <p>{item.trama}</p>
                            </div>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => removeFromCart(item.id)}
                            >Rimuovi
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {cart.length > 0 && (
                <div className="d-flex justify-content-end mt-3">
                    <Link to="/checkout" className="btn btn-primary">Invia manga</Link>
                </div>
            )}
        </div>
);
};
export default Cart;
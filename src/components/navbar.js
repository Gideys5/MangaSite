// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

function Navbar() {
    const { cart } = useContext(CartContext);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand mb-0 h1">Manga Site</Link>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div>
                    <Link to="/cart" className="btn btn-outline-light">
                        Carrello ({cart.length})
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

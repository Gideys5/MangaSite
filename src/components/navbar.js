import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import logo from '../anime_photos/logo.jpg';


function Navbar({onSearch}) {
    const { cart } = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
                </Link>
                <form className="d-flex" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/*<button className="btn btn-outline-success" type="submit">Search</button>*/}
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

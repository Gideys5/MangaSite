import React, {useState, useContext} from 'react';
import CartContext from '../context/CartContext';
import emailjs from "emailjs-com";
import {Link, useNavigate} from "react-router-dom";

const CheckoutForm = () => {
    const {cart, clearCart} = useContext(CartContext);
    const [formData, setFormData] = useState({nome: '', cognome: '', email: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cartItemsHTML = cart.map(item => `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <h4>${item.nome}</h4>
                <p>${item.trama}</p>
            </div>
        `).join('');

        const templateParams = {
            nome: formData.nome,
            cognome: formData.cognome,
            email: formData.email,
            carrello: cartItemsHTML,
        };

        emailjs.send('service_q746du1', 'template_gqe7jh9', templateParams, 'YKDW1bZTRbu04p2y9')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                clearCart();
                alert('Email inviata con successo!');
                navigate("/");
            }, (err) => {
                console.error('FAILED...', err);
            });
    };


    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Acquisto</h3>
                <Link to="/cart" className="btn btn-danger">Torna al carrello</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cognome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Invia</button>
            </form>
        </div>
    );
};

export default CheckoutForm;

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/navbar";
import Card from "./components/card";
import bc from "./anime_photos/black_clover.jpeg";
import op from "./anime_photos/one_piece.jpg";
import bl from "./anime_photos/blue_lock.jpeg";
import ds from "./anime_photos/demon_slayer.jpg";
import jk from "./anime_photos/jujutsu_kaisen.jpg";
import tr from "./anime_photos/tokyo_revengers.jpeg";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

class App extends Component {
    state = {
        cards: [
            { id: 1, nome: "Black Clover", trama: "Maghi e demoni che fanno cose", immagine: bc },
            { id: 2, nome: "One Piece", trama: "Avventura di pirati", immagine: op },
            { id: 3, nome: "Tokyo Revengers", trama: "Risse di gang giapponesi", immagine: tr },
            { id: 4, nome: "Jujutsu Kaisen", trama: "Stregonì contro maledizioni", immagine: jk },
            { id: 5, nome: "Blue Lock", trama: "Chi diventerà il N° 1 nel calcio?", immagine: bl },
            { id: 6, nome: "Demon Slayer", trama: "Per salvare la sorella dai demoni", immagine: ds },
        ]
    }

    render() {
        return (
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <h3>Seleziona i manga che vuoi aggiungere alla tua libreria!</h3>
                                <hr />
                                <div className='row'>
                                    {this.state.cards.map(card => (
                                        <Card
                                            key={card.id}
                                            card={card}
                                        />
                                    ))}
                                </div>
                            </>
                        } />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<CheckoutForm />}></Route>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;

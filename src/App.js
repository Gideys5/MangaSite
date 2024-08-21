import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
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
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import {getDoc, doc} from "firebase/firestore";
import {db, auth} from "./firebase";
import {AuthProvider} from "./context/AuthContext"; // Assicurati di avere `auth` e `db` configurati correttamente

class App extends Component {
    state = {
        cards: [
            {id: 1, nome: "Black Clover", trama: "Maghi e demoni che fanno cose", immagine: bc},
            {id: 2, nome: "One Piece", trama: "Avventura di pirati", immagine: op},
            {id: 3, nome: "Tokyo Revengers", trama: "Risse di gang giapponesi", immagine: tr},
            {id: 4, nome: "Jujutsu Kaisen", trama: "Stregonì contro maledizioni", immagine: jk},
            {id: 5, nome: "Blue Lock", trama: "Chi diventerà il N° 1 nel calcio?", immagine: bl},
            {id: 6, nome: "Demon Slayer", trama: "Per salvare la sorella dai demoni", immagine: ds},
        ],
        searchTerm: '',
        cart: []
    };

    // Caricamento del carrello dal DB
    loadCart = async () => {
        if (auth.currentUser) {
            const cartFromDB = await this.fetchCartFromDB(auth.currentUser.uid);
            this.setState({cart: cartFromDB});
        }
    }

    // Definisce `fetchCartFromDB` come metodo della classe
    fetchCartFromDB = async (userId) => {
        const docRef = doc(db, "carts", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().cart;
        } else {
            console.log("No such document!");
            return [];
        }
    };

    handleSearch = (searchTerm) => {
        this.setState({searchTerm});
    };

    componentDidMount() {
        this.loadCart();
    }

    render() {
        const filteredCards = this.state.cards.filter(card =>
            card.nome.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        );
        return (
                <Router>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <>
                                        <Navbar onSearch={this.handleSearch}/>
                                        <h3>Seleziona i manga che vuoi aggiungere alla tua libreria!</h3>
                                        <hr/>
                                        <div className='row'>
                                            {filteredCards.map(card => (
                                                <Card
                                                    key={card.id}
                                                    card={card}
                                                    addToCart={this.addToCart}
                                                />
                                            ))}
                                        </div>
                                    </>
                                </ProtectedRoute>
                            }/>
                            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                            <Route path="/checkout" element={<ProtectedRoute><CheckoutForm /></ProtectedRoute>} />
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/login" element={<Login/>}/>
                            {/*<Route path="/checkout" element={<ProtectedRoute element={<CheckoutForm />} />} />*/}
                        </Routes>
                    </div>
                </Router>
        );
    }
}

export default App;

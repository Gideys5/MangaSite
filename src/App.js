import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/navbar";
import Card from "./components/card";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import {getDoc, doc} from "firebase/firestore";
import {db, auth} from "./firebase";
import {catchAnime} from "./api/CallManga";

class App extends Component {
    state = {
        cards: [],
        searchTerm: '',
    };

    // Funzione per fare fetch all'API e ottenere i primi 50 manga
    fetchMangaData = async () => {
        const url = 'https://myanimelist.p.rapidapi.com/manga/top/all?p=1';

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '451d784a9amsh6c4e6d49475f571p1b35cdjsn958a9a248ee4',
                'x-rapidapi-host': 'myanimelist.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            // Mappare i dati ricevuti e aggiornare lo stato
            const mangaCards = data?.map(manga => ({
                id: manga.myanimelist_id,
                nome: manga.title,
                immagine: manga.picture_url,
            }));

            this.setState({cards: mangaCards});
        } catch (error) {
            console.error('Errore durante il fetch dei manga:', error);
        }
    };

    componentDidMount() {
        this.fetchMangaData(); // Caricare i manga al montaggio del componente
    }

    handleSearch = (searchTerm) => {
        this.setState({searchTerm});
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

    render() {
        const filteredCards = this.state.cards.filter(card =>
            card.nome.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        );
        return (
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Navbar onSearch={this.handleSearch}/>
                                <ProtectedRoute>
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
                                </ProtectedRoute>
                            </>
                        }/>
                        <Route path="/cart" element={<ProtectedRoute><Navbar/><Cart/></ProtectedRoute>}/>
                        <Route path="/checkout" element={<ProtectedRoute><CheckoutForm/></ProtectedRoute>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;

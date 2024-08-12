import React, { createContext, useState } from 'react';
import {catchAnime} from "../api/CallManga";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // const addToCart = (item) => {
    //     if (!cart.some(cartItem => cartItem.id === item.id)) {
    //         setCart([...cart, item]);
    //     }
    // };
    const addToCart = async (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            try {
                if (item.id && item.id !== 0) {  // Assicurati che l'ID sia valido
                    console.log(item.id)
                    const mangaDetails = await catchAnime(item.id);
                    console.log(mangaDetails);
                    setCart([...cart, { ...item, details: mangaDetails }]);
                } else {
                    console.error("ID del manga non valido:", item.id);
                }
            } catch (error) {
                console.error('Errore nell\'aggiungere il manga al carrello', error);
            }
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const isInCart = (itemId) => {
        return cart.some(item => item.id === itemId);
    };
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

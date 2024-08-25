import React, { createContext, useState } from 'react';
import {auth, db} from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import {catchAnime} from "../api/CallManga";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const saveCartToDB = async (userId, cart) => {
        try {
            await setDoc(doc(db, "carts", userId), { cart });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const addToCart = async  (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            const info = await catchAnime(item.id)
            const updatedItem = {
                ...item,
                trama: info.synopsis,
                volumi: info?.information.volumes || "Ancora in corso"
            };
            const updatedCart = [...cart, updatedItem];
            setCart(updatedCart);
            await saveCartToDB(auth.currentUser.uid, updatedCart);

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

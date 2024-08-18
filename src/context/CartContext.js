import React, { createContext, useState } from 'react';
import {auth, db} from '../firebase';
import { doc, setDoc } from "firebase/firestore";

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

    const addToCart = (item) => {
        if (!cart.some(cartItem => cartItem.id === item.id)) {
            const updatedCart = [...cart, item];
            setCart(updatedCart);
            saveCartToDB(auth.currentUser.uid, updatedCart);

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

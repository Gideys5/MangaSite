import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {useNavigate} from "react-router-dom"; // Assicurati di aver configurato Firebase correttamente

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

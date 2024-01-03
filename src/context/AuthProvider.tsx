/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from '../api/axios';

const feedURL: string = process.env.REACT_APP_FEEDS ?? '';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Auth {
    data: {};
}

interface AuthContextType {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<Auth>({ data: {} });

    useEffect(() => {
        const user: string | null = localStorage.getItem('userInfo');

        if (user !== null) {
            const fetchData = async () => {
                try {
                    const newUser = await axios.get(feedURL);
                    const newData = newUser.data.message[0];
                    setAuth({ data: newData });
                } catch (error) { }
            };

            fetchData();
        }
    }, []);

    const contextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export default AuthContext;

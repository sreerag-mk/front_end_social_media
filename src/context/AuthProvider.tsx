import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "../api/axios";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Auth {
    username: string;
}

interface AuthContextType {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<Auth>({ username: '' });

    useEffect(() => {
        const user: string | null = localStorage.getItem('userInfo');
        let userparse: string | null = null;

        if (user !== null) {
            try {
                userparse = JSON.parse(user);
                const headers = {
                    Authorization: `Bearer ${userparse}`
                };

                const fetchData = async () => {
                    try {
                        const newUser = await axios.get('/service/profile', { headers });
                        const newUsername = newUser.data.message[0].user_name;
                        setAuth(prevAuth => ({ ...prevAuth, username: newUsername }));
                    } catch (error) {
                        console.log('Error fetching profile data:', error);
                    }
                };

                fetchData();
            } catch (error) {
                console.log('Error parsing user data:', error);
            }
        } else {
            console.log("No user info found");
        }
    }, []);

    const contextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

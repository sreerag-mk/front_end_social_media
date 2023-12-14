import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Auth {
    username: string;
}

interface AuthContextType {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
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
                        setAuth(({ username: newUsername }));
                    } catch (error) {
                        navigate('/login')
                    }
                };

                fetchData();
            } catch (error) {
                console.log('login error at second')
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

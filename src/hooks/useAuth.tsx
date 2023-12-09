import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';


interface Auth {
    [key: string]: any;
}

const useAuth = (): Auth => {
    const authData = useContext(AuthContext);
    return authData as Auth;
};

export default useAuth;

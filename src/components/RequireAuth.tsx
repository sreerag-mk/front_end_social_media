

import { useLocation, Navigate, Outlet } from 'react-router-dom'


const RequireAuth = () => {
    const location = useLocation();
    const user = localStorage.getItem('userInfo');
    return (
        user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />

    )

}

export default RequireAuth;
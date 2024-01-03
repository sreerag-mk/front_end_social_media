/* eslint-disable prettier/prettier */
import useAuth from '../hooks/useAuth'



function Settings() {
    const { auth } = useAuth();
    return (
        <div className="page">
            <h1>Welcome to Settings {auth.username}</h1>
        </div >
    )


}

export default Settings
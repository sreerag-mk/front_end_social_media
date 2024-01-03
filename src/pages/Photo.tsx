/* eslint-disable prettier/prettier */
import useAuth from '../hooks/useAuth'


function Photo() {
    const { auth } = useAuth();
    return (
        <div className="page">
            <h1>Welcome to photo {auth.username}</h1>
        </div >
    )


}

export default Photo
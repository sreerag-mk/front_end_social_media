import useAuth from "../hooks/useAuth"
import './page.css'


function Photo() {
    const { auth } = useAuth();
    console.log("the auth is ")
    console.log(auth)
    return (
        <div className="page">
            <h1>Welcome to photo {auth.username}</h1>
        </div >
    )


}

export default Photo
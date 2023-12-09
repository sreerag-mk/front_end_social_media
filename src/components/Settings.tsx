import useAuth from "../hooks/useAuth"
import './page.css'



function Settings() {
    const { auth } = useAuth();
    console.log("the auth is ")
    console.log(auth)
    return (
        <div className="page">
            <h1>Welcome to Settings {auth.username}</h1>
        </div >
    )


}

export default Settings
import useAuth from "../hooks/useAuth"
import '../components/page.css'


function HomePage() {
    const { auth } = useAuth();
    console.log("the auth is ")
    console.log(auth)
    return (
        <div className="page">
            <h1>Welcome to HomePage {auth.username}</h1>
        </div >
    )


}

export default HomePage
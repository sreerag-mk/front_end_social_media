import React, { useState } from 'react'
import '../pages/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [usernamenew, setUsernamenew] = useState<string>('')
    const [passwordnew, setPasswordnew] = useState<string>('')
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const fetchFeeds = async (username: string, password: string) => {

        return axios.post('/auth/login', {
            username, password
        })
    }
    const handleLogin = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const datas = await fetchFeeds(usernamenew, passwordnew);
            const data = datas.data.token
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate('/home')
        }
        catch (errors: any) {
            setError(errors.message);
        }
    }
    return (
        <div className="box">
            <form className="form" onSubmit={handleLogin}>
                {error && <p className='errorMessage'>Error: {error}</p>}
                <h2>Login</h2>
                <div className="inputBox">
                    <input type="text"
                        value={usernamenew}
                        onChange={(e) => setUsernamenew(e.target.value)}
                    ></input>
                    <span>Username</span>
                    <i></i>

                </div>
                <div className="inputBox">
                    <input type="password"
                        value={passwordnew}
                        onChange={(e) => setPasswordnew(e.target.value)}
                    ></input>
                    <span>Password</span>
                    <i></i>

                </div>
                <div className="links">
                    <a>Forgot Password</a>
                    <a>Sign up</a>
                </div>
                <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login
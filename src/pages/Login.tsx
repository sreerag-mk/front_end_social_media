import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    type UserInfoType = {
        name: string;
        password: string;
    };
    const [userInfo, setUserInfo] = useState<UserInfoType>({ name: '', password: '' })
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const datas = await axios.post('/auth/login', { username: userInfo.name, password: userInfo.password })
        if (datas.data.success === true) {
            localStorage.setItem('userInfo', JSON.stringify(datas.data.token))
            navigate('/home')
        }
        else {
            setError(datas.data.message)
        }
    }
    return (
        <div className="loginBox">
            <form className="loginForm" onSubmit={handleLogin}>
                {error && <p className='errorMessage'>{error}</p>}
                <h2>Login</h2>
                <div className="loginInputBox">
                    <input type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        required={true}
                    ></input>
                    <span>Username</span>
                    <i></i>

                </div>
                <div className="loginInputBox">
                    <input type="password"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        required={true}
                    ></input>
                    <span>Password</span>
                    <i></i>

                </div>
                <div className="loginLinks">
                    <a href='http://localhost:3000/home'>Forgot Password</a>
                    <a href='http://localhost:3000/home'>Sign up</a>
                </div>
                <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}

export default Login
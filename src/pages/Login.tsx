/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginStyles from './Login.module.css';
import axios from '../api/axios';

const loginUrl: string = process.env.REACT_APP_LOGIN ?? '';

function Login() {
    localStorage.clear();
    type UserInfoType = {
        name: string;
        password: string;
    };
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        name: '',
        password: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState<null | string>(null);
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => {
        setShow(!show);
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(loginUrl, {
                username: userInfo.name,
                password: userInfo.password,
            });
            if (data.success === true) {
                localStorage.setItem('userInfo', JSON.stringify(data.token));
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (loginError) {
            setError('error at login');
        }
    };
    return (
        <div className={loginStyles.outerLogin}>
            <div className={loginStyles.loginBox}>
                <form className={loginStyles.loginForm} onSubmit={handleLogin}>
                    {error && <p className={loginStyles.errorMessage}>{error}</p>}
                    <h2>Login</h2>
                    <div className={loginStyles.loginInputBox}>
                        <input
                            type={loginStyles.text}
                            value={userInfo.name}
                            onChange={(e) =>
                                setUserInfo({ ...userInfo, name: e.target.value })
                            }
                            required={true}
                        />
                        <span>Username</span>
                        <i />
                    </div>
                    <div className={loginStyles.loginInputBox}>
                        <input
                            type={show ? 'text' : 'password'}
                            value={userInfo.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUserInfo({ ...userInfo, password: e.target.value })
                            }
                            required={true}
                        />
                        <span>Password</span>
                        <button type='button'
                            className={loginStyles.show}
                            onClick={handleClick}
                            onKeyDown={handleClick}

                        >
                            {show ? 'Hide' : 'Show'}
                        </button>
                        <i />
                    </div>
                    <div className={loginStyles.loginLinks}>
                        <Link to="/">Forgot password</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                    <input
                        className={loginStyles.loginInput}
                        type="submit"
                        value="Login"
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;

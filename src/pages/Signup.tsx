import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import signupStyles from './Signup.module.css'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth'
const signinUrl = process.env.REACT_APP_SIGNUP


const Signup = () => {
    const { setAuth } = useAuth();
    type signinUserInfoType = {
        first_name: string;
        last_name: string;
        user_name: string;
        password: string;
        phone_number: string;
        address: string;
        date_of_birth: string;
        confirm_password: string;
        gender: string;
    };
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [userInfo, setUserInfo] = useState<signinUserInfoType>({ first_name: '', last_name: '', user_name: '', password: '', phone_number: '', address: '', date_of_birth: '', confirm_password: '', gender: '' })
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo.password.length > 4) {
            if (userInfo.password === userInfo.confirm_password) {

                const { data } = await axios.post(signinUrl, { first_name: userInfo.first_name, last_name: userInfo.last_name, user_name: userInfo.user_name, address: userInfo.address, phone_number: userInfo.phone_number, dob: userInfo.date_of_birth, password: userInfo.password, gender: userInfo.gender })
                if (data.success === true) {
                    const loginDatas = await axios.post(process.env.REACT_APP_LOGIN, { username: userInfo.user_name, password: userInfo.password })
                    if (loginDatas.data.success === true) {
                        localStorage.setItem('userInfo', JSON.stringify(loginDatas.data.token))
                        const accessToken = data.token
                        const username = userInfo.user_name
                        const password = userInfo.password
                        setAuth({ username, password, accessToken })
                        navigate('/')
                    }
                }
                else {
                    setError(data.message)
                }
            } else {
                setError('passwords are not equal')
            }

        } else {
            setError('password is too short')
        }
    }
    return (
        <div className={signupStyles.outerSignup}>
            <div className={signupStyles.signupBox}>
                <form className={signupStyles.signupForm} onSubmit={handleSignup}>
                    {error && <p className={signupStyles.errorMessage}>{error}</p>}
                    <h2>signup</h2>
                    < div className={signupStyles.inputBox} >
                        <input type="text" value={userInfo.first_name}
                            onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })}
                            required={true} />
                        <span>First Name</span>
                    </div >
                    <div className={signupStyles.inputBox}>
                        <input type="text" value={userInfo.last_name}
                            onChange={(e) => setUserInfo({ ...userInfo, last_name: e.target.value })}
                            required={true} />
                        <span>Last Name</span>
                    </div>
                    <div className={signupStyles.inputBox}>
                        <input type="text" value={userInfo.user_name}
                            onChange={(e) => setUserInfo({ ...userInfo, user_name: e.target.value })}
                            required={true} />
                        <span>User Name</span>
                    </div>
                    <div className={signupStyles.inputBox}>
                        <input type="text" value={userInfo.phone_number}
                            onChange={(e) => setUserInfo({ ...userInfo, phone_number: e.target.value })}
                            required={true} />
                        <span>Phone Number</span>
                    </div>
                    <div className={signupStyles.inputBox}>
                        <input type="text" value={userInfo.address}
                            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                            required={true} />
                        <span>Address</span>
                    </div>
                    <div className={signupStyles.inputBox}>
                        <input type="date" value={userInfo.date_of_birth}
                            onChange={(e) => setUserInfo({ ...userInfo, date_of_birth: e.target.value })}
                            required={true} />
                    </div>
                    <div className={signupStyles.inputBox}>
                        <input type="text" value={userInfo.password}
                            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                            required={true} />
                        <span>Password</span>
                    </div>
                    <div className={signupStyles.inputBox}>
                        <input type="password" value={userInfo.confirm_password}
                            onChange={(e) => setUserInfo({ ...userInfo, confirm_password: e.target.value })}
                            required={true} />
                        <span>Confirm Password</span>
                    </div>
                    <div className={signupStyles.inputBox}>
                        <div className={signupStyles.gender}>
                            <div className={signupStyles.insideGender}>

                                <input type="radio" name='gender' id='male'
                                    value='male'
                                    checked={userInfo.gender === 'male'}
                                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
                                <label htmlFor="male"> Male</label>
                            </div>
                            <div className={signupStyles.insideGender}>
                                <input type="radio" name='gender' id='female'
                                    value='female'
                                    checked={userInfo.gender === 'female'}
                                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Signup" />
                    <div className={signupStyles.loginLinks}>
                        <p>Already have an account?</p>
                        <Link to='/login'>login</Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Signup




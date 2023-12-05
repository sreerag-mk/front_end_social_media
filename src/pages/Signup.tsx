import React, { useState } from 'react'
import './cssSignup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
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
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState<signinUserInfoType>({ first_name: '', last_name: '', user_name: '', password: '', phone_number: '', address: '', date_of_birth: '', confirm_password: '', gender: '' })
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo.password === userInfo.confirm_password) {

            const datas = await axios.post('/auth/signup', { first_name: userInfo.first_name, last_name: userInfo.last_name, user_name: userInfo.user_name, address: userInfo.address, phone_number: userInfo.phone_number, dob: userInfo.date_of_birth, password: userInfo.password, gender: userInfo.gender })
            if (datas.data.success === true) {
                console.log('signed in succesfully')
                console.log(datas.data)
                navigate('/login')
            }
            else {
                setError(datas.data.message)
            }
        } else {
            setError('passwords are not equal')
        }
    }
    return (
        <div>
            <form className="signupForm" onSubmit={handleSignup}>
                {error && <p className='errorMessage'>{error}</p>}
                <h2>signup</h2>
                < div className="inputBox" >
                    <input type="text" value={userInfo.first_name}
                        onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })}
                        required={true} />
                    <span>First Name</span>
                </div >
                <div className="inputBox">
                    <input type="text" value={userInfo.last_name}
                        onChange={(e) => setUserInfo({ ...userInfo, last_name: e.target.value })}
                        required={true} />
                    <span>Last Name</span>
                </div>
                <div className="inputBox">
                    <input type="text" value={userInfo.user_name}
                        onChange={(e) => setUserInfo({ ...userInfo, user_name: e.target.value })}
                        required={true} />
                    <span>User Name</span>
                </div>
                <div className="inputBox">
                    <input type="text" value={userInfo.phone_number}
                        onChange={(e) => setUserInfo({ ...userInfo, phone_number: e.target.value })}
                        required={true} />
                    <span>Phone Number</span>
                </div>
                <div className="inputBox">
                    <input type="text" value={userInfo.address}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        required={true} />
                    <span>Address</span>
                </div>
                <div className="inputBox">
                    <input type="date" value={userInfo.date_of_birth}
                        onChange={(e) => setUserInfo({ ...userInfo, date_of_birth: e.target.value })}
                        required={true} />
                </div>
                <div className="inputBox">
                    <input type="text" value={userInfo.password}
                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                        required={true} />
                    <span>Password</span>
                </div><div className="inputBox">
                    <input type="password" value={userInfo.confirm_password}
                        onChange={(e) => setUserInfo({ ...userInfo, confirm_password: e.target.value })}
                        required={true} />
                    <span>Confirm Password</span>
                </div>
                <div className="inputBox gender">
                    <div className='insideGender'>
                        <input type="radio" id='male' name='gender'
                            value='male'
                            checked={userInfo.gender === 'male'}
                            onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
                        <label htmlFor="male"> Male</label>
                    </div>
                    <div className='insideGender'>
                        <input type="radio" id='female' name='gender'
                            value='female'
                            checked={userInfo.gender === 'female'}
                            onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <input type="submit" value="Signup" />
            </form>
        </div>
    )
}

export default Signup




import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import headerStyles from './UserHeader.module.css'

const UserHeader: React.FC = () => {
    const [search, setSearch] = useState<string>('')
    const { auth } = useAuth();
    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.navigation}>
                <ul className={headerStyles.navigationlist}>
                    <li className={`${headerStyles.list} ${headerStyles.active}`} >
                        <Link to="/">
                            <span className={headerStyles.text}>Home</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list} >
                        <Link to="/profile">
                            <span className={headerStyles.text}>Profile</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list}>
                        <Link to="/message">
                            <span className={headerStyles.text}>Message</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list}>
                        <Link to="/photo">
                            <span className={headerStyles.text}>Photos</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list}>
                        <Link to="/settings">
                            <span className={headerStyles.text}>Settings</span>
                        </Link>
                    </li>
                </ul>
                <section className={headerStyles.form1}>
                    <form className={headerStyles.form}>
                        <input type={headerStyles.forminside}
                            placeholder="search anything"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required={true}
                        ></input>
                        <button type="submit" className={headerStyles.forminside}>
                            <img
                                src="https://www.freeiconspng.com/uploads/search-icon-png-5.png" alt="" /></button>
                    </form>

                </section>
                <ul>
                    <div className={headerStyles.login}>
                        <li className={`${headerStyles.list} ${headerStyles.login} ${headerStyles.userShowing}`}>
                            <h3 className={`${headerStyles.icon} ${headerStyles.userDetail}`}>Hi,</h3> <h3 className={`${headerStyles.icon} ${headerStyles.userDetail} ${headerStyles.userName} `}> {auth.username}</h3>
                        </li>
                        <li className={`${headerStyles.list} ${headerStyles.login}`}>
                            <Link onClick={handleLogout} to="/login">
                                <span className={`${headerStyles.text} ${headerStyles.userShowing} ${headerStyles.logout}`} >logout</span>
                            </Link>
                        </li>

                    </div>
                </ul>

            </div>
        </div>
    )
}

export default UserHeader
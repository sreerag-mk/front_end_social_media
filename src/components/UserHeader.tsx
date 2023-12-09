import React from 'react'
import { Link } from 'react-router-dom'
import headerStyles from './UserHeader.module.css'

const UserHeader: React.FC = () => {
    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <div className={headerStyles.header}>
            <div className={headerStyles.navigation}>
                <ul className={headerStyles.navigationlist}>
                    <li className={`${headerStyles.list} ${headerStyles.active}`} >
                        <Link to="/home">
                            <span className={headerStyles.icon}>
                            </span>
                            <span className={headerStyles.text}>Home</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list} >
                        <Link to="/profile">
                            <span className={headerStyles.icon}>
                            </span>
                            <span className={headerStyles.text}>Profile</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list}>
                        <Link to="/message">

                            <span className={headerStyles.icon} >
                            </span>
                            <span className={headerStyles.text}>Message</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list}>
                        <Link to="/photo">
                            <span className={headerStyles.icon}>
                            </span>
                            <span className={headerStyles.text}>Photos</span>
                        </Link>
                    </li>
                    <li className={headerStyles.list}>
                        <Link to="/settings">
                            <span className={headerStyles.icon}>
                            </span>
                            <span className={headerStyles.text}>Settings</span>
                        </Link>
                    </li>
                    <div className={headerStyles.indicator}></div>
                </ul>
                <ul>
                    <div className={headerStyles.login}>
                        <li className={`${headerStyles.list} ${headerStyles.login}`}>
                            <Link onClick={handleLogout} to="/login">
                                <span className={headerStyles.icon}>
                                </span>
                                <span className={headerStyles.text} >logout</span>
                            </Link>
                        </li>

                    </div>
                </ul>

            </div>
        </div>
    )
}

export default UserHeader
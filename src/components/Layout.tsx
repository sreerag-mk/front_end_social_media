import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import Footer from './Footer';


const Layout: React.FC = () => {
    return (
        <div className="App">
            <div className="header">
                <UserHeader />
            </div>
            <div className="body">
                <Outlet />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default Layout
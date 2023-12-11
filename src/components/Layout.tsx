import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import Footer from './Footer';
import Loading from './Loading'


function Layout() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)

    })
    if (isLoading) {
        return <Loading />
    }
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
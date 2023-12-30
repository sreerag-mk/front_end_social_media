
import { Outlet } from 'react-router-dom';
import UserHeader from './UserHeader';
import Footer from './Footer';
import layoutStyle from './Layout.module.css'
import Details from './Details';
import withAuth from '../HOC/WithAuth';
import Profile from './Profile';



function Layout() {
    const array: Array<string> = ['My Group', 'Friends']
    return (
        <div className={layoutStyle.main}>
            <div className={layoutStyle.header}>
                <UserHeader />
            </div>
            <div className={layoutStyle.body}>
                <div className={layoutStyle.left}>
                    {array.map((value) =>
                        <Details heading={value} key={value} />
                    )}
                </div>
                <div className={layoutStyle.middle}>
                    <Outlet />
                </div>
                <div className={layoutStyle.right}>
                    <Profile />
                </div>
            </div>
            <div className={layoutStyle.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default withAuth(Layout)
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import headerStyles from './UserHeader.module.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchProfile } from '../redux/slices/profile/ProfileData'
import Loading from './Loading'
import axios from '../api/axios'


const searchURL: string = process.env.REACT_APP_SEARCH ?? ''

const UserHeader: React.FC = () => {
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            localStorage.clear();
            console.log('loged out')
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    const handleSearchBtnClick = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(search)
        const sendType = {
            user_name: search
        }
        const { data } = await axios.get(searchURL, {
            params: sendType
        })
        navigate('/search', { state: search })
        console.log(data.message)
        return false;
    }

    const handleProfileClick = async () => {
        navigate('/profile', { state: dataState.id })
    }


    const dispatch = useAppDispatch()
    const dataState = useAppSelector((state) => state.profile.data);
    console.log('new id is equal to ', dataState)

    const isLoadingState = useAppSelector((state) => state.profile.isLoading);
    useEffect(() => {
        dispatch(fetchProfile())
    }, [])
    if (isLoadingState) {
        return <Loading />
    }
    return (


        <div className={headerStyles.header}>
            {dataState &&
                <><div className={headerStyles.name}>
                    <h1 className={headerStyles.nameh1}>KnowMe.</h1>

                </div><div className={headerStyles.nav}>
                        <div className={headerStyles.navigation}>
                            <div className={headerStyles.homeIcon}>
                                <Link to={'/'} >
                                    < i className="fa-solid fa-house" ></i>
                                </Link>
                            </div>
                            <div className={headerStyles.exploreIcon}>
                                <Link to={'/explore'} >

                                    <i className="fa-solid fa-compass"></i>
                                </Link>
                            </div>
                            <div className={headerStyles.messageIcon}>
                                <Link to={'/message'} >
                                    <i className="fa-solid fa-message"></i>
                                </Link>
                            </div>
                            <div className={headerStyles.messageIcon}>
                                <Link to={'/addpost'} >
                                    <i className="fa-solid fa-plus"></i>
                                </Link>
                            </div>
                            <div className={headerStyles.heartIcon}>
                                <Link to={'/settings'} >

                                    <i className="fa-solid fa-heart"></i>
                                </Link>
                            </div>
                        </div>
                        <div className={headerStyles.search}>
                            <form className={headerStyles.form}>
                                <input type="text"
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    required={true} />
                                <button type="submit" className={headerStyles.forminside} onClick={handleSearchBtnClick} onKeyUp={handleSearchBtnClick} >
                                    <img
                                        src="https://www.freeiconspng.com/uploads/search-icon-png-5.png" alt="Serach" /></button>
                            </form>
                        </div>
                    </div><div className={headerStyles.profile}>
                        <div className={headerStyles.profileIcons}>
                            <div className={headerStyles.saved}>
                                <Link to={'/saved'}>
                                    <i className="fa-solid fa-bookmark"></i>
                                </Link>
                            </div>
                            <div className={headerStyles.notification}>
                                <i className="fa-solid fa-bell"></i>

                            </div>
                        </div>
                        <div className={headerStyles.userDetail}>
                            <div className={headerStyles.username} onClick={handleProfileClick} onKeyDown={handleProfileClick}>
                                <a><img src={dataState.profile_picture} alt="" /></a>
                                <a><h5>
                                    {dataState.user_name}</h5>
                                </a>

                            </div>
                            <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout} onKeyUp={() => console.log('key is up')}></i>

                        </div>
                    </div></>
            }
        </div >
    )
}

export default UserHeader
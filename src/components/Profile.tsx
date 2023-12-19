import React, { useEffect } from 'react'
import ProfileStyle from './Profile.module.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchProfile } from '../redux/slices/profile/ProfileData'
import Loading from './Loading'

const Profile = () => {
    const dispatch = useAppDispatch()
    const dataState = useAppSelector((state) => state.profile.data);
    const isLoadingState = useAppSelector((state) => state.profile.isLoading);
    console.log('the state is')
    console.log(dataState)
    useEffect(() => {
        dispatch(fetchProfile())

    }, [])
    if (isLoadingState) {
        return <Loading />
    }


    return (
        <div className={ProfileStyle.main}>
            {dataState &&
                <><div className={ProfileStyle.black}></div><div className={ProfileStyle.userdetail}>
                    <img src={dataState.profile_picture} alt="" />
                    <p>{dataState.user_name}</p>
                </div><div className={ProfileStyle.followDetail}>
                        <div className={ProfileStyle.follow}>
                            <div className={ProfileStyle.count}>12000000</div>
                            <div className={ProfileStyle.text}>Follower</div>
                        </div>
                        <div className={ProfileStyle.follow}>
                            <div className={ProfileStyle.count}>1200</div>
                            <div className={ProfileStyle.text}>Follower</div>
                        </div>
                    </div><form className={ProfileStyle.thoughts}>
                        <textarea placeholder='What do you think, Username' />
                    </form></>
            }

        </div>
    )
}

export default Profile
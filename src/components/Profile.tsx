import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import ProfileStyle from './Profile.module.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { fetchProfile } from '../redux/slices/profile/ProfileData'
import Loading from './Loading'

const Profile = () => {
    const dispatch = useAppDispatch()
    const [following, setFollowing] = useState({})
    const [follower, setFollower] = useState({})
    const dataState = useAppSelector((state) => state.profile.data);
    const isLoadingState = useAppSelector((state) => state.profile.isLoading);
    console.log('the state is')
    console.log(dataState)
    async function followingUser() {
        const { data } = await axios.get('/follow/getfollowing')
        const followDetail = data.message
        setFollowing(followDetail)
    }
    async function followerUser() {
        const { data } = await axios.get('/follow/getfollower')
        const followDetail = data.message
        setFollower(followDetail)
    }
    useEffect(() => {
        dispatch(fetchProfile())
        followingUser()
        followerUser()
    }, [])
    if (isLoadingState) {
        return <Loading />
    }
    console.log('the following is', following)

    return (
        <div className={ProfileStyle.main}>
            {dataState &&
                <><div className={ProfileStyle.black}></div><div className={ProfileStyle.userdetail}>
                    <img src={dataState.profile_picture} alt="" />
                    <p>{dataState.user_name}</p>
                </div><div className={ProfileStyle.followDetail}>
                        <div className={ProfileStyle.follow}>
                            <div className={ProfileStyle.count}>{following.following}</div>
                            <div className={ProfileStyle.text}>Following</div>
                        </div>
                        <div className={ProfileStyle.follow}>
                            <div className={ProfileStyle.count}>{follower.follower}</div>
                            <div className={ProfileStyle.text}>Follower</div>
                        </div>
                    </div><form className={ProfileStyle.thoughts}>
                        <textarea placeholder={`What do you think, ${dataState.user_name}`} />
                    </form></>
            }

        </div>
    )
}

export default Profile
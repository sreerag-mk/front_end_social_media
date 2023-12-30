/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import style from './OtherUserProfileHeader.module.css';


interface setUserDataType {
    address: string
    bio: string
    dob: string
    first_name: string
    gender: string
    id: number
    last_name: string
    phone_number: string
    profile_picture: string
    user_name: string
}

interface followingType {
    following: number
    id: number
    user_name: string
}

interface followerType {
    follower: number
    id: number
    user_name: string
}

interface OtherUserProfileHeaderProps {
    userId: number;
}

function OtherUserProfileHeader({ userId }: OtherUserProfileHeaderProps) {
    const [userData, setUserData] = useState<setUserDataType>();
    const [follow, setFollow] = useState({});
    const [postCount, setPostCount] = useState(0);
    const [following, setFollowing] = useState<followingType>();
    const [follower, setFollower] = useState<followerType>();
    const sendData = {
        userId,
    };
    async function followingUser() {
        const { data } = await axios.get('/follow/getotherfollowing', {
            params: sendData,
        });
        if (data) {
            const followDetail = data.message[0];
            console.log('this is from following detail???????????????????');
            console.log(followDetail);
            console.log(userId);
            setFollowing(followDetail);
        }
    }
    async function followerUser() {
        const { data } = await axios.get('/follow/getotherfollower', {
            params: sendData,
        });
        if (data) {
            const followDetail = data.message[0];
            console.log('this is from follow detail???????????????????');
            console.log(followDetail);
            setFollower(followDetail);
        }
    }
    async function getUserdata() {
        const sendData = {
            userId,
        };
        const newUser = await axios.get('/service/profile', {
            params: sendData,
        });
        if (newUser) {
            const newData = newUser.data.message[0];
            console.log('the new data is ==============================================');
            console.log(newData);
            setUserData(newData);
        }
    }
    async function getFollow() {
        const sendData = {
            userId,
        };
        const newUser = await axios.post('/follow/checkfollow', sendData);
        if (newUser) {
            const newData = newUser.data.following;
            console.log(newData);

            setFollow(newData);
        }
    }
    async function FollowUser() {
        await axios.post('/follow/follow', sendData);
        getFollow();
    }
    async function getPostCount() {
        const { data } = await axios.get('/post/postcount', {
            params: sendData,
        });
        if (data.message[0].count) {
            const newCount = data.message[0].count;
            setPostCount(newCount);
        }
    }
    useEffect(() => {
        getUserdata();
        getPostCount();
        getFollow();
        followingUser();
        followerUser();
    }, [userId, follow]);
    console.log('getfollow', follow);
    console.log(follower);
    console.log(following);
    console.log(userId);
    return (
        <div className={style.main}>
            {userData && (
                <>
                    <div className={style.profilePicture}>
                        <img src={userData.profile_picture} alt="" />
                    </div>
                    <div className={style.profileData}>
                        <div className={style.profileData2}>
                            <div className={style.userButton}>
                                <p className={style.user_name}>{userData.user_name}</p>
                                <div
                                    className={style.followButton}
                                    onClick={FollowUser}
                                    onKeyDown={followerUser}
                                >
                                    {follow ? <p>Follow</p> : <p>Unfollow</p>}
                                </div>
                            </div>
                            <div className={style.userFollow}>
                                <p>
                                    <span>{postCount}</span>&nbsp;post
                                </p>
                                <p>
                                    <span>{follower && follower.follower}</span>&nbsp;follower
                                </p>
                                <p>
                                    <span>{following && following.following}</span>&nbsp;following
                                </p>
                            </div>
                            <p className={style.bio}>{userData.bio}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default OtherUserProfileHeader;

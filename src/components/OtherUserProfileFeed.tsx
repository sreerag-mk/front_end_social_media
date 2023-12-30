import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import PostCard from './postCard';
import style from './OtherUserProfileBody.module.css'

const OtherUserProfileFeed = ({ userId }) => {
    const [post, setPost] = useState([]);
    const [isPost, setIsPost] = useState(false);
    const sendData = {
        page: 1,
        size: 10,
        userId: userId
    }
    async function posts() {
        const { data } = await axios.get('/post/userpost', {
            params: sendData
        })
        const feedDetail = data.message
        const isFeed = data.success
        setIsPost(isFeed)
        setPost(feedDetail)
    }
    useEffect(() => {
        posts()
    }, [userId])

    return (
        <div className={style.main}>
            <div className={style.card}>


                {isPost ?
                    post.map(posts => (
                        <PostCard key={posts.id} feed={posts} />
                    ))
                    :
                    <h5>Nothing to show </h5>
                }
            </div>
        </div>
    )
}

export default OtherUserProfileFeed
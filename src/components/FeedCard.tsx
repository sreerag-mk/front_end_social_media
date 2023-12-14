import React, { useState } from 'react'
import ImageSlider from './ImageSlider'
import HomeStyle from './FeedCard.module.css'
import axios from '../api/axios'
import heart from '../icons/heart.png'
import comment from '../icons/chat.png'
import save from '../icons/save-instagram.png'

const FeedCard = (props) => {
    const [likeCount, setLikeCount] = useState()
    const url = JSON.parse(props.feed.media_url)

    const user: string | null = localStorage.getItem('userInfo');
    let userparse: string | null = null;
    userparse = JSON.parse(user);
    const headers = {
        'Authorization': `Bearer ${userparse}`
    };

    async function userName() {
        const sendType = {
            type: 'post',
            id: props.feed.id
        }
        const { data } = await axios.get('/like/likecount', {
            params: sendType,
            headers: headers
        })
        setLikeCount(data.message)
    }
    userName()


    return (
        <div className={HomeStyle.container}>
            <div className={HomeStyle.main}>
                <div className={HomeStyle.user}>
                    <div className={HomeStyle.username}>
                        <p>{props.feed.user_name}</p>

                    </div>
                    <div className={HomeStyle.dots}>
                        <p>three</p>

                    </div>
                </div>
                <div className={HomeStyle.data}>
                    <ImageSlider images={url} />
                </div>
                <div className={HomeStyle.details}>
                    <div className={HomeStyle.like}>
                        <img className={HomeStyle.icon} src={heart} alt="" />
                        <img className={HomeStyle.lcon} src={comment} alt="" />

                    </div>
                    <div className={HomeStyle.save}>
                        <img className={HomeStyle.lcon} src={save} alt="" />
                    </div>
                </div>
                <div className={HomeStyle.totalLikes}>
                    {likeCount} <p> &nbsp;Likes</p>
                </div>
                <div className={HomeStyle.content}>
                    {props.feed.caption}
                </div>
            </div>
        </div >
    )
}

export default FeedCard
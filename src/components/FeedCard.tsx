import { useEffect, useState } from 'react'
import ImageSlider from './ImageSlider'
import HomeStyle from './FeedCard.module.css'
import axios from '../api/axios'
import heart from '../icons/heart.png'
import liked from '../icons/heartfill.png'
import comment from '../icons/chat.png'
import save from '../icons/save-instagram.png'


const FeedCard = (props: { feed: { media_url: string; id: number; profile_picture: string; user_name: string; caption: string | number | boolean } }) => {
    const [likeCountState, setLikeCountState] = useState()
    const [like, setLike] = useState(false)
    const url = JSON.parse(props.feed.media_url)
    const sendType = {
        type: 'post',
        id: props.feed.id
    }
    async function handleLike() {
        console.log('clicked like')
        console.log(props.feed.id)
        const { data } = await axios.post('/like/like', sendType)
        setLike(data.liked)
        console.log(sendType)
        console.log(like)
        likeCount()
    }

    async function likeCount() {
        console.log('inside the like count')
        const { data } = await axios.get('/like/likecount', {
            params: sendType,
        })
        setLikeCountState(data.message)
        console.log('exited the like count')

    }
    async function likes() {
        console.log('the data is')
        const sendData = {
            type: 'post'
        }
        const { data } = await axios.get('/like/userLiked', {
            params: sendData,
        })
        console.log(data.message)

    }
    useEffect(() => {
        likeCount()
    }, [])



    return (
        <div className={HomeStyle.container}>
            <div className={HomeStyle.main}>
                <div className={HomeStyle.user}>
                    <div className={HomeStyle.username}>
                        <img src={props.feed.profile_picture} alt="" />
                        <p>{props.feed.user_name}</p>

                    </div>
                    <div className={HomeStyle.dots}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>

                    </div>
                </div>
                <div className={HomeStyle.data}>
                    <ImageSlider images={url} />
                </div>
                <div className={HomeStyle.details}>
                    <div className={HomeStyle.like}>
                        {like ? <img onClick={handleLike} className={HomeStyle.icon} onKeyUp={() => console.log('key is up')} src={liked} alt="" /> : <img onClick={handleLike} className={HomeStyle.icon} onKeyUp={() => console.log('key is up')} src={heart} alt="" />}
                        <img className={HomeStyle.lcon} src={comment} alt="" />

                    </div>
                    <div className={HomeStyle.save}>
                        <img className={HomeStyle.lcon} src={save} alt="" />
                    </div>
                </div>
                <div className={HomeStyle.totalLikes}>
                    {likeCountState} <p> &nbsp;&nbsp;Likes</p>
                </div>
                <div className={HomeStyle.content}>
                    {props.feed.caption}
                </div>
            </div>
        </div >
    )
}

export default FeedCard
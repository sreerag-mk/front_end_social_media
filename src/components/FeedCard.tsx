/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import HomeStyle from './FeedCard.module.css';
import axios from '../api/axios';
import heart from '../icons/heart.png';
import liked from '../icons/heartfill.png';
import comments from '../icons/chat.png';
import save from '../icons/save-instagram.png';
import ShortComment from './ShortComment';

const likeURL: string = process.env.REACT_APP_LIKE ?? '';
const likeCountURL: string = process.env.REACT_APP_LIKECOUNT ?? '';
const userLikeURL: string = process.env.REACT_APP_USERLIKED ?? '';

interface FeedCardProps {
    readonly feed: Readonly<{
        media_url: string;
        userId: number;
        id: number;
        profile_picture: string;
        user_name: string;
        caption: string | number;
    }>;
}

interface Comment {
    id: number;
    userId: number
    userName: string;
    profilePicture: string;
    postId: number;
    content: string;
}

function FeedCard({ feed }: FeedCardProps) {
    const navigate = useNavigate();
    const [likeCountState, setLikeCountState] = useState();
    const [commentCountState, setCommentCountState] = useState();
    const [shortComment, setShortComment] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [like, setLike] = useState(false);
    const url = JSON.parse(feed.media_url);
    const sendType = {
        type: 'post',
        id: feed.id,
    };
    const sendCommentCount = {
        id: feed.id,
    };

    async function handleAllComment() {
        console.log('handle all comment is clicked')
    }

    async function commentCount() {
        const { data } = await axios.get('/comment/commentcount', {
            params: sendCommentCount,
        });
        setCommentCountState(data.message[0].comments);
    }
    async function likeCount() {
        const { data } = await axios.get(likeCountURL, {
            params: sendType,
        });
        setLikeCountState(data.message);
    }
    async function handleLike() {
        const { data } = await axios.post(likeURL, sendType);
        setLike(data.liked);
        likeCount();
    }

    async function handleClick() {
        navigate('/profile', { state: feed.userId });
    }
    async function likes() {
        const sendData = {
            type: 'post',
        };
        const { data } = await axios.get(userLikeURL, {
            params: sendData,
        });
        const dataArray = data.message;
        if (dataArray) {
            const found = dataArray.some(
                (e: { post_id: number }) => e.post_id === feed.id
            );
            if (found) {
                setLike(true);
            }
        }
    }
    async function getShortComments() {
        const sendForComment = {
            postId: feed.id,
        };
        const { data } = await axios.get('/comment/commentshortview', {
            params: sendForComment,
        });
        setShortComment(data.message);
    }
    const handlecomment: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        axios.post('/comment/comment', { id: feed.id, content: newComment });
        commentCount();
        setNewComment('');
        getShortComments();
    };
    useEffect(() => {
        const fetchData = async () => {
            await likeCount();
            await likes();
            await commentCount();
            await getShortComments();
        };

        fetchData();
    }, []);

    return (
        <div className={HomeStyle.container}>
            <div className={HomeStyle.main}>
                <div className={HomeStyle.user}>
                    <button
                        type='button'
                        className={HomeStyle.username}
                        onClick={handleClick}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleClick();
                            }
                        }}
                        tabIndex={0}
                    >
                        <img src={feed.profile_picture} alt={`${feed.user_name}`} />
                        <p>{feed.user_name}</p>
                    </button>
                    <div className={HomeStyle.dots}>
                        <i className="fa-solid fa-ellipsis-vertical" />
                    </div>
                </div>
                <div className={HomeStyle.data}>
                    <ImageSlider images={url} />
                </div>
                <div className={HomeStyle.details}>
                    <button type='button' className={HomeStyle.like}
                        onClick={handleLike}
                        onKeyUp={() => console.log('key is up')}>
                        {like ? (
                            <img
                                className={HomeStyle.icon}
                                src={liked}
                                alt=""
                            />
                        ) : (
                            <img
                                className={HomeStyle.icon}
                                src={heart}
                                alt=""
                            />
                        )}
                        <img className={HomeStyle.lcon} src={comments} alt="" />
                    </button>
                    <div className={HomeStyle.save}>
                        <img className={HomeStyle.lcon} src={save} alt="" />
                    </div>
                </div>
                <div className={HomeStyle.totalLikes}>
                    {likeCountState} <p> &nbsp;&nbsp;Likes</p>
                </div>
                <div className={HomeStyle.content}>
                    <span>{feed.user_name}</span> &nbsp;{feed.caption}
                </div>
                <div className={HomeStyle.shortComment}>
                    {shortComment && shortComment.length > 0 ? (
                        shortComment.map((comment: { id: number; userName: string; profilePicture: string; postId: number; content: string; }) => (
                            <ShortComment key={comment.id} datas={comment} />
                        ))
                    ) : (
                        <p>No comments yet</p>
                    )}
                </div>
                <button type='button' className={HomeStyle.commentView}
                    onClick={handleAllComment}
                    onKeyDown={handleAllComment}>
                    <p className={HomeStyle.p}>
                        View all {commentCountState} comments
                    </p>
                </button>
                <form className={HomeStyle.form} onSubmit={handlecomment}>
                    <input
                        type="text"
                        placeholder="Comment something..."
                        onChange={(e) => setNewComment(e.target.value)}
                        required={true}
                    />
                    <button type="submit" className={HomeStyle.forminside}>
                        POST
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FeedCard;

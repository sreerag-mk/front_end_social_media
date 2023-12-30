/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import PostCard from './postCard';
import style from './OtherUserProfileBody.module.css';

interface PostType {
    id: number;
    caption: string;
    media_url: string;
    profile_picture: string;
    userId: number;
    user_name: string;
}

interface OtherUserProfileHeaderProps {
    userId: number;
}

function OtherUserProfileFeed({ userId }: OtherUserProfileHeaderProps) {
    const [post, setPost] = useState<PostType[]>([]);
    const [isPost, setIsPost] = useState(false);
    const sendData = {
        page: 1,
        size: 10,
        userId,
    };
    async function newPosts() {
        const { data } = await axios.get('/post/userpost', {
            params: sendData,
        });
        const feedDetail = data.message;
        const isFeed = data.success;
        setIsPost(isFeed);
        console.log('=================================================================', feedDetail)
        setPost(feedDetail);
    }
    useEffect(() => {
        newPosts();
    }, [userId]);

    return (
        <div className={style.main}>
            <div className={style.card}>
                {isPost ? (
                    post.map((posts) => <PostCard key={posts.id} feed={posts} />)
                ) : (
                    <h5>Nothing to show </h5>
                )}
            </div>
        </div>
    );
}

export default OtherUserProfileFeed;

/* eslint-disable prettier/prettier */
import React from 'react';
import style from './PostCard.module.css';

interface PostCardType {
    feed: {
        media_url: string;
        userId: number;
        id: number;
        profile_picture: string;
        user_name: string;
        caption: string | number;
    };
}

function PostCard({ feed }: PostCardType) {
    const url = JSON.parse(feed.media_url);

    return (
        <div className={style.main}>
            <div className={style.card}>
                <img src={url[0]} alt="" />
            </div>
        </div>
    );
}

export default PostCard;

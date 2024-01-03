/* eslint-disable prettier/prettier */
import React from 'react'
import style from './ShortComment.module.css'

interface TypeShortComment {
    datas: { id: number; userName: string; profilePicture: string; postId: number; content: string }
}

function ShortComment({ datas }: TypeShortComment) {

    return (
        <div className={style.main}>
            <img className={style.img} src={datas.profilePicture} alt="" />
            <p className={style.p}><span className={style.span}>{datas.userName}</span> {datas.content}</p>
        </div>
    )
}

export default ShortComment
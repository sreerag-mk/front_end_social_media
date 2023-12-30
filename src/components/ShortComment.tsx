import React from 'react'
import style from './ShortComment.module.css'

const ShortComment = (props: { datas: { id: number; userName: string; profilePicture: string; postId: number; content: string } }) => {

    return (
        <div className={style.main}>
            <img className={style.img} src={props.datas.profilePicture} alt="" />
            <p className={style.p}><span className={style.span}>{props.datas.userName}</span> {props.datas.content}</p>
        </div>
    )
}

export default ShortComment
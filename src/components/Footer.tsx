import React from 'react'
import footer from './Footer.module.css'

const Footer = () => {
    return (
        <div className={footer.footerMain}>
            <div className={footer.name}>RAG media</div>
            <div className={footer.detail}>this is a chat app like instagram</div>
            <div className={footer.copyright}> copy right is reserved by rag</div>
        </div>
    )
}

export default Footer
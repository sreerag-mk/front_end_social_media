import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../components/AddPostStyle.module.css'
import axios from '../api/axios'


const Addpost = () => {
    const navigate = useNavigate()
    const [content, setContent] = useState('')
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState<string | Blob>('');
    const [error, setError] = useState(false)

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            setImage(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitted')
        try {
            let formData = new FormData();
            formData.append('image', image)
            formData.append('content_type', 'photo')
            formData.append('caption', caption)
            formData.append('content', content)
            const { data } = await axios.post('/post/upload', formData)
            console.log(data)
            console.log(caption)
            console.log(content)
            console.log(image)
            setCaption('')
            setContent('')
            setImage('')
            navigate('/')
        } catch (error) {

        }

    }
    return (
        <div>
            <form className={style.main} onSubmit={handleSubmit}>
                {error && <p className={style.errorMessage}>{error}</p>}
                <h2>Add Post</h2>
                {image && <img className={style.img} src={URL.createObjectURL(image)} />}
                <div className={style.input}>
                    <textarea className={style.textarea}
                        value={content}
                        placeholder='Enter the content'
                        onChange={(e) => setContent(e.target.value)}
                        required={true}
                    />
                    <i></i>

                </div>
                <div className={style.input}>
                    <input className={style.text}
                        type='text'
                        placeholder='enter thw caption'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required={true}
                    ></input>
                    <i></i>

                </div>

                <input type="file" onChange={handleChange} id='file' />
                <label htmlFor="file" className={style.label}>
                    choose a photo
                </label>
                <input className={style.submit} type="submit" value='post'></input>

            </form>
        </div>
    )
}

export default Addpost
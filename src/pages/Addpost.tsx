/* eslint-disable prettier/prettier */
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../components/AddPostStyle.module.css';
import axios from '../api/axios';

function Addpost() {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState<Blob | null>(null);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                formData.append('content_type', 'photo');
                formData.append('caption', caption);
                formData.append('content', content);
                await axios.post('/post/upload', formData);
                navigate('/');
            } else {
                // eslint-disable-next-line no-console
                console.error('Please select an image.');
            }
        } catch (error) { }
    };
    return (
        <div>
            <form className={style.main} onSubmit={handleSubmit}>
                <h2>Add Post</h2>
                {image && (
                    <img
                        className={style.img}
                        src={URL.createObjectURL(image)}
                        alt="uploaded"
                    />
                )}
                <div className={style.input}>
                    <textarea
                        className={style.textarea}
                        value={content}
                        placeholder="Enter the content"
                        onChange={(e) => setContent(e.target.value)}
                        required={true}
                    />
                    <i />
                </div>
                <div className={style.input}>
                    <input
                        className={style.text}
                        type="text"
                        placeholder="enter thw caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required={true}
                    />
                    <i />
                </div>

                <label htmlFor="file" className={style.label}>
                    <input type="file" onChange={handleChange} id="file" />
                    <p>choose a photo</p>
                </label>
                <input className={style.submit} type="submit" value="post" />
            </form>
        </div>
    );
}

export default Addpost;

import React, { useState } from 'react';
import imageStyle from './ImageSlider.module.css'

const ImageSlider = ({ images }) => {
    const [image, setImage] = useState(0);
    const nextSlide = () => {
        const newIndex = (image + 1) % images.length;
        setImage(newIndex);
    };

    const prevSlide = () => {

        const newIndex = (image - 1 + images.length) % images.length;
        setImage(newIndex);
    };

    return (
        <div className={imageStyle.slider}>
            {(image) !== 0 && (
                <button className={imageStyle.previous} onClick={prevSlide}>previous</button>
            )}
            <img src={images[image]} alt={``} />
            {(image + 1) !== images.length && (
                <button className={imageStyle.next} onClick={nextSlide}>Next</button>
            )}
        </div>
    );
};

export default ImageSlider;

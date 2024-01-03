/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import imageStyle from './ImageSlider.module.css';

interface ImageSliderProps {
    readonly images: readonly string[];
}

function ImageSlider({ images }: ImageSliderProps) {
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
            <button type='button' className={imageStyle.previous}
                onClick={prevSlide}
                onKeyUp={() => console.log('key is up')}>
                {image !== 0 && (
                    <i
                        className="fa-solid fa-chevron-left fa-fade fa-2xl"
                    />
                )}
            </button>
            <img src={images[image]} alt="" />
            <button type='button' className={imageStyle.next}
                onClick={nextSlide}
                onKeyUp={() => console.log('key is up')}>
                {image + 1 !== images.length && (
                    <i
                        className="fa-solid fa-chevron-right fa-fade fa-2xl"
                    />
                )}
            </button>
        </div>
    );
}

export default ImageSlider;

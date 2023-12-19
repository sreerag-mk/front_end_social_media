import { useState } from 'react';
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
            <div className={imageStyle.previous}>
                {(image) !== 0 && (
                    <i className="fa-solid fa-chevron-left fa-fade fa-2xl" onClick={prevSlide} onKeyUp={() => console.log('key is up')}></i>
                )}
            </div>
            <img src={images[image]} alt={``} />
            <div className={imageStyle.next}>
                {(image + 1) !== images.length && (
                    <i className="fa-solid fa-chevron-right fa-fade fa-2xl" onClick={nextSlide} onKeyUp={() => console.log('key is up')}></i>
                )}
            </div>
        </div>
    );
};

export default ImageSlider;

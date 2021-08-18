import React, { useRef, useEffect, useState } from 'react';
import styles from '../pages/styles/Slideshow.module.css'

const images = ['/art/met2.jpeg','/art/bigbird.jpeg','/art/david.jpeg','/art/gogh.jpeg','art/gong.jpeg','art/statue.jpg','art/washington.jpeg'];
const delay = 2500;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={styles.slideshow}>
      <div
        className={styles.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((srcImg, index) => (
          <img
            className={styles.slide}
            key={index}
            src={srcImg}
            // style={{ backgroundColor }}
          ></img>
        ))}
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
      .slideshowDots {
        text-align: center;
      }

      .slideshowDot {
        display: inline-block;
        height: 20px;
        width: 20px;
        border-radius: 50%;

        cursor: pointer;
        margin: 15px 7px 0px;

        background-color: #c4c4c4;
      }

      .slideshowDot.active {
        background-color: #E4022B;
      }

      `}
      </style>
    </div>
  );
}
export default Slideshow;

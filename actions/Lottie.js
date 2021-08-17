import React from "react";
import Lottie from "react-lottie";
import styles from '../pages/styles/Home.module.css';

export default function LottieAnimation({ lotti, width, height }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.lottie} >
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};
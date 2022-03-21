import React from "react";
import styles from "./Slider.module.css";

function SlideImage({ image, content, url }) {
  return (
    <div className={styles.imgcontainer}>
      <a href={url} target="_blank">
        <div className={styles.positioning}>{content}</div>
      </a>
      <img src={image} className={styles.image} alt="mental health"></img>
    </div>
  );
}

export default SlideImage;

import React from "react";
import styles from "./Slider.module.css";
import {
  Button,
  Container,
  Image,
  Divider,
  Form,
  Header,
} from "semantic-ui-react";

function SlideImage({ image, content, url, info }) {
  return (
    <div>
      <div className={styles.wordPositioning}>{info}</div>
      <a href={url} target="_blank">
        <div className={styles.positioning}>{content}</div>
      </a>
      <img src={image} className={styles.image} alt="mental health" />
    </div>
  );
}

export default SlideImage;

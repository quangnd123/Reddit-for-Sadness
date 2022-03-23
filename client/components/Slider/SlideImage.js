import React, { useState } from "react";
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
  function MouseOver(event) {
    event.target.style.background = "grey";
  }
  function MouseOut(event) {
    event.target.style.background = "";
  }
  return (
    <div>
      <div className={styles.wordPositioning}>{info}</div>
      <a href={url} target="_blank">
        <button
          className={styles.positioning}
          onMouseEnter={MouseOver}
          onMouseLeave={MouseOut}
        >
          {content}
        </button>
      </a>
      <img src={image} className={styles.image} alt="mental health" />
    </div>
  );
}

export default SlideImage;

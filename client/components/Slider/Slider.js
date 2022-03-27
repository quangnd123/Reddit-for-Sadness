import React, { useState } from "react";
import dataSlider from "./dataSlider";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import styles from "./Slider.module.css";
// import { CSSTransition } from "react-transition-group";
import { Button, Container, Image, Divider } from "semantic-ui-react";
import SlideImage from "./SlideImage";

function Slider({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <div className={styles.slideshow}>
      {/* <section className={styles.slider}> */}
      <FaArrowAltCircleLeft className={styles.leftArrow} onClick={prevSlide} />
      <FaArrowAltCircleRight
        className={styles.rightArrow}
        onClick={nextSlide}
      />
      {dataSlider.map((slide, index) => {
        return (
          <div
            //className={index === current ? styles.slideactive : styles.slide}
            className={`${styles.slide} ${index === current && styles.active}`}
            key={index}
          >
            {/* <div className={styles.link}>{slide.content}</div> */}
            {index === current && (
              <SlideImage
                image={slide.image}
                url={slide.url}
                content={slide.content}
                info={slide.info}
              />
            )}
          </div>
        );
      })}
      {/* </section> */}
    </div>
  );
}

export default Slider;

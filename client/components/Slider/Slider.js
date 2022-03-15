import React, { useState } from "react";
import dataSlider from "./dataSlider";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import styles from "./Slider.module.css";

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
    <section className={styles.slider}>
      <FaArrowAltCircleLeft className={styles.leftArrow} onClick={prevSlide} />
      <FaArrowAltCircleRight
        className={styles.rightArrow}
        onClick={nextSlide}
      />
      {dataSlider.map((slide, index) => {
        return (
          <div
            className={index === current ? styles.slideactive : styles.slide}
            key={index}
          >
            {index === current && (
              <img
                src={slide.image}
                alt="mental"
                className={styles.image}
              ></img>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default Slider;

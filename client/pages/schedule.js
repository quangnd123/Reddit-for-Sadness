import React from "react";
import { Button, Container, Image, Divider } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";
import Slider from "../components/Slider/Slider";
import dataSlider from "../components/Slider/dataSlider";
import styles from "../components/Slider/Slider.module.css";
import InputLocation from "../components/Location/InputLocation";

const schedule = () => {
  return (
    <div>
      <Slider slides={dataSlider} />
      <InputLocation />
    </div>
  );
};

export default schedule;

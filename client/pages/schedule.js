import React, { useState } from "react";
import GoogleMapAPI from "../components/GoogleMapAPI.js";
import Slider from "../components/Slider/Slider";
import dataSlider from "../components/Slider/dataSlider";
import styles from "../components/Slider/Slider.module.css";
import InputLocation from "../components/Location/InputLocation";
const schedule = () => {
  return (
    <div>
      <Slider slides={dataSlider} />
      <InputLocation />
      <GoogleMapAPI />
    </div>
  );
};

export default schedule;

import React from "react";
import { Button, Container, Image, Divider } from "semantic-ui-react";
import { Segment } from "semantic-ui-react";
import Slider from "../components/Slider/Slider";
import dataSlider from "../components/Slider/dataSlider";

const schedule = () => {
  return (
    <div>
      <Slider slides={dataSlider} />
    </div>
  );
};

export default schedule;

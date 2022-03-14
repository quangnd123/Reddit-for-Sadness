import React, { useState } from "react";
import btnSlider from "./btnSlider";
import dataSlider from "./dataSlider";

function Slider() {
  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div className="slide">
            <img
              src={
                process.env.PUBLIC_URL + `/public/mentalHealth${index + 1}.png`
              }
            />
          </div>
        );
      })}
      <btnSlider />
      <btnSlider />
    </div>
  );
}

export default Slider;

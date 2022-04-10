import React, { useState } from "react";
import GoogleMapAPI from "../components/GoogleMapAPI.js";
import Slider from "../components/Slider/Slider";
import dataSlider from "../components/Slider/dataSlider";
import styles from "../components/Slider/Slider.module.css";
import InputLocation from "../components/Location/InputLocation";
import { useQuery } from "@apollo/react-hooks";
import { getCounsellors } from "../graphql/query.js";
import { GridColumn } from "semantic-ui-react";
import SideBar from "../components/SideBar.js";
import { Grid, Input, Sticky } from "semantic-ui-react";
import cssstyle from "../components/appointment.module.css";
import Calendar from "react-calendar";

const schedule = () => {
  const [placeInput, setPlaceInput] = useState({});
  const { loading, data, error } = useQuery(getCounsellors);
  if (loading) {
    return <h1>Query Loading ...</h1>;
  }
  if (error) {
    return <h1>Query Error ...</h1>;
  }
  const counsellors = data.getCounsellors;
  counsellors.forEach((counsellor) => {
    counsellor.address.lat = parseFloat(counsellor.address.lat);
    counsellor.address.lng = parseFloat(counsellor.address.lng);
  });
  console.log(data.getCounsellors);
  return (
    <div>
      <Slider slides={dataSlider} />
      <InputLocation />
      {/* <Grid>
        <GridColumn width={12} id={"abc"}>
          <GoogleMapAPI
            placeInput={placeInput}
            setPlaceInput={setPlaceInput}
            counsellors={counsellors}
          />
        </GridColumn>
        <GridColumn width={4} color={"teal"} id={"abc"}>
          <SideBar placeInput={placeInput} counsellors={counsellors} />
        </GridColumn>
      </Grid> */}
      <div className={cssstyle.container}>
        <div className={cssstyle.inputlocation}>
          <GoogleMapAPI
            placeInput={placeInput}
            setPlaceInput={setPlaceInput}
            counsellors={counsellors}
            sticky
          />
        </div>
        <div className={cssstyle.side}>
            <SideBar placeInput={placeInput} counsellors={counsellors} />
        </div>
      </div>
    </div>
  );
};

export default schedule;

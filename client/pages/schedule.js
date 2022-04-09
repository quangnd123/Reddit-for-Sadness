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
import { Grid } from "semantic-ui-react";
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
      <Grid>
        <GridColumn width={13}>
          <GoogleMapAPI
            placeInput={placeInput}
            setPlaceInput={setPlaceInput}
            counsellors={counsellors}
          />
        </GridColumn>
        <GridColumn width={3}>
          <SideBar placeInput={placeInput} counsellors={counsellors} />
        </GridColumn>
      </Grid>
    </div>
  );
};

export default schedule;

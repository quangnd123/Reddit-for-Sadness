import React from "react";
import { Button, Image } from "semantic-ui-react";
import MissionStatement from "../components/About/MissionStatement";
import Stats from "../components/About/Stats";
import WhoAreWe from "../components/About/WhoAreWe";
import Footer from "../components/About/Footer";

const about = () => {
  return (
    <>
      <MissionStatement />
      <Stats />
      <WhoAreWe />
      <Footer />
    </>
  );
};

export default about;

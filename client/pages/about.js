import React from "react";
import { Button, Image } from "semantic-ui-react";
import MissionStatement from "../components/About/MissionStatement";
import Stats from "../components/About/Stats";
import WhoAreWe from "../components/About/WhoAreWe";
import Footer from "../components/About/Footer";

const about = () => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" +
            "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v546batch3-mynt-34-badgewatercolor_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=89288ef4b47127f7f34a5998b50e4470" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <MissionStatement />
        <Stats />
      </div>
      <WhoAreWe />
      <div style={{ backgroundColor: "white" }}>
        <Footer />
      </div>
    </>
  );
};

export default about;

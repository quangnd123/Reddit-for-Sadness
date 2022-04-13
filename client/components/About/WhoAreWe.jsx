import React from "react";
import { Divider } from "semantic-ui-react";
import styles from "./about.module.css";

function WhoAreWe() {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          "https://c4.wallpaperflare.com/wallpaper/770/229/111/trees-singapore-architecture-nature-wallpaper-preview.jpg" +
          ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div className={styles.whoStatement}>Who We Are</div>
      <div className={styles.aboutStatement}>
        Reddit for sadness was founded by a group of NTU students
      </div>
      <Divider />
    </div>
  );
}

export default WhoAreWe;

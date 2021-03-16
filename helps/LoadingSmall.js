import React from "react";

import MyCss from "./Loading.module.scss";
import Cow from "../images/loading/cow.png"

const Loading = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "block",
          // backgroundColor: "rgba(0,0,0,0.3)",
          width: "100%",
          height: "100%",
          // top: "0",
          zIndex: "30",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            PointerEvent: "auto",
            // backgroundColor: "#fff",
            // border: "1px solid rgba(0,0,0,.2)",
            // borderRadius: "20%",
            outline: "0",
            width: "250px",
            height: "250px",
            top: "60px",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className={MyCss.loader} style={{margin:"25% auto 10px",textAlign:"center"}}>
            <span className={MyCss.box}></span>
            <span className={MyCss.box}></span>
            <div className={MyCss.code}>
              <img
                src={Cow}
                width="90px"
              />

              <span style={{color:"#3BAFDA"}}>LOADING CODE...</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

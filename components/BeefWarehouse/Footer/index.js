import React from "react";

const index = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        backgroundColor: "#003171",
        color: "white",
        height: "100px",
      }}
    >
      <div style={{ display: "flex", marginLeft: "20px", marginTop: "25px" }}>
        <h1 style={{ fontSize: "20px", margin: "0" }}>
          Copyright 2022 |Dev Team| Contact
        </h1>
        <h1
          style={{
            fontSize: "20px",
            position: "absolute",
            right: "10px",
            marginTop: "15px",
            marginRight: "15px",
          }}
        >
          Meat & Beef Product Warehouse System
        </h1>
      </div>
      <div style={{ display: "flex", marginLeft: "20px", marginTop: "5px" }}>
        <p style={{ fontSize: "16px", margin: "0" }}>
          By computer engineering University Of Phayao
        </p>
      </div>
    </div>
  );
};

export default index;

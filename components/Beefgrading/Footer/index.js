import React from "react";
import Link from "next/link";

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
        <h1 style={{ fontSize: "20px", margin: "0", fontWeight: 600, letterSpacing: "1px" }}>
          Copyright 2022 |Dev Team| Contact
        </h1>
        <Link href="./">
        <h1
          style={{
            fontSize: "20px",
            position: "absolute",
            right: "10px",
            marginTop: "15px",
            marginRight: "15px",
            fontWeight: 600, letterSpacing: "1px"
          }}
        >
          Beef Quality Grading System
        </h1>
        </Link>
      </div>
      <Link href="https://reg.up.ac.th/">
      <div style={{ display: "flex", marginLeft: "20px", marginTop: "5px" }}>
        <p style={{ fontSize: "16px", margin: "0", fontWeight: 600, letterSpacing: "1px" }}>
          By computer engineering University Of Phayao
        </p>
      </div>
      </Link>
    </div>
  );
};

export default index;

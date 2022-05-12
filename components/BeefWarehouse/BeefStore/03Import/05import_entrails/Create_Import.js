import React from "react";

import { Savebutton } from "../../../../../utils/button";
import { Savebuttoncolor } from "../../../../../utils/buttonColor";

const Create_Import = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center",marginBottom:"7px" }}>
      <form>
        <label
          for="beef"
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginRight: "10px",
          }}
        >
          รหัสบาร์โค้ด
        </label>
        <input
          type="text"
          id="barcode"
          name="barcode"
          style={{
            height: "35px",
            width: "200px",
            borderRadius: "4px 0px 0px 4px",
            borderRight: "none",
            border: "1px solid #AFAFAF",
            textAlign: "center",
            fontSize: "14px",
          }}
        />
      </form>
      <Savebuttoncolor
        style={{ height: "35px", borderRadius: "0px 3px 3px 0px" }}
      >
        <Savebutton />
      </Savebuttoncolor>
    </div>
  );
};

export default Create_Import;

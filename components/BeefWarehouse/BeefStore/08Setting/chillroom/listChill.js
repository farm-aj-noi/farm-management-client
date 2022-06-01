import React, { useState } from "react";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";
const listChill = ({ listchill }) => {
  const [chilldayInfo, setChilldayInfo] = useState(listchill);
  return (
    <>
      {chilldayInfo.day} วัน
      <Removebuttoncolor
        style={{
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        ลบ
      </Removebuttoncolor>
    </>
  );
};

export default listChill;

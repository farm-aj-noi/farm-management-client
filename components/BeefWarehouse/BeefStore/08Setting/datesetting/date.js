import React, { useState } from "react";

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
  InputPrice,
} from "../SettingFrom";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import {
  Savebutton,
  Editbutton,
  Removebutton,
} from "../../../../../utils/button";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const UPDATETOTAL = gql`
  mutation UPDATETOTAL(
    $id: ID
    $dayH: Int
    $dayQ: Int
    $dayL: Int
    $dayC: Int
    $dayE: Int
  ) {
    updateTotalExp(
      id: $id
      dayH: $dayH
      dayQ: $dayQ
      dayL: $dayL
      dayC: $dayC
      dayE: $dayE
    ) {
      id
      dayH
      dayQ
      dayL
      dayC
      dayE
    }
  }
`;

const date = ({ listdate }) => {
  const [infodate, setinfodate] = useState(listdate);
  //console.log(infodate);
  const [Editdate, setEditdate] = useState(false);
  const [updateTotalExp, { loading, error }] = useMutation(UPDATETOTAL, {
    onCompleted: (data) => {
      // console.log(data)
      setinfodate(data.updateTotalExp);
      setEdit(false);
    },
  });
  const handleChange = (e) =>
    setinfodate({ ...infodate, [e.target.name]: e.target.value });

  const handleSubmitTotal = async () => {
    if (infodate === listdate) {
      setinfodate(listdate);
      setEditdate(false);
      return;
    }
    try {
      await updateTotalExp({
        variables: {
          ...infodate,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      ตั้งค่ารายการวันหมดอายุ :
      {Editdate ? (
        <Savebuttoncolor
          style={{ marginLeft: "5px", marginBottom: "10px" }}
          onClick={handleSubmitTotal}
        >
          <Savebutton />
        </Savebuttoncolor>
      ) : (
        <Editbuttoncolor
          style={{ marginLeft: "5px", marginBottom: "10px" }}
          onClick={() => setEditdate(true)}
        >
          <Editbutton />
        </Editbuttoncolor>
      )}
      <div>
        ซากเนื้อโคผ่าซีก : {}
        {Editdate ? (
          <Searchinput
            name="dayH"
            value={infodate.dayH}
            onChange={handleChange}
            style={{ width: "150px", textAlign: "center" }}
          />
        ) : (
          <Searchinput
            name="dayH"
            style={{ width: "150px", textAlign: "center" }}
            disabled
            value={infodate.dayH}
          />
        )}
        วัน
      </div>
      <div style={{ marginTop: "10px" }}>
        ซากเนื้อโคสี่เสี้ยว : {}
        {Editdate ? (
          <Searchinput
            name="dayQ"
            value={infodate.dayQ}
            onChange={handleChange}
            style={{ width: "150px", textAlign: "center" }}
          />
        ) : (
          <Searchinput
            name="dayQ"
            style={{ width: "150px", textAlign: "center" }}
            disabled
            value={infodate.dayQ}
          />
        )}
        วัน
      </div>
      <div style={{ marginTop: "10px" }}>
        ซากเนื้อโคก้อนเนื้อ : {}
        {Editdate ? (
          <Searchinput
            name="dayL"
            value={infodate.dayL}
            onChange={handleChange}
            style={{ width: "150px", textAlign: "center" }}
          />
        ) : (
          <Searchinput
            name="dayL"
            style={{ width: "150px", textAlign: "center" }}
            disabled
            value={infodate.dayL}
          />
        )}
        วัน
      </div>
      <div style={{ marginTop: "10px" }}>
        ซากเนื้อโคชิ้นเนื้อ : {}
        {Editdate ? (
          <Searchinput
            name="dayC"
            value={infodate.dayC}
            onChange={handleChange}
            style={{ width: "150px", textAlign: "center" }}
          />
        ) : (
          <Searchinput
            name="dayC"
            style={{ width: "150px", textAlign: "center" }}
            disabled
            value={infodate.dayC}
          />
        )}
        วัน
      </div>
      <div style={{ marginTop: "10px" }}>
        ซากเนื้อโคส่วนอื่น ๆ : {}
        {Editdate ? (
          <Searchinput
            name="dayE"
            value={infodate.dayE}
            onChange={handleChange}
            style={{ width: "150px", textAlign: "center" }}
          />
        ) : (
          <Searchinput
            name="dayE"
            style={{ width: "150px", textAlign: "center" }}
            disabled
            value={infodate.dayE}
          />
        )}
        วัน
      </div>
    </div>
  );
};

export default date;

import React, { useState } from "react";

import { Table } from "react-bootstrap";

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
  DivFromInsideLeft,
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";
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

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Nav_setting from "../Nav_setting";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Router from "next/router";

const UPDATEEXPSETING = gql`
  mutation UPDATEEXPSETING(
    $id: ID
    $dayH: Int
    $dayQ: Int
    $dayL: Int
    $dayC: Int
    $dayE: Int
  ) {
    updateExpdatesetting(
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

const expseting = ({ listexpseting }) => {
  const [infoexpseting, setinfoexpseting] = useState(listexpseting);
  //console.log(infoexpseting);
  const [Editexp, setEditexp] = useState(false);
  const [updateExpdatesetting] = useMutation(UPDATEEXPSETING, {
    onCompleted: (data) => {
      setinfoexpseting(data.updateExpdatesetting);
      setEditexp(false);
    },
  });

  const handleChange = (e) => {
    setinfoexpseting({
      ...infoexpseting,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    if (infoexpseting === listexpseting) {
      setinfoexpseting(listexpseting);
      setEditexp(false);
      return;
    }
    try {
      infoexpseting.dayH = parseInt(infoexpseting.dayH);
      infoexpseting.dayQ = parseInt(infoexpseting.dayQ);
      infoexpseting.dayL = parseInt(infoexpseting.dayL);
      infoexpseting.dayC = parseInt(infoexpseting.dayC);
      infoexpseting.dayE = parseInt(infoexpseting.dayE);
      await updateExpdatesetting({
        variables: {
          ...infoexpseting,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      ตั้งค่ารายการแจ้งเตือน :
      {Editexp ? (
        <Savebuttoncolor
          style={{ marginLeft: "5px", marginBottom: "10px" }}
          onClick={handleSubmit}
        >
          <Savebutton />
        </Savebuttoncolor>
      ) : (
        <Editbuttoncolor
          style={{ marginLeft: "5px", marginBottom: "10px" }}
          onClick={() => setEditexp(true)}
        >
          <Editbutton />
        </Editbuttoncolor>
      )}
      <>
        <div style={{ marginLeft: "38px", marginTop: "10px" }}>
          <DivFromInsideLeft>
            ซากเนื้อโคผ่าซีก : {}
            {Editexp ? (
              <Searchinput
                name="dayH"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayH}
                onChange={handleChange}
              />
            ) : (
              <Searchinput
                name="dayH"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayH}
                disabled
              />
            )}
            วัน
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "10px" }}>
            ซากเนื้อโคสี่เสี้ยว : {}
            {Editexp ? (
              <Searchinput
                name="dayQ"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayQ}
                onChange={handleChange}
              />
            ) : (
              <Searchinput
                name="dayH"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayQ}
                disabled
              />
            )}
            วัน
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "10px" }}>
            ซากเนื้อโคก้อนเนื้อ : {}
            {Editexp ? (
              <Searchinput
                name="dayL"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayL}
                onChange={handleChange}
              />
            ) : (
              <Searchinput
                name="dayL"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayL}
                disabled
              />
            )}
            วัน
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "10px" }}>
            ซากเนื้อโคชิ้นเนื้อ : {}
            {Editexp ? (
              <Searchinput
                name="dayC"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayC}
                onChange={handleChange}
              />
            ) : (
              <Searchinput
                name="dayC"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayC}
                disabled
              />
            )}
            วัน
          </DivFromInsideLeft>
          <DivFromInsideLeft style={{ marginTop: "10px" }}>
            ซากเนื้อโคส่วนอื่น ๆ : {}
            {Editexp ? (
              <Searchinput
                name="dayE"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayE}
                onChange={handleChange}
              />
            ) : (
              <Searchinput
                name="dayE"
                style={{ width: "150px", textAlign: "center" }}
                value={infoexpseting.dayE}
                disabled
              />
            )}
            วัน
          </DivFromInsideLeft>
        </div>
      </>
    </div>
  );
};

export default expseting;

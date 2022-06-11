import React, { useState } from "react";

import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Nav_setting from "../Nav_setting";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Expseting from "./expseting";
import Date1 from "./date";

export const QUERYEXPSETING = gql`
  query QUERYEXPSETING {
    listExpSetting {
      id
      dayH
      dayQ
      dayL
      dayC
      dayE
    }
  }
`;

export const QUERYDATE = gql`
  query QUERYDATE {
    Totalexpdate {
      id
      dayH
      dayQ
      dayL
      dayC
      dayE
    }
  }
`;

const index = () => {
  const MySwal = withReactContent(Swal);
  const { data: expseting } = useQuery(QUERYEXPSETING);
  const { data: date } = useQuery(QUERYDATE);
  return (
    <DivBase>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          การตั้งค่า
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 400px 400px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_setting />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าแจ้งเตือนก่อนวันหมดอายุ
          </DivFromTop>
          <DivFromDown>
            {expseting &&
              expseting.listExpSetting.map((prod) => (
                <Expseting key={prod.id} listexpseting={prod} />
              ))}
          </DivFromDown>
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "2",
            gridColumnStart: "4",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            บันทึกตั้งค่าวันหมดอายุ
          </DivFromTop>
          <DivFromDown>
            {date &&
              date.Totalexpdate.map((prod) => (
                <Date1 key={prod.id} listdate={prod} />
              ))}
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
};

export default index;

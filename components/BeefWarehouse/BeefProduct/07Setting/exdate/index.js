import React from "react";
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
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Nav_seting from "../Nav_setting";
import List from "./list";

export const QUERYEXPDATE = gql`
  query QUERYEXPDATE {
    listExpSetting2 {
      id
      day
    }
  }
`;

const index = () => {
  const { data } = useQuery(QUERYEXPDATE);
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
          gridTemplateColumns: "1fr 200px  400px 1fr",
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
          <Nav_seting />
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
            {data &&
              data.listExpSetting2.map((prod) => (
                <List key={prod.id} listexpdate={prod} />
              ))}
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
};

export default index;

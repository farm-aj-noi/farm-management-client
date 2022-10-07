import React from "react";

import {
  DivFromTop,
  DivFromDown,
} from "../../SettingFrom";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import List from "./Listroom";

export const QUERYROOMS = gql`
  query QUERYROOMS {
    allRoom {
      id
      roomname
      typekeep {
        id
        totalbeef
        beeftype {
          id
          nameTH
        }
      }
    }
  }
`;

const room1 = () => {
  const { data: dataroom } = useQuery(QUERYROOMS);
  // console.log(dataroom)
  return (
    <div>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการห้องจัดเก็บ
      </DivFromTop>
      <DivFromDown>
        <div>
          {dataroom && dataroom.allRoom.length > 0 ? (
            dataroom.allRoom.map((prod) => (
              <>
                <div
                  style={{ margin: "auto", minWidth: "100%" }}
                >
                  <List key={prod.id} idroom={prod} />
                </div>
              </>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  color: "#ff0000",
                }}
              >
                <Icon size={150} icon={ic_info_outline} />
                <br />
                ไม่พบข้อมูล
              </div>
            </div>
          )
          }
        </div>
      </DivFromDown>
    </div>
  );
};

export default room1;

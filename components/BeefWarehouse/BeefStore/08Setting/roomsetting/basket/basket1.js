import React from "react";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
import {

  DivFromTop,
  DivFromDown,

} from "../../SettingFrom";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import {  useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


import List1 from "./list1";

export const QUERYROOM = gql`
  query Query {
    allRoom {
      id
      roomname
    }
  }
`;




const basket1 = () => {
  const { data: dataroom } = useQuery(QUERYROOM);
  return (
    <>
      <div>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการตะกร้าจัดเก็บ
        </DivFromTop>
        <DivFromDown>
          <div>
            {dataroom && dataroom.allRoom.length > 0 ? 
            (
              dataroom.allRoom.map((prod) => (
              <List1 key={prod.id} listroom1={prod} />
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
    </>
  );
};

export default basket1;

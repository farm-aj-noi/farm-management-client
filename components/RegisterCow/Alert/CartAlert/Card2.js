import React from "react";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";
import { DivAlertCard, StyleAlertCardDown } from "./StyleCard";

import ImgCuttwo from "../../../../images/slaughter/alert/cuttwo.png";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query QUERY_CARD{
    Card2 {
      barcode
    }
  }
`;

const Card2 = () => {

  const { data, loading, error, refetch } = useQuery(QUERY_CARD);

  return (
    <DivAlertCard
      style={{
        backgroundColor: "rgb(157 23 217)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "right",
          padding: "73px 10px 0 0px",
        }}
      >
        รายการตัดแต่งซากโคผ่าซีก// 04/2
      </div>
      <div
        style={{
          height: "75%",
          padding: "10px 10px 0px 10px",
          display: "inline-flex",
          width: "100%",
        }}
      >
        <div style={{ width: "fit-content" }}>
          <img src={ImgCuttwo} width="100" />
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "right",
            fontSize: "50px",
            height: "62px",
          }}
        >
          {data?(
            data.Card2.length
          ):
          'NAN'
          }
        </div>
      </div>
      <Link href="/slaughter/listcuttwo">
        <StyleAlertCardDown>
          แสดงรายละเอียด
          <div style={{ margin: "-3px 0px 0px auto" }}>
            <Icon size={20} icon={fileText} />
          </div>
        </StyleAlertCardDown>
      </Link>
    </DivAlertCard>
  );
};

export default Card2;

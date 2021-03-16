import React from "react";

import Link from "next/link";
import { Icon } from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";
import { DivAlertCard, StyleAlertCardDown } from "./StyleCard";

import ImgSlaughter from "../../../../images/slaughter/alert/cut.png";


import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD1_5 = gql`
  query QUERY_CARD1_5 {
    Card1_5 {
      numcow
    }
  }
`;

const Card1_5 = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_CARD1_5);

  return (
    <DivAlertCard
      style={{
        backgroundColor: "rgb(33 55 145)",
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
        รายการเชือดโค
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
          <img src={ImgSlaughter} width="100" />
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "right",
            fontSize: "50px",
            height: "62px",
          }}
        >
          {data ? data.Card1_5.length : "NAN"}
        </div>
      </div>

      <Link href="/slaughter/slaughter">
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

export default Card1_5;

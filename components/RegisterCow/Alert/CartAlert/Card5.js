import React from "react";
import Link from "next/link";
import { Icon } from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";
import { DivAlertCard, StyleAlertCardDown } from "./StyleCard";

// import ImgPrice from "../../../../images/slaughter/alert/price.png";
import ImgPrice from "../../../../images/slaughter/alert/slaughter.png";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query QUERY_CARD {
    CardWaitting {
      namecow
    }
  }
`;

const Card5 = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_CARD);
  console.log(data)
  return (
    <DivAlertCard
      style={{
        backgroundColor: "rgb(223 118 0)",
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
        รายการโครอขึ้นทะเบียนขุน
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
          <img src={ImgPrice} width="100" />
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "right",
            fontSize: "50px",
            height: "62px",
          }}
        >
          {data ? data.CardWaitting.length : "NAN"}
        </div>
      </div>
      <Link href="/registercow/listwaittingcow">
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

export default Card5;

import React, { useState, useEffect, useContext } from "react";
import { Icon } from "react-icons-kit";
import dayjs from "dayjs";
import "dayjs/locale/th";

import ImgSlaughter from "../../../../images/slaughter/alert/slaughter.png";
import { DivAlertCard } from "./StyleCard";
import { globe } from "react-icons-kit/oct/globe";
import { AuthContext } from "../../../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD1 = gql`
  query QUERY_CARD1 {
    Card1 {
      numcow
    }
  }
`;

export const QUERY_CARD1_5 = gql`
  query QUERY_CARD1_5 {
    Card1_5 {
      numcow
    }
  }
`;

export const QUERY_CARD2 = gql`
  query QUERY_CARD2 {
    Card2 {
      barcode
    }
  }
`;

export const QUERY_CARD3 = gql`
  query QUERY_CARD3 {
    Card3 {
      barcode
    }
  }
`;

export const QUERY_CARD4 = gql`
  query QUERY_CARD4 {
    Card4 {
      barcode
    }
  }
`;

export const QUERY_CARD5 = gql`
  query QUERY_CARD5 {
    Card5 {
      numcow
    }
  }
`;

export const QUERY_CARD6 = gql`
  query QUERY_CARD6 {
    Card6 {
      numcow
    }
  }
`;

const Card0 = () => {
  const { user } = useContext(AuthContext);

  const { data: dataCard1 } = useQuery(QUERY_CARD1);
  const { data: dataCard1_5 } = useQuery(QUERY_CARD1_5);
  const { data: dataCard2 } = useQuery(QUERY_CARD2);
  const { data: dataCard3 } = useQuery(QUERY_CARD3);
  const { data: dataCard4 } = useQuery(QUERY_CARD4);
  const { data: dataCard5 } = useQuery(QUERY_CARD5);
  const { data: dataCard6 } = useQuery(QUERY_CARD6);

  const [date, setDate] = useState();
  const datetest = () => {
    setDate(
      dayjs()
        .locale("th")
        .add(543, "year")
        .format("วันที่ D MMMM พ.ศ.YYYY เวลา hh:mm น.")
    );
  };

  useEffect(() => {
    const interval = setInterval(datetest, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <DivAlertCard
      style={{
        backgroundColor: "rgb(36 170 30)",
      }}
    >
      <div
        style={{
          position: "absolute",
          margin: "77px 0 0 13px",
          width: "88%",
          textAlign: "center",
          background: "#ffffff",
          padding: "6px 0px 0px 0",
          color: "#004515",
          borderRadius: "2px",
          height: "32px",
          fontWeight: "bold",
        }}
      >
        รานการแจ้งเตือนรวม{" "}
        {dataCard1 &&
        dataCard1_5 &&
        dataCard2 &&
        dataCard3 &&
        dataCard4 &&
        dataCard5 &&
        dataCard6 &&
        user.role.nameEN === "booster"
          ? dataCard1.Card1.length +
            dataCard1_5.Card1_5.length +
            dataCard2.Card2.length
          : dataCard1 &&
            dataCard1_5 &&
            dataCard2 &&
            dataCard3 &&
            dataCard4 &&
            dataCard5 &&
            dataCard6 &&
            user.role.nameEN === "slaughter"
          ? dataCard3.Card3.length +
            dataCard4.Card4.length +
            dataCard6.Card6.length
          : dataCard1 &&
            dataCard1_5 &&
            dataCard2 &&
            dataCard3 &&
            dataCard4 &&
            dataCard5 &&
            dataCard6 &&
            user.role.nameEN === "accounter"
          ? dataCard5.Card5.length
          : dataCard1 &&
            dataCard1_5 &&
            dataCard2 &&
            dataCard3 &&
            dataCard4 &&
            dataCard5 &&
            dataCard6 &&
            user.role.nameEN === "admin"
          ? dataCard1.Card1.length +
            dataCard1_5.Card1_5.length +
            dataCard2.Card2.length +
            dataCard3.Card3.length +
            dataCard4.Card4.length +
            dataCard6.Card6.length +
            dataCard5.Card5.length
          : ""}{" "}
        รายการ
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
          <Icon size={60} icon={globe} />
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "14px",
            padding: "10px 0 0 0",
          }}
        >
          {date}
        </div>
      </div>
    </DivAlertCard>
  );
};

export default Card0;

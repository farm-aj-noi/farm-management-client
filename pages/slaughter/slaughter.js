import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
import Getin from "../../components/Slaughter/04_Slaughter/index";
import Bad from "../../components/Slaughter/04_Slaughter/top/box-alert-date";
import { BackgroundFarmAll } from "../../utils/background";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query QUERY_CARD {
    Card1_5 {
      numkun
    }
  }
`;

const GetinPage = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_CARD,{pollInterval: 2000,});
  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad
        name="รายการเชือดโค ณ วัน"
        count={
          data
            ? "จำนวน " + data.Card1_5.length + " รายการ"
            : "จำนวน " + "NAN" + " รายการ"
        }
      />
      <Getin />
    </BackgroundFarmAll>
  );
};

export default GetinPage;

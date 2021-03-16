import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
import ListCuttwo from "../../components/Slaughter/12_Buy/index";
import Bad from '../../components/Slaughter/12_Buy/top/box-alert-date'
import { BackgroundFarmAll } from "../../utils/background";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query QUERY_CARD {
    Card5 {
      numkun
    }
  }
`;

const GetinPage = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_CARD,{pollInterval: 2000,});
  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad name="รายการตัดแต่งซากโคผ่าซีก ณ วัน" count={
          data
            ? "จำนวน " + data.Card5.length + " รายการ"
            : "จำนวน " + "NAN" + " รายการ"
        }/>
      <ListCuttwo />
    </BackgroundFarmAll>
  );
};

export default GetinPage;

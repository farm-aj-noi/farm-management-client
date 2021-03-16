import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
import ListCutfour from "../../components/Slaughter/07_Listcutfour/index";
import Bad from '../../components/Slaughter/07_Listcutfour/top/box-alert-date'
import { BackgroundFarmAll } from "../../utils/background";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query QUERY_CARD {
    Card3 {
      barcode
    }
  }
`;

const GetinPage = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_CARD);
  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad name="รายการตัดแต่งซากโคสี่ซีก ณ วัน" count={
          data
            ? "จำนวน " + data.Card3.length + " รายการ"
            : "จำนวน " + "NAN" + " รายการ"
        }/>
      <ListCutfour />
    </BackgroundFarmAll>
  );
};

export default GetinPage;

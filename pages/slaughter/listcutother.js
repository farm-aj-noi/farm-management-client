import React from "react";

import Nav from "../../components/Slaughter/Nav/Nav";
import ListCutother from "../../components/Slaughter/08_Listcutother/index";
import Bad from "../../components/Slaughter/08_Listcutother/top/box-alert-date";
import { BackgroundFarmAll } from "../../utils/background";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_CARD = gql`
  query QUERY_CARD {
    Card4 {
      barcode
    }
  }
`;

const GetinPage = () => {
  const { data, loading, error, refetch } = useQuery(QUERY_CARD);
  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad
        name="รายการตัดแต่งก้อนเนื้อ ณ วัน"
        count={
          data
            ? "จำนวน " + data.Card4.length + " รายการ"
            : "จำนวน " + "NAN" + " รายการ"
        }
      />
      <ListCutother />
    </BackgroundFarmAll>
  );
};

export default GetinPage;

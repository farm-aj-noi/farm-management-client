import React, { useState } from "react";
import dayjs from "dayjs";

import Nav from "../../components/Slaughter/Nav/Nav";
import Getin from "../../components/Slaughter/02_GetIn/index";
import Bad from "../../components/Slaughter/02_GetIn/top/box-alert-date";
import { BackgroundFarmAll } from "../../utils/background";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY_NUMKUN = gql`
  query QUERY_NUMKUN {
    Card1 {
      numcow
    }
  }
`;

const GetinPage = () => {
  const [selectedStatus, SetStatusChange] = useState(
    "5f0fdb4b02b40c2ab8506563"
  );
  const [selectedDate, handleDateChange] = useState(
    // dayjs().format("ddd MMM DD YYYY")
    // dayjs().startOf('h').toISOString()
    // dayjs().startOf('h').add(1, 'day').toISOString()
    dayjs().format("YYYY-MM-DD")
  );
  // console.log(selectedDate);

  const { data, loading, error, refetch } = useQuery(QUERY_NUMKUN, {pollInterval: 2000,
  });
  // console.log(data);

  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad
        name="รายการรับโคเข้าเชือด ณ วัน"
        count={
          data
            ? "จำนวน " + data.Card1.length + " รายการ"
            : "จำนวน " + 0 + " รายการ"
        }
      />
      <Getin />
    </BackgroundFarmAll>
  );
};

export default GetinPage;

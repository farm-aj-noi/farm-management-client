import React, { useState } from "react";
import dayjs from "dayjs";

import Nav from "../../components/Slaughter/Nav/Nav";
import ListSlaughter from "../../components/Slaughter/03_Listslaughter/index";
import Bad from "../../components/Slaughter/03_Listslaughter/top/box-alert-date";
import { BackgroundFarmAll } from "../../utils/background";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const QUERY_LISTST = gql`
  query QUERY_LISTST($importslaughterDate: String, $statusCa: String) {
    imslaughtersSearchList(
      importslaughterDate: $importslaughterDate
      statusCa: $statusCa
    ) {
      id
    }
  }
`;

const GetinPage = () => {
  const [selectedStatus, SetStatusChange] = useState(
    "5f0fdb7b02b40c2ab8506566"
  );
  const [selectedDate, handleDateChange] = useState(
    // dayjs().format("ddd MMM DD YYYY")
    // dayjs().startOf('h').toISOString()
    // dayjs().startOf('h').add(1, 'day').toISOString()
    dayjs().format("YYYY-MM-DD")
  );
  // console.log(selectedDate);

  const { data, loading, error, refetch } = useQuery(QUERY_LISTST, {
    variables: {
      importslaughterDate: selectedDate,
      statusCa: selectedStatus,
    },
    pollInterval: 2000,
  });
  // console.log(data);
  return (
    <BackgroundFarmAll>
      <Nav />
      <Bad
        name="รายการเชือดโค ณ วัน"
        count={
          data
            ? "จำนวน " + data.imslaughtersSearchList.length + " รายการ"
            : "จำนวน " + 0 + " รายการ"
        }
      />
      <ListSlaughter />
    </BackgroundFarmAll>
  );
};

export default GetinPage;

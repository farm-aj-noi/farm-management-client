import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown,  Searchinput,
} from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import { usePagination } from "../../../helps/paginationhook";
import Paginator from "../../../helps/Paginator";
import List from "./listhalve";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


export const QUERY_LISTST = gql`
  query QUERY_LISTST(
    $numkun: String
  ) {
    Selectcow(
    numkun: $numkun
    ) {
      id
      numcow
      numkun
      pun
      numfarmer
      namecow
      date
      statuscow
    }
  }
`;

export const QUERY = gql`
  query QUERY {
    imslaughtersSearch {
      id
      numcow
      numkun
      pun
      numfarmer
      namecow
      date
      statuscow
  }
  }
`;

const Index = () => {
  const {
    isPaginating,
    currentPage,
    setCurrentPage,
    pageItems,
    setItemList,
    totalPages,
  } = usePagination([]);
  const [selectedDate, handleDateChange] = useState(
    // dayjs(date).format("YYYY-MM-DD")
  );
  // const { data, loading, error, refetch } = useQuery(QUERY, {});

  const [inputnumkun, setInputnumkun] = useState("");
  const [groupin, setGroupin] = useState("");
  const [selectedStatus, SetStatusChange] = useState("5f0fdb6502b40c2ab8506565");
  // console.log(data);
  const { data, loading, error, refetch } = useQuery(QUERY_LISTST, {
    variables: {
      numkun:inputnumkun,
    },
    onCompleted:(data) => {
      // console.log(data.SearchBuy)
      setItemList(data.Selectcow)

    }
  });
  return (
    <>
  <DivBase>
    <DivFrom>
      <DivFromTop>
        <div style={{ margin: "-3px 5px 0px 0px" }}>
          <Icon size={20} icon={list} />
        </div>
        รายการโคเข้าขุน
      </DivFromTop>
      <DivFromDown
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridRowGap: "5px",
        }}
      >
        {/* ใส่ card */}
        <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput
                onChange={(event) => setInputnumkun(event.target.value)}
                style={{
                  marginRight: 10,
                }}
              />
            
            </div>
        <div>
          <Table
            striped
            bordered
            responsive
            hover
            style={{ margin: "auto" }}
          >
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>หมายเลขขุน</th>
                <th>หมายเลขโค</th>
                <th>ชื่อโค</th>
                <th>สายพันธุ์</th>
                <th>อายุการขุน</th>
                <th>หมายเลขสมาชิก</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
                    { data &&
                    data.Selectcow.map((prod) => (
                        <List key={prod.id} List={prod} />
                      ))}
                  </tbody>
                  
          </Table>
        </div>
      </DivFromDown>
    </DivFrom>
    {/* <Footer/> */}
  </DivBase>


    </>
  );
};

export default Index;

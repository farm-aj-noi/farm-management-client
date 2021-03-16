import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown,Searchinput } from "./SlaughterFrom";
// import Footer from "../../Footer/index";
import { usePagination } from "../../../helps/paginationhook";

import List from "./listhalve";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";




export const QUERY_LISTST = gql`
  query QUERY_LISTST(
    $numkun: String
    $statusIm:String
  ) {
    Selecttreat(
    numkun: $numkun
    statusIm: $statusIm
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
    treatSearch {
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
  // const { data, loading, error, refetch } = useQuery(QUERY, {});
  const [inputnumkun, setInputnumkun] = useState("");
  const [selectedStatus, SetStatusChange] = useState("5ff2e44a74a6e82d00686276");

  const { data, loading, error, refetch } = useQuery(QUERY_LISTST, {
    variables: {
      numkun:inputnumkun,
      statusIm: selectedStatus,

    },
    onCompleted:(data) => {
      // console.log(data.SearchBuy)
      setItemList(data.Selecttreat)

    }
  });
    // console.log(data);
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
                style={{ marginRight: 10 }}
                onChange={(event) => setInputnumkun(event.target.value)}
              />
              {/* วันที่ : {}
              <DatePicker
                className={Datestyle.datepicker}
                selected={date}
                onChange={onChangeDatePicker}
                dateFormat="dd/mm/yyyy"
                ref={dateRef}
                locale="th"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />{" "} */}
              สถานะ : {}
              <select
                onChange={(event) => SetStatusChange(event.target.value)}
                style={{
                  display: "inline",
                  width: "130px",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                  fontWeight: "400",
                  lineHeight: "1.5",
                  color: "#495057",
                  backgroundColor: "#fff",
                  backgroundClip: "padding-box",
                  border: "1px solid #ced4da",
                  /* border-radius: 0.25rem 0rem 0rem 0.25rem; */
                  borderRadius: "0.25rem",
                  transition:
                    "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                }}
              >
                <option value="5ff2e44a74a6e82d00686276">กำลังรักษา</option>
                <option value="601f968a8443a40c74357c2f">ตาย</option>
              </select>
            </div>

{/* 
        <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput
                onChange={(event) => setInputnumkun(event.target.value)}
                style={{
                  marginRight: 10,
                }}
              />
            
            </div> */}

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
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
                    {data &&
                      data.Selecttreat.map((prod) => (
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

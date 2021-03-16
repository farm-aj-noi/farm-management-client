import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

//test pagination
import { usePagination } from "../../../helps/paginationhook";
import Paginator from "../../../helps/Paginator";

import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
// import DatePicker from "react-datepicker";

import { list } from "react-icons-kit/fa/list";
import { DivBase } from "../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Wightinput,
} from "./ListcuttwoFrom";
// import Footer from "../../Footer/index";
import dayjs from "dayjs";
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
registerLocale("th", th);
import Datestyle from "../helps/datepicker.module.css";

import { Savebutton, Editbutton } from "../../../utils/button";
import { now } from "moment";
import ListImport from "./listImport";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const QUERY = gql`
  query QUERY($fees: String, $numkun: String) {
    SearchBuy(numkun: $numkun, fees: $fees) {
      id
      numcow
      numkun
      pun
      numfarmer
      namefarmer
      weight
      price
      importDate
      importslaughterDate
      statusIm {
        code
        nameTH
      }
      fees
    }
  }
`;

const Index = () => {
  //test pagination
  const {
    isPaginating,
    currentPage,
    setCurrentPage,
    pageItems,
    setItemList,
    totalPages,
  } = usePagination([]);
  // console.log(pageItems)

  const [edit, setEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [inputnumkun, setInputnumkun] = useState("");
  // console.log(fees)

  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      numkun: inputnumkun,
      fees: fees,
    },
    onCompleted:(data) => {
      // console.log(data.SearchBuy)
      setItemList(data.SearchBuy)
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
            รายการจัดการราคาชื้อ
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridRowGap: "5px",
            }}
          >
            {/* ใส่ card */}
            {/* <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput />
            </div> */}
            <div className="mb-3" style={{ margin: "auto" }}>
              ค้นหาตามใบแจ้งขุน : {}
              <Searchinput
                onChange={(event) => setInputnumkun(event.target.value)}
                style={{
                  marginRight: 10,
                }}
              />
              {}
              สถานะ : {}
              <select
                onChange={(event) => setFees(event.target.value)}
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
                <option value="">ทั้งหมด</option>
                <option value="0">รอจัดการ</option>
                <option value="1">จัดการเสร็จสิ้น</option>
              </select>
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
                    <th>ใบแจ้งขุน</th>
                    <th>เบอร์โค</th>
                    <th>พันธุ์</th>
                    <th>รหัสสมาชิก</th>
                    <th>ชื่อสมาชิก</th>
                    <th>น้ำหนักโค (กก.)</th>
                    <th>ค่าดำเนินการ</th>
                    <th>สถานะ</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {data &&
                    data.SearchBuy.map((prod) => (
                      <ListImport key={prod.id} imslaughter={prod} />
                    ))}
                </tbody> */}
                <tbody>
                  {pageItems.map((prod) => (
                    <ListImport key={prod.id} imslaughter={prod} />
                  ))}
                </tbody>
                {data && isPaginating &&(
                  <Paginator
                    totalPages={totalPages}
                    currentPage={currentPage}
                    changePageHandler={setCurrentPage}
                  />
                )}
              </Table>
            </div>
            {/* <div className="mb-3" style={{ margin: "12px auto" }}>
              <Gobutton>ไปยังหน้าตัดแต่งซากโคผ่าซีก</Gobutton>
            </div> */}
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;

import React, { useState,useContext } from "react";

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
import { AuthContext } from "../../../appState/AuthProvider";
import Signin from "../../Signin";


export const QUERY_LISTST = gql`
  query QUERY_LISTST(
    $passsport: String!,
  ) {
    cowfarmmerweitting(
      passsport: $passsport,
    ) {
      id
      pun
      numfarmer
      namecow
      date
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
      user
      passport
  }
  }
`;

const Index = () => {
  const { user } = useContext(AuthContext);

  console.log(user)
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
  // const [user, setuser] = useState("")
  const [inputnumkun, setInputnumkun] = useState("");
  const [groupin, setGroupin] = useState("");
  const [selectedStatus, SetStatusChange] = useState("605af3da9c7419287cdb3138");
  // console.log(data);
  const { data, loading, error, refetch } = useQuery(QUERY_LISTST, {
    variables: {
      passsport:user.passsport,
      numkun:inputnumkun
    },
    onCompleted:(data) => {
      // console.log(data.SearchBuy)
      setItemList(data.cowfarmmerweitting)
    console.log(data.cowfarmmerweitting)

    }

  });
  // console.log()
  // setuser(AuthenticatorAssertionResponse)
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
                  width: "170px",
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
                <option value="605af3da9c7419287cdb3138">รออนุมัติขึ้นทะเบียนขุน</option>
                <option value="601f968a8443a40c74357c2f">อนุมัติขึ้นทะเบียนแล้ว</option>
                <option value="601f968a8443a40c74357c2f">ไม่ผ่านการอนุมัติ</option>
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
                {/* <th>หมายเลขขุน</th>
                <th>หมายเลขโค</th> */}
                <th>ชื่อโค</th>
                <th>สายพันธุ์</th>
                {/* <th>อายุการขุน</th> */}
                <th>วันที่แจ้งลงทะเบียน</th>
                <th>สถานะ</th>
                <th>จัดการ</th>


              </tr>
            </thead>
            <tbody>
                    { data &&
                    data.cowfarmmerweitting.map((prod) => (
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

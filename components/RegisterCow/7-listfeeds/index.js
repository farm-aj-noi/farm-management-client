import React, { useContext } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { DivBase } from "../../../utils/divBase";
import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../utils/buttonColor";
import { Icon } from "react-icons-kit";
import { Table } from "react-bootstrap";
import { Savebutton, Editbutton, Removebutton } from "../../../utils/button";

import { list } from "react-icons-kit/fa/list";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Wightinput,
} from "./SlaughterFrom";
import dayjs from 'dayjs'

export const QUERY_PRODUCTS = gql`
  query {
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
`
const days_between = (date1) =>{
 
     dayjs(date1).format("YYYY-MM-DD");

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;
     var  date2 = new Date().toISOString()
    var date3 =  dayjs(date2).format("YYYY-MM-DD");
     var dt1 = new Date(date1);
     var  dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
  
      

const Products = () => {
  const { data, loading, error } = useQuery(QUERY_PRODUCTS)
 
  // const { user } = useContext(AuthContext)

  
  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>

console.log(data) 
console.log(days_between());
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
          ค้นหาตามหมายเลขขุน : {}
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
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody> 
              {data.treatSearch.map(prod => (
                
                 <tr style={{ textAlign: "center" }}>
                <td> {prod.numkun} </td>
                <td> {prod.numcow}</td>
                <td>{prod.namecow}</td>
                <td> {prod.pun} </td>
                <td>{
                days_between(prod.date.substring(0,10))
                  } วัน</td>
                <td> {prod.numfarmer} </td>
                <td> {prod.statuscow} </td>
                <td> 
                <Editbuttoncolor>
            <Editbutton />
          </Editbuttoncolor>
          &ensp;
          <Removebuttoncolor>
            <Removebutton />
          </Removebuttoncolor>                
                </td>


              </tr>
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
}

export default Products
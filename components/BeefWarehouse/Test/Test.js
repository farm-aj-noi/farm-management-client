import React from 'react'
import styled from "styled-components";
import { HeaderColor } from "./ImportFrom"
import { DivBase } from '../../../utils/divBase';
import Nav from './Nav_store'
import { Table } from 'react-bootstrap';
import { DivFromTop, DivFromDown, DivFrom, DivBase1 } from './ImportFrom';

const Row = styled.div`
&::after{
    content:"";
    clear:both;
    display: table;
}
`;

function getWidthString(span) {
    if (!span) return;
    let width = span / 12 * 100;
    return `width:${width}%`;
}

const Column = styled.div` 
float:left;
   ${({ xs }) => (xs ? getWidthString(xs) : "width : 100%")};

   @media only screen and (min-width:768px){
    ${({ sm }) => sm && getWidthString(sm)};
   }

   @media only screen and (min-width:992px){
    ${({ md }) => md && getWidthString(md)};
   }

   @media only screen and (min-width:1200px){
    ${({ lg }) => lg && getWidthString(lg)};
   }
`

function Test() {
    return (
        <div style={{ marginTop: "100px" }} >
            <div className='header' style={{ display: "flex", justifyContent: "center" }}>
                <HeaderColor
                    style={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "5px 30px",
                    }}>
                    Header
                </HeaderColor>
            </div>
            <DivBase1>
                <Row>
                    <Column xs="12" sm="12" md="3" lg="2"
                       
                    >
                        <div>

                            <div style={{ padding: "40px 40px 0px 40px" }}><Nav /></div>

                        </div>
                    </Column>
                    <Column xs="12" sm="12" md="9" lg="10"
                        /* style={{ backgroundColor: "red" }} */
                    >
                        <div style={{ padding: "40px 40px 0px 40px" }}>
                            <DivFrom
                                style={{
                                    width: "100%",
                                }}
                            >
                                <DivFromTop>
                                    {/* <div style={{ margin: "-3px 5px 0px 0px" }}>
                                        <Icon size={20} icon={iosSearchStrong} />
                                    </div> */}
                                    ค้นหารายการ
                                </DivFromTop>
                                <DivFromDown>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <from style={{ fontSize: "20px" }}>
                                            <label
                                                for="beef"
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                ซาก
                                            </label>
                                            <select
                                                name="type"
                                                id="type"
                                                style={{
                                                    height: "35px",
                                                    width: "120px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "4px",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                    marginRight: "10px",
                                                }}

                                            >
                                                <option value="">ทั้งหมด</option>
                                                <option value="ซากโคผ่าซีก">ซากโคผ่าซีก</option>
                                                <option value="ซากโคสี่เสี้ยว">ซากโคสี่เสี้ยว</option>
                                                <option value="ก้อนเนื้อ">ก้อนเนื้อ</option>
                                                <option value="ชิ้นเนื้อ">ชิ้นเนื้อ</option>
                                            </select>
                                            <label
                                                for="beef"
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                ประเภทซาก
                                            </label>
                                            <select
                                                name="beeftype"
                                                id="beeftype"

                                                style={{
                                                    height: "35px",
                                                    width: "120px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "4px",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                }}

                                            >

                                                <option value="">ทั้งหมด</option>

                                            </select>

                                            <label
                                                for="beef"
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    marginLeft: "10px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                ทะเบียนขุน
                                            </label>
                                            <input
                                                style={{
                                                    height: "35px",
                                                    width: "110px",
                                                    borderRadius: "4px",
                                                    border: "1px solid #AFAFAF",
                                                    fontSize: "16px",
                                                    textAlign: "center",
                                                }}

                                            />
                                            <label
                                                for="beef"
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    margin: "10px 10px",
                                                }}
                                            >
                                                ตำแหน่ง
                                            </label>
                                            <select
                                                name="roomname"
                                                id="roomname"
                                                style={{
                                                    height: "35px",
                                                    width: "50px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "4px 0px 0px 4px",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                }}

                                            >
                                                <option value="">ห้อง</option>

                                            </select>
                                            <select
                                                name="shelfname"
                                                id="shelfname"

                                                style={{
                                                    height: "35px",
                                                    width: "50px",
                                                    border: "1px solid #AFAFAF",
                                                    borderLeft: "none",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                }}

                                            >
                                                <option value="">ชั้น</option>

                                            </select>
                                            <select
                                                name="basket"
                                                id="basket"

                                                style={{
                                                    height: "35px",
                                                    width: "60px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "0px 4px 4px 0px",
                                                    borderLeft: "none",
                                                    textAlign: "center",
                                                    fontSize: "16px",

                                                }}

                                            >
                                                <option value="">ตะกร้า</option>

                                            </select>
                                            <label
                                                for="expdate"
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    margin: "10px 10px",
                                                }}
                                            >
                                                วันหมดอายุ
                                            </label>
                                            <input
                                                type="date"
                                                name="expdate"
                                                id="date"
                                                style={{
                                                    height: "35px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "4px ",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                }}

                                            ></input>
                                            <label
                                                for="beef"
                                                style={{
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    margin: "10px 10px",
                                                }}
                                            >
                                                เกรด
                                            </label>
                                            <select
                                                name="room"
                                                id="room"
                                                style={{
                                                    height: "35px",
                                                    width: "70px",
                                                    border: "1px solid #AFAFAF",
                                                    borderRadius: "4px",
                                                    textAlign: "center",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                <option value="halve">ทั้งหมด</option>
                                                <option value="quarter">1</option>
                                                <option value="lamp">2</option>
                                                <option value="chop">3</option>
                                                <option value="chop">4</option>
                                                <option value="chop">5</option>
                                            </select>
                                        </from>
                                    </div>
                                </DivFromDown>
                            </DivFrom>
                        </div>
                    </Column>
                </Row>
                <Row>
                    <Column xs="12" sm="12" md="12" lg="12" /* style={{ backgroundColor: "red" }} */>
                        <div style={{ padding: "40px 40px 0px 40px" }}>
                            <DivFrom
                                style={{
                                    width: "100%",
                                }}
                            >
                                <DivFromTop>
                                    {/*  <div style={{ margin: "-3px 5px 0px 0px" }}>
                                    <Icon size={20} icon={list} />
                                </div> */}
                                    รายการยอดคงคลังซากเนื้อโค
                                </DivFromTop>
                                <DivFromDown>
                                    <div >
                                        <Table
                                            striped
                                            bordered
                                            responsive
                                            hover
                                            style={{ margin: "auto" }}
                                        >
                                            <thead>
                                                <tr style={{ textAlign: "center", fontSize: "18px" }}>
                                                    <th>ประเภทซาก</th>
                                                    <th>ทะเบียนขุน</th>
                                                    <th>รหัสซาก</th>
                                                    <th>รหัสบาร์โค้ด</th>
                                                    <th>คิวอาร์โค้ด</th>
                                                    <th>น้ำหนักอุ่น (กก.)</th>
                                                    <th>น้ำหนักเย็น (กก.)</th>
                                                    <th>วันหมดอายุ</th>
                                                    <th>เกรด</th>
                                                    <th>ห้อง</th>
                                                    <th>ชั้น</th>
                                                    <th>ตะกร้า</th>
                                                    <th>สถานะ</th>
                                                    <th>หมายเหตุ</th>
                                                    <th>จัดการ</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr style={{ textAlign: "center" }}>
                                                    <td colSpan="15">ไม่พบข้อมูล</td>
                                                </tr>

                                            </tbody>
                                        </Table>
                                    </div>

                                </DivFromDown>
                            </DivFrom>

                        </div>

                    </Column>
                </Row>
            </DivBase1>


        </div >
    )
}

export default Test
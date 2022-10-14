import React from 'react'
import styled from "styled-components";
import { DivBase } from '../../../utils/divBase';
import Nav from './Nav_store'
import { Table } from 'react-bootstrap';
import { DivFromTop, DivFromDown, DivFrom, DivBase1 } from './ImportFrom';




export const DivContainar = styled.div`
padding-left:100px;
padding-right: 100px;
margin-top: 0;
display: grid;
grid-template-columns: 200px 1fr;
/* grid-gap: 2rem; */
width: 100%;
grid-column-gap: 2rem;

@media screen and (max-width:1300px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem; 
    padding-left:30px;
    padding-right: 30px;
    padding-bottom: 130px;
}
`


export const HeaderColor = styled.div`
  text-align: center;
  background: #da4453;
  border: none;
  border-radius: 4px;
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  width: fit-content;
  height: fit-content;
  padding:5px 30px;
  letter-spacing: 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 30px;
`;
export const DivSearch = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap:10px;

@media screen and (max-width:700px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem; 
}
@media screen and (max-width:1300px) and (min-width: 700px){
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px; 
}
`
export const DivFromSearch = styled.div`
display:flex;
justify-content: center;

@media screen and  (max-width:1300px){
    display:grid;
    grid-template-columns: 1fr;
}
/* @media screen and (max-width:1200px) and (min-width: 600px){
    display:grid;
    grid-template-columns: 1fr 1fr;
} */
`
export const DivGrid = styled.div`
grid-row-start: 1 ;
grid-column-start: 2 ;

@media screen and (max-width:1300px) { 
    display:grid;
    grid-template-columns: 1fr;
    grid-row-start: 2 ;
    grid-column-start: 1 ;
    margin:0;   
}
`

export const DivData = styled.div`
grid-row-start: 2 ;
grid-column-start: 2 ;

@media screen and (max-width:1300px) {
    display:grid;
    grid-template-columns: 1fr;
    grid-row-start: 3 ;
    grid-column-start: 1 ;
    margin:0;
}
`
export const SelectType = styled.select`
height: 35px;
width: 120px;
border: 1px solid #AFAFAF;
border-radius: 4px;
text-align: center;
font-size: 16px;
margin-left: 10px;
margin-right: 10px;

@media screen and (max-width:1300px) {
    width:100%;
    margin:0px;
}

`

export const Formfilter = styled.form`
font-size: 18px;
`

export const Formfilter1 = styled.form`
font-size: 18px;
@media screen and (min-width:1710px){
display: flex;
justify-content: center;
align-items: center;
}
`

export const FormfilterRoom = styled.form`
display: flex;
justify-content: center;
align-items: center;
font-size: 18px;

@media screen and (max-width:700px) {
display: flex;
justify-content: center;
align-items: center;
}
`
export const Inputfilter = styled.input`
height: 35px;
width: 120px;
border: 1px solid #AFAFAF;
border-radius: 4px;
text-align: center;
font-size: 16px;
margin-left: 10px;
margin-right: 10px;

@media screen and (max-width:1300px) {
    width:100%;
    margin:0px;
}
`

export const SelectRoom = styled.select`
height: 35px;
border: 1px solid #AFAFAF;
width: 60px;
border-radius: 4px;
text-align: center;
font-size: 16px;
margin-left: 10px;
margin-right: 10px;
@media screen and (max-width:1300px) {
    width:33%;
    margin:0px;
}
`


function Test() {
    return (
        <div style={{ marginTop: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <HeaderColor>บ่มซากเนื้อโค</HeaderColor>
            </div>
            <DivContainar>
                <div><Nav /></div>
                <DivGrid>
                    <DivFromTop>รายการค้นหา</DivFromTop>
                    <DivFromDown>
                        <DivSearch>
                            <DivFromSearch>
                                <Formfilter>
                                    ซากโค
                                    <SelectType
                                        name="type"
                                        id="type"
                                    /*   onChange={(event) => SettypeChange(event.target.value)} */
                                    >
                                        <option value="">ทั้งหมด</option>
                                        <option value="ซากโคผ่าซีก">ซากโคผ่าซีก</option>
                                        <option value="ซากโคสี่เสี้ยว">ซากโคสี่เสี้ยว</option>
                                        <option value="ก้อนเนื้อ">ก้อนเนื้อ</option>
                                        <option value="ชิ้นเนื้อ">ชิ้นเนื้อ</option>
                                    </SelectType>
                                </Formfilter>
                            </DivFromSearch>
                            <DivFromSearch>
                                <Formfilter>
                                    ประเภทซากโค
                                    <SelectType
                                        name="beeftype"
                                        id="beeftype"
                                    /*  disabled={!selecttype} */

                                    /*  onChange={(event) => SetBeeftypeChange(event.target.value)} */
                                    >
                                        <option>test</option>
                                    </SelectType>
                                </Formfilter>
                            </DivFromSearch>
                            <DivFromSearch>
                                <Formfilter>
                                    ทะเบียนขุน
                                    <Inputfilter
                                    /*  onChange={(event) => setnumcow(event.target.value)} */
                                    />
                                </Formfilter>
                            </DivFromSearch>
                            <DivFromSearch>
                                <Formfilter1 >
                                    ตำแหน่ง
                                    <FormfilterRoom>
                                        <SelectRoom
                                            name="roomname"
                                            id="roomname"
                                            style={{
                                                marginRight: "0px",
                                                borderRadius: "4px 0px 0px 4px",
                                            }}
                                        /* onChange={(event) => setselectbeefroom(event.target.value)} */
                                        >
                                            <option value="">ห้อง</option>
                                            {/* {dataroom &&
                                            dataroom.allRoom.map((prod) => (
                                                <option key={prod.id} value={prod.id}>
                                                    {prod.roomname}
                                                </option>
                                            ))} */}
                                        </SelectRoom>
                                        <SelectRoom
                                            name="shelfname"
                                            id="shelfname"
                                            /*  disabled={!selectedbeefroom} */
                                            style={{
                                                borderRadius: "0px",
                                                borderLeft: "none",
                                                borderRight: "none",
                                                margin: "0px",
                                            }}
                                        /*  onChange={(event) => setselectshelf(event.target.value)} */
                                        >
                                            <option value="">ชั้น</option>
                                            {/*  {datashelf &&
                                            datashelf.listShelf.map((prod) => (
                                                <option key={prod.id} value={prod.id}>
                                                    {prod.shelfname}
                                                </option>
                                            ))} */}
                                        </SelectRoom>
                                        <SelectRoom
                                            name="basket"
                                            id="basket"
                                            /*  disabled={!selectedbeefroom || !selectedshelf} */
                                            style={{

                                                borderRadius: "0px 4px 4px 0px",
                                                marginLeft: "0px"
                                            }}
                                        /*  onChange={(event) => setselectbasket(event.target.value)} */
                                        >
                                            <option value="">ตะกร้า</option>
                                            {/*  {basketdata &&
                                            basketdata.allBasket.map((prod) => (
                                                <option key={prod.id} value={prod.basketname}>
                                                    {prod.basketname}
                                                </option>
                                            ))} */}
                                        </SelectRoom>
                                    </FormfilterRoom>
                                </Formfilter1>
                            </DivFromSearch>
                            <DivFromSearch>
                                <Formfilter>
                                    วันหมดอายุ
                                    <Inputfilter type="date"
                                    /*  onChange={(event) => setnumcow(event.target.value)} */
                                    />
                                </Formfilter>
                            </DivFromSearch>
                            <DivFromSearch>
                                <Formfilter>
                                    เกรด
                                    <SelectType
                                        name="beeftype"
                                        id="beeftype"
                                    /*  disabled={!selecttype} */

                                    /*  onChange={(event) => SetBeeftypeChange(event.target.value)} */
                                    >
                                        <option>test</option>
                                    </SelectType>
                                </Formfilter>
                            </DivFromSearch>
                        </DivSearch>
                    </DivFromDown>
                </DivGrid>
                <DivData /* style={{ backgroundColor: "red" }} */>
                    {/*  <DivFrom> */}
                    <DivFromTop>รายการค้นหา</DivFromTop>
                    <DivFromDown>
                        <div style={{ height: "350px", overflow: "auto" }}>
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
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                        <td>we</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                        <div
                            style={{ marginTop: "5px", textAlign: "right" }}
                        >
                            จำนวนรายการ {/* {data ? data.liststore.length : "0"} */} รายการ
                            <br />
                            น้ำหนักอุ่น{" "}
                            {/*  {data && data.liststore.length > 0
                                ? data.liststore.reduce((sum, nex) => sum + nex.weightwarm, 0)
                                : "0"}{" "} */}
                            กิโลกรัม / น้ำหนักเย็น{" "}
                            {/* {data &&
                                data.liststore.reduce((sum, nex) => sum + nex.weight, 0)}{" "} */}
                            กิโลกรัม
                        </div>
                    </DivFromDown>
                    {/* </DivFrom> */}

                </DivData>
            </DivContainar>

        </div >
    )
}

export default Test
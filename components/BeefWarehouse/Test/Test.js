import React from 'react'
import styled from "styled-components";
import { DivBase } from '../../../utils/divBase';
import Nav from './Nav_store'
import { Table } from 'react-bootstrap';
import { DivFromTop, DivFromDown, DivFrom, DivBase1 } from './ImportFrom';




function Test() {
    return (
        <div>
            <button>กด กด</button>
        </div>

<<<<<<< HEAD
=======
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
>>>>>>> master
    )
}

export default Test
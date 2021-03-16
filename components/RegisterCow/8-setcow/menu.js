import React, { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Input,
} from "./ListcuttwoFrom";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { Form, Row, Col, Tab, Nav } from "react-bootstrap";

const Menu = ({ Sidenumber }) => {
  // const router = useRouter();
  // console.log(router.route);
  return (
    <>
      <DivFrom
        style={{
          width: "100%",
          marginTop: "0",
          gridRowStart: "2",
          gridRowEnd: "4",
          gridColumnStart: "2",
        }}
      >
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={list} />
          </div>
          รายการตั้งค่า{" "}
        </DivFromTop>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={Sidenumber}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    {/* <Link></Link> */}
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/registercow/setting/setpun">
                          <div style={{ width: "100%" }}>ตั้งค่าสายพันธุ์โค</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    {/* ------------------------------------------------------------------------ */}
{/* 
                    <Nav.Item
                      style={{ borderTop: "1px solid gray", paddingTop: "5px" }}
                    >

                    <Nav.Link eventKey="2">
                        <Link href="/registercow/setting/dise">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าข้อมูลโรค
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item> */}
                    {/* ------------------------------------------------------------------------ */}

                    <Nav.Item
                      style={{ borderTop: "1px solid gray", paddingTop: "5px" }}
                    >
                      <Nav.Link eventKey="3">
                        <Link href="/registercow/setting/">
                          <div style={{ width: "100%" }}>ตั้งค่าระยะการส่งเชือด</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="4">
                        <Link href="/registercow/setting/">
                          <div style={{ width: "100%" }}>ตั้งค่าแจ้งเตือน</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                      <Nav.Link eventKey="6">
                        <Link href="/slaughter/setting/bbe">
                          <div style={{ width: "100%" }}>วันหมดอายุ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="7">
                        <Link href="/slaughter/setting/create-lump">
                          <div style={{ width: "100%" }}>
                            เพิ่มข้อมูลชิ้นเนื้อ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item> */}
                    {/* <Nav.Item>
                      <Nav.Link eventKey="8">
                        <Link href="/slaughter/setting/delete-lump">
                          <div style={{ width: "100%" }}>ลบข้อมูลชิ้นเนื้อ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item> */}
                  </Nav>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </DivFromDown>
      </DivFrom>
    </>
  );
};

export default Menu;

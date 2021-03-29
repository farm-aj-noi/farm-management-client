import React, { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import {grid_1} from 'react-icons-kit/ikons/grid_1'
import {magnifying_glass} from 'react-icons-kit/ikons/magnifying_glass'

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
          gridRowEnd: "5",
          gridColumnStart: "2",
        }}
      >
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={grid_1} />
          </div>
          ประเภทรายงาน{" "}
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
                        <Link href="/registercow/report">
                          <div style={{ width: "100%" }}>รายงานรับโคเข้าขุน</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/registercow/report/cuttwo">
                          <div style={{ width: "100%" }}>รายงานรับโคเข้าขุนตามพื้นที่</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="3">
                        <Link href="/registercow/report/getto">
                          <div style={{ width: "100%" }}>รายงานโคเข้าเชือด</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="4">
                        <Link href="/registercow/report/quarter">
                          <div style={{ width: "100%" }}>รายการการรักษาโค</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    {/* <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="5">
                        <Link href="/registercow/report/lump">
                          <div style={{ width: "100%" }}>รายงานก้อนเนื้อ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="6">
                        <Link href="/registercow/report/chop">
                          <div style={{ width: "100%" }}>รายงานชิ้นเนื้อ</div>
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

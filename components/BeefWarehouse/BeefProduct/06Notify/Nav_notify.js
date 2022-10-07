import React from "react";

import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  Searchinput,
  Gobutton,
  Input,
} from "./NavFrom";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { Form, Row, Col, Tab, Nav } from "react-bootstrap";
import { menu3 } from 'react-icons-kit/icomoon/menu3'

const Nav_notify = (Sidenumber) => {
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
            <Icon size={25} icon={menu3} />
          </div>
          ประเภทการแจ้งเตือน
        </DivFromTop>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={Sidenumber}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/beefwarehouse/beefproduct/notify/notify_date">
                          <div style={{ width: "100%" }}>วันใกล้หมดอายุ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefproduct/notify/notify_exportrequest">
                          <div style={{ width: "100%" }}>คำร้องขอเบิก</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="4">
                        <Link href="/beefwarehouse/beefproduct/notify/notify_import">
                          <div style={{ width: "100%" }}>การนำเข้า</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="5">
                        <Link href="/beefwarehouse/beefproduct/notify/notify_export">
                          <div style={{ width: "100%" }}> การนำออก</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
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

export default Nav_notify;
/* <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="3">
                        <Link href="/beefwarehouse/beefstore/notify/notify_chill">
                          <div style={{ width: "100%" }}>ครบกำหนดบ่ม</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>  */

import React from "react";

import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
} from "./SettingFrom";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { menu3 } from 'react-icons-kit/icomoon/menu3'

const Nav_setting = (Sidenumber) => {
  return (
    <>
      <div
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
          รายการตั้งค่า
        </DivFromTop>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={Sidenumber}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/beefwarehouse/beefproduct/setting/">
                          <div style={{ width: "100%" }}>
                            ตั้งค่ารายการประเภทสินค้า
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefproduct/setting/date">
                          <div style={{ width: "100%" }}>
                            ตั้งค่าวันใกล้หมดอายุ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="3">
                        <Link href="/beefwarehouse/beefproduct/setting/room">
                          <div style={{ width: "100%" }}>
                            ตั่งค่าตู้แช่จัดเก็บ
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="4">
                        <Link href="/beefwarehouse/beefproduct/setting/freezer">
                          <div style={{ width: "100%" }}>ตั่งค่าชั้นจัดเก็บ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="5">
                        <Link href="/beefwarehouse/beefproduct/setting/shelf">
                          <div style={{ width: "100%" }}>ตั่งค่าตะกร้าจัดเก็บ</div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </DivFromDown>
      </div>
    </>
  );
};
///
export default Nav_setting;

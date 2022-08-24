import React from "react";

import Link from "next/link";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
} from "../ReportFrom";
import { Icon } from "react-icons-kit";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { menu3 } from 'react-icons-kit/icomoon/menu3'
const Nav_report = (Sidenumber) => {
  return (
    <>
      <DivFrom
        style={{
          width: "100%",
          marginTop: "0",
          gridRowStart: "2",
          gridRowEnd: "5",
          gridColumnStart: "2",
          height: "170px",
        }}
      >
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={25} icon={menu3} />
          </div>
          ประเภทออกรายงานคงคลัง
        </DivFromTop>
        <DivFromDown>
          <div style={{ margin: "auto", minWidth: "100%" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={Sidenumber}>
              <Row>
                <Col>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="1">
                        <Link href="/beefwarehouse/beefstore/report/store/report_store">
                          <div style={{ width: "100%" }}>
                            ออกรายงานคงคลังซากเนื้อโค
                          </div>
                        </Link>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item style={{ marginBottom: "5px" }}>
                      <Nav.Link eventKey="2">
                        <Link href="/beefwarehouse/beefstore/report/store/report_storeentrail">
                          <div style={{ width: "100%" }}>
                            ออกรายงานคงคลังชิ้นส่วนอื่น ๆ
                          </div>
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

export default Nav_report;

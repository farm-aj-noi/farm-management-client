import React, { useContext } from "react";

import { Navbar, Nav, DropdownButton, NavDropdown } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";

import Link from "next/link";
import Head from "next/head";

import { Logobeefstore } from "../../../../utils/image";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  Icon9,
  Icon10,
  Icon11,
  Icon12,
  Icon13,
} from "../../../../utils/naviconbeefstore";

import { blue, white } from "../../../../utils/colors";
import {
  NavButtonSigninComplete,
  NavButtonLeft,
  NavDropdownItem,
} from "./NavButton";

import MyCss from "./Nav.module.css";
import { AuthContext } from "../../../../appState/AuthProvider";

const Nav1 = () => {
  const { user, signout } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>ระบบคลังชิ้นเนื้อ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        style={{
          backgroundColor: `${blue}`,
          color: `${white}`,
          // padding: "0px 8px",
          // height: `${navbarHeight}px`,
          fontSize: "16px",
        }}
        collapseOnSelect
        expand="lg"
        /*  fixed="top" */
      >
        <Navbar.Brand style={{ padding: "0" }}>
          <Link href="/beefwarehouse">
            <a style={{ color: "white" }}>
              <p style={{ padding: "0 10px", display: "inline" }}>หน้าแรก</p>
            </a>
          </Link>
          <Link href="/beefwarehouse/beefstore">
            <a style={{ color: "white" }}>
              <Logobeefstore height="30px" weight="30px" />
              <p style={{ padding: "0 10px", display: "inline" }}>
                ระบบคลังชิ้นเนื้อ
              </p>
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/beefwarehouse/beefstore/chill">
              <NavButtonLeft>
                <Icon7 height="30px" weight="30px" />
                บ่มซากเนื้อโค
              </NavButtonLeft>
            </Link>
            <DropdownButton
              drop="down"
              title={
                <span>
                  <Icon12 height="30px" weight="30px" />
                  การนำเข้า
                </span>
              }
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefstore/import/import_halves">
                <NavDropdownItem>นำเข้าซากเนื้อโคผ่าซีก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_quarters">
                <NavDropdownItem>นำเข้าซากเนื้อโคสี่เสี้ยว</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_lumps">
                <NavDropdownItem>นำเข้าซากเนื้อโคก้อนเนื้อ</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_chops">
                <NavDropdownItem>นำเข้าซากเนื้อโคชื้นเนื้อ</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/import/import_entrails">
                <NavDropdownItem>นำเข้าซากเนื้อโคส่วนอื่น ๆ </NavDropdownItem>
              </Link>
            </DropdownButton>
            <DropdownButton
              drop="down"
              title={
                <span>
                  <Icon11 height="30px" weight="30px" />
                  การเบิกออก
                </span>
              }
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefstore/export/export_halves">
                <NavDropdownItem>เบิกออกซากเนื้อโคผ่าซีก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/export/export_quarters">
                <NavDropdownItem>เบิกออกซากเนื้อโคสี่เสี้ยว</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/export/export_lumps">
                <NavDropdownItem>เบิกออกซากเนื้อโคก้อนเนื้อ</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/export/export_chops">
                <NavDropdownItem>เบิกออกซากเนื้อโคชื้นเนื้อ</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/export/export_entrails">
                <NavDropdownItem>เบิกออกซากเนื้อโคส่วนอื่น ๆ </NavDropdownItem>
              </Link>
            </DropdownButton>
            <Link href="/beefwarehouse/beefstore/Allstore/store">
              <NavButtonLeft>
                <Icon9 height="30px" weight="30px" />
                คงคลัง
              </NavButtonLeft>
            </Link>

            <DropdownButton
              drop="down"
              title={
                <span>
                  <Icon3 height="30px" weight="30px" />
                  ออกรายงาน
                </span>
              }
              bsPrefix={MyCss.nstdropleft}
            >
              <Link href="/beefwarehouse/beefstore/report/report_chill">
                <NavDropdownItem>ออกรายงานการบ่มซาก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/import/report_halves">
                <NavDropdownItem>ออกรายงานการนำเข้า</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/export/report_halves">
                <NavDropdownItem>ออกรายงานเบิกออก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefstore/report/store/report_store">
                <NavDropdownItem>ออกรายงานคงคลัง</NavDropdownItem>
              </Link>
            </DropdownButton>
            <Link href="/beefwarehouse/beefstore/requestexport">
              <NavButtonLeft>
                <Icon2 height="30px" weight="30px" /> ร้องขอเบิก
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefstore/notify/notify_date">
              <NavButtonLeft>
                <Icon10 height="30px" weight="30px" /> การแจ้งเตือน
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefstore/graph">
              <NavButtonLeft>
                <Icon13 height="40px" weight="37px" /> รายละเอียดข้อมูลสถิติ
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefstore/setting/room">
              <NavButtonLeft>
                <Icon5 height="30px" weight="30px" /> การตั้งค่า
              </NavButtonLeft>
            </Link>
          </Nav>
          <Nav>
            {user && (
              <>
                <a style={{ margin: "auto 5px", textAlign: "left" }}>
                  สวัสดี {user.name}
                </a>

                <NavButtonSigninComplete onClick={signout}>
                  <Icon
                    style={{ verticalAlign: "text-bottom" }}
                    icon={shareSquareO}
                    size={25}
                  />{" "}
                  ออกจากระบบ
                </NavButtonSigninComplete>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nav1;

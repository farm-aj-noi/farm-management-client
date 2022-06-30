import React, { useContext } from "react";

import { Navbar, Nav, DropdownButton, NavDropdown } from "react-bootstrap";

import { Icon } from "react-icons-kit";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";

import Link from "next/link";
import Head from "next/head";

import { Logobeefstore } from "../../../../utils/image";

import { blue, white } from "../../../../utils/colors";
import {
  NavButtonSigninComplete,
  NavButtonLeft,
  NavDropdownItem,
} from "./NavButton";

import MyCss from "./Nav.module.css";
import { AuthContext } from "../../../../appState/AuthProvider";

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
  Icon14,
  Icon15,
  Icon16
} from "../../../../utils/naviconbeefstore";

const Nav1 = () => {
  const { user, signout } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>ระบบคลังผลิตภัณฑ์</title>
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
      >
        <Navbar.Brand style={{ padding: "0" }}>
          <Link href="/beefwarehouse">
            <a style={{ color: "white" }}>
              <p style={{ padding: "0 10px", display: "inline" }}>หน้าแรก</p>
            </a>
          </Link>
          <Link href="/beefwarehouse/beefproduct">
            <a style={{ color: "white" }}>
              <Logobeefstore height="30px" weight="30px" />
              <p style={{ padding: "0 10px", display: "inline" }}>
                ระบบคลังผลิตภัณฑ์
              </p>
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/beefwarehouse/beefproduct/imports">
              <NavButtonLeft>
                {" "}
                <Icon16 height="30px" weight="30px" /> แปรรูปสินค้า
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/imports">
              <NavButtonLeft>
                {" "}
                <Icon12 height="30px" weight="30px" /> การนำเข้า
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/exports">
              <NavButtonLeft>
                {" "}
                <Icon11 height="30px" weight="30px" /> การเบิกออก
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/store">
              <NavButtonLeft>
                {" "}
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
              <Link href="/beefwarehouse/beefproduct/report/report_import">
                <NavDropdownItem>ออกรายงานการนำเข้า</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefproduct/report/report_export">
                <NavDropdownItem>ออกรายงานเบิกออก</NavDropdownItem>
              </Link>
              <Link href="/beefwarehouse/beefproduct/report/report_store">
                <NavDropdownItem>ออกรายงานคงคลัง</NavDropdownItem>
              </Link>
            </DropdownButton>
            <Link href="/beefwarehouse/beefproduct/requestexport">
              <NavButtonLeft>
                <Icon2 height="30px" weight="30px" /> ร้องขอเบิก
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/notify/notify_date">
              <NavButtonLeft>
                <Icon10 height="30px" weight="30px" />
                การแจ้งเตือน
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/transport">
              <NavButtonLeft>
                <Icon14 height="30px" weight="30px" /> บันทึกการขนส่ง
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/graph">
              <NavButtonLeft>
                <Icon13 height="40px" weight="37px" /> รายละเอียดข้อมูลสถิติ
              </NavButtonLeft>
            </Link>
            <Link href="/beefwarehouse/beefproduct/setting/">
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

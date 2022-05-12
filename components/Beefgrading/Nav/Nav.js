import React, { useContext } from "react";
import { Navbar, Nav, DropdownButton, NavDropdown } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Head from "next/head";
import { Icon3, Icon2, Icon4, Icon5 } from "../../../utils/Logograde";
import {
  NavButtonSigninComplete,
  NavButtonLeft,
  NavDropdownItem,
} from "./NavButton";
import { blue, white } from "../../../utils/colors";
import { Logobeefgrade} from "../../../utils/image";
import { navbarHeight } from "../../../utils/sizes";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";
import MyCss from "./Nav.module.css";

import { AuthContext } from "../../../appState/AuthProvider";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Nav1 = () => {
  const { user, signout } = useContext(AuthContext);
  // console.log(user);

  return (
    <>
      <Head>
        <title>ระบบตัดเกรดชิ้นเนื้อ</title>
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
          <Link href="/beefgrading">
            <a style={{ color: "white" }}>
              <Logobeefgrade height="30px" weight="30px" />
              <p style={{ padding: "0 10px", display: "inline" }}>ระบบตัดเกรดชิ้นเนื้อ</p>
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

          {(user.role.nameEN === "booster"||
              user.role.nameEN === "slaughter"||
              user.role.nameEN === "accounter" ||
              user.role.nameEN === "admin") && (
              <>
            <Link href="/slaughter/alert">
               <Icon3 height="30px" weight="30px" /> 
              <NavButtonLeft>รายการซากโค</NavButtonLeft>
            </Link>
            </>
            )}

            {(user.role.nameEN === "booster" ||
              user.role.nameEN === "admin") && (
              <>
                

                <Link href="/slaughter/getin">
                  <NavButtonLeft>รับโคเข้าเชือด</NavButtonLeft>
                </Link>
                <Link href="/slaughter/listslaughter">
                  <NavButtonLeft>รายการเชือด</NavButtonLeft>
                </Link>

                <DropdownButton
                  drop="down"
                  title={`เชือดโค`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/slaughter/slaughter">
                    <NavDropdownItem>ซากโค</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/entrails">
                    <NavDropdownItem>เครื่องใน</NavDropdownItem>
                  </Link>
                </DropdownButton>
              </>
            )}

            {(user.role.nameEN === "grade" || user.role.nameEN === "admin") && (
              <>
                <Link href="/slaughter/grade">
                  <NavButtonLeft>ตัดเกรด</NavButtonLeft>
                </Link>
              </>
            )}

            {(user.role.nameEN === "storer" ||
              user.role.nameEN === "admin") && (
              <>
                <DropdownButton
                  drop="down"
                  title={`ส่งตัดแต่ง`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/slaughter/senttwo">
                    <NavDropdownItem>ซากโคผ่าซีก</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/sentfour">
                    <NavDropdownItem>ซากโคผ่าสี่เสี้ยว</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/sentlump">
                    <NavDropdownItem>ก้อนเนื้อ</NavDropdownItem>
                  </Link>
                </DropdownButton>
              </>
            )}

            {(user.role.nameEN === "slaughter" ||
              user.role.nameEN === "admin") && (
              <>
                <DropdownButton
                  drop="down"
                  title={`รายการตัดแต่ง`}
                  bsPrefix={MyCss.nstdropleft}
                >
                  <Link href="/slaughter/listcuttwo">
                    <NavDropdownItem>ซากโคผ่าซีก</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/listcutfour">
                    <NavDropdownItem>ซากโคผ่าสี่เสี้ยว</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/listcutother">
                    <NavDropdownItem>ก้อนเนื้อ</NavDropdownItem>
                  </Link>
                </DropdownButton>

                <DropdownButton
                  drop="down"
                  title={`ตัดแต่งเนื้อ`}
                  bsPrefix={MyCss.nstdropleft}
                  className={MyCss.dropdownmenu}
                >
                  <Link href="/slaughter/cuttwo">
                    <NavDropdownItem>ซากโคผ่าซีก</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/cutfour">
                    <NavDropdownItem>ซากโคผ่าสี่เสี้ยว</NavDropdownItem>
                  </Link>
                  <Link href="/slaughter/cutother">
                    <NavDropdownItem>ก้อนเนื้อ</NavDropdownItem>
                  </Link>
                </DropdownButton>
              </>
            )}

            {(user.role.nameEN === "accounter" ||
              user.role.nameEN === "admin") && (
              <>
                <Link href="/slaughter/buy">
                  <NavButtonLeft>จัดการราคาชื้อ</NavButtonLeft>
                </Link>
              </>
            )}

            {(user.role.nameEN === "transporter" ||
              user.role.nameEN === "admin") && (
              <>
                <Link href="/slaughter/transport">
                  <NavButtonLeft>บันทึกการขนส่ง</NavButtonLeft>
                </Link>
              </>
            )}

            <Link href="/slaughter/tracking">
              <NavButtonLeft>ตรวจสอบสินค้าย้อนกลับ</NavButtonLeft>
            </Link>

            {user.role.nameEN === "admin" && (
              <>
                <Link href="/slaughter/trace">
                  <NavButtonLeft>ติดตามสินค้า</NavButtonLeft>
                </Link>
                <Link href="/slaughter/report">
                  <NavButtonLeft>รายงาน</NavButtonLeft>
                </Link>
                <Link href="/slaughter/setting">
                  <NavButtonLeft>ตั้งค่า</NavButtonLeft>
                </Link>
              </>
            )}
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

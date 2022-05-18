import React, { useContext } from "react";
import { Navbar, Nav, DropdownButton, NavDropdown } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Head from "next/head";
import { ButtonSignUp } from "./ButtonRight";
import {
  NavButtonSigninComplete,
  NavButtonLeft,
  NavDropdownItem,
} from "./NavButton";
import { blue, white } from "../../../utils/colors";
import { Logobeefgrade } from "../../../utils/image";
import { navbarHeight } from "../../../utils/sizes";
import { shareSquareO } from "react-icons-kit/fa/shareSquareO";
import MyCss from "./Nav.module.css";
import { Icon3, Icon2, Icon4, Icon5, Icon1 } from "../../../utils/Logograde";
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
        <Link href="/beefgrading">
        <ButtonSignUp
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "9px",
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
              }}
          >
            <Logobeefgrade height="50px" weight="50px" />
            </div>
            ระบบการตัดเกรดเนื้อโค
          </ButtonSignUp>
          </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/beefgrading/list">
            <ButtonSignUp
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "9px",
                }}
              >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "5px",
                }}
              >
            <Icon3 height="30px" weight="30px" />
            </div>
              รายการซากโค
          </ButtonSignUp>
          </Link>
          <Link href="/beefgrading/list">
          <ButtonSignUp 
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "9px",
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
              }}
            >
          <Icon2 height="30px" weight="30px" />
            สรุปเกรดเนื้อโค
          </div>
          </ButtonSignUp>
          </Link>
          <Link href="/beef_store/exports">
          <ButtonSignUp
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "9px",
              
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
              }}
            >
          </div>
          <Icon4 height="30px" weight="30px" />
          ประวัติการตัดเกรด
          </ButtonSignUp>
          </Link>
          <Link href="/beefwarehouse/beefproduct/notify/notify_date">
          <ButtonSignUp
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "9px",
              
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
            }}
          >
          </div>
          <Icon5 height="30px" weight="30px" />
          การตั้งค่า
          </ButtonSignUp>
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

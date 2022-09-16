import React, { useContext } from "react";
import Link from "next/link";

import { white, blue } from "../../utils/colors";
import { LogoFarmAll, LogoSluagther, Logoregister, Logobeefstore, Logobeefgrade, LogoSale } from "../../utils/image";
import { LinkSt } from "./LinkOtherPage";

import { AuthContext } from "../../appState/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <>
      <div
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <LogoFarmAll height="300px" weight="300px" />
        <div
          style={{
            backgroundColor: `${white}`,
            width: "fit-content",
            margin: "auto",
            marginTop: 5,
            marginBottom: 5,
            fontSize: "x-large",
            padding: "0 40px 0 40px",
          }}
        >
          ระบบจัดการฟาร์ม : Farm management system
        </div>
        {user && (
          <div
            style={{
              backgroundColor: `${blue}`,
              width: "100%",
              margin: "auto",
              marginTop: 25,
              marginBottom: 5,
              fontSize: "x-large",
            }}
          >
            {/* <Link href="/registercow">
              <LinkSt>
                <Logoregister height="150px" weight="150px" />
                ลงทะเบียนโคเข้าขุน
              </LinkSt>
            </Link>
            <Link href="/registercow">
              <LinkSt>
                <Logoregister height="150px" weight="150px" />
                ลงทะเบียนโคเข้าขุน
              </LinkSt>
            </Link>
            <Link href="/registercow">
              <LinkSt>
                <Logoregister height="150px" weight="150px" />
                ลงทะเบียนโคเข้าขุน
              </LinkSt>
            </Link>
            <Link href="/registercow">
              <LinkSt>
                <Logoregister height="150px" weight="150px" />
                ลงทะเบียนโคเข้าขุน
              </LinkSt>
            </Link>
            <Link href="/registercow">
              <LinkSt>
                <Logoregister height="150px" weight="150px" />
                ลงทะเบียนโคเข้าขุน
              </LinkSt>
            </Link> */}
            {user.role.nameEN === "admin" && (
              <>
                <Link href="/registercow">
                  <LinkSt>
                    <Logoregister height="150px" weight="150px" />
                    ลงทะเบียนโคเข้าขุน
                  </LinkSt>
                </Link>
                <Link href="/slaughter">
                  <LinkSt>
                    <LogoSluagther height="150px" weight="150px" />
                    ระบบเชือด
                  </LinkSt>
                </Link>
                <Link href="/beefwarehouse">
                  <LinkSt style={{ paddingTop: "5px" }}>
                    <Logobeefstore height="160px" weight="155px" />
                    ระบบคลัง
                  </LinkSt>
                </Link>
                <Link href="/beefgrading">
                  <LinkSt>
                    <Logobeefgrade height="150px" weight="150px" />
                    ระบบตัดเกรดชิ้นเนื้อ
                  </LinkSt>
                </Link>
                <Link href="/saleonline">
                  <LinkSt>
                    <LogoSale height="150px" weight="150px" />
                    ระบบการขายออนไลน์
                  </LinkSt>
                </Link>
              </>
            )}
            {(user.role.nameEN === "beefstore_man") && (
              <Link href="/beefwarehouse/beefstore">
                <LinkSt style={{ paddingTop: "5px" }}>
                  <Logobeefstore height="160px" weight="155px" />
                  ระบบคลัง
                </LinkSt>
              </Link>
            )}
            {(
              user.role.nameEN === "productstore_man") && (
                <Link href="/beefwarehouse/beefproduct">
                  <LinkSt style={{ paddingTop: "5px" }}>
                    <Logobeefstore height="160px" weight="155px" />
                    ระบบคลัง
                  </LinkSt>
                </Link>
              )}
          </div>
        )}

      </div>
    </>
  );
};

export default Home;

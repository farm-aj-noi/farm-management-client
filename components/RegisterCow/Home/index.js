import React, { useContext } from "react";
import Link from "next/link";

import { white, blue } from "../../../utils/colors";
import { LogoFarmAll, Logoregister } from "../../../utils/image";
import { LinkSt } from "./LinkOtherPage";

import { AuthContext } from "../../../appState/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);

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
        <Logoregister height="300px" weight="300px" />
        <div
          style={{
            backgroundColor: `${blue}`,
            color:"white",
            width: "fit-content",
            margin: "auto",
            marginTop: 5,
            marginBottom: 5,
            fontSize: "x-large",
            padding: "0 40px 0 40px",
          }}
        >
          ระบบลงทะเบียนรับโคเข้าขุนและโคเข้าเชือด : Register and Slaughter System
        </div>
        {/* <div
          style={{
            backgroundColor: `${blue}`,
            width: "100%",
            margin: "auto",
            marginTop: 25,
            marginBottom: 5,
            fontSize: "x-large",
          }}
        >
          <Link href="/">
            <LinkSt>
              <LogoFarmAll height="150px" weight="150px"/>
              ระบบจัดการฟาร์ม
            </LinkSt>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default Home;

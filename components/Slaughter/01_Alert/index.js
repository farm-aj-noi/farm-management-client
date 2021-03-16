import React, { useContext } from "react";
import { Icon } from "react-icons-kit";

import { dashboard } from "react-icons-kit/fa/dashboard";
import { DivBase } from "../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown } from "./AlertFrom";
import Card0 from "./CartAlert/Card0";
import Card1 from "./CartAlert/Card1";
import Card1_5 from "./CartAlert/Card1_5";
import Card1_75 from "./CartAlert/Card1_75";
import Card2 from "./CartAlert/Card2";
import Card3 from "./CartAlert/Card3";
import Card4 from "./CartAlert/Card4";
import Card5 from "./CartAlert/Card5";

import { AuthContext } from "../../../appState/AuthProvider";
// import Footer from "../../Footer/index";

const Index = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={dashboard} />
            </div>
            แจ้งเตือน
          </DivFromTop>
          <DivFromDown
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridRowGap: "20px",
            }}
          >
            {/* ใส่ card */}
            <Card0 />
            {user.role.nameEN === "booster" ? (
              <>
                <Card1 />
                <Card1_5 />
                <Card1_75 />
              </>
            ) : user.role.nameEN === "slaughter" ? (
              <>
                <Card2 />
                <Card3 />
                <Card4 />
              </>
            ) : user.role.nameEN === "accounter" ? (
              <Card5 />
            ) : user.role.nameEN === "admin" ? (
              <>
                <Card1 />
                <Card1_5 />
                <Card1_75 />
                <Card2 />
                <Card3 />
                <Card4 />
                <Card5 />
              </>
            ) : (
              ""
            )}
          </DivFromDown>
        </DivFrom>
        {/* <Footer/> */}
      </DivBase>
    </>
  );
};

export default Index;

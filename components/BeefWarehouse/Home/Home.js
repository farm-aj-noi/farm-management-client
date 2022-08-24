import React, { useContext } from "react";

import { AuthContext } from "../../../appState/AuthProvider";

import { white, blue } from "../../../utils/colors";
import { Logobeefstore } from "../../../utils/image";
import { ButtonStore, ButtonProduct } from "./OtherPage";

import Link from "next/link";

const Home = () => {
  const { user } = useContext(AuthContext);
  /* console.log(user); */
  return (
    <div
      style={{
        margin: "auto",
        width: "100%",
        textAlign: "center",
        marginTop: 20,
      }}
    >
      <Logobeefstore height="400px" weight="400px" />
      <div
        style={{
          backgroundColor: `${white}`,
          width: "fit-content",
          margin: "auto",
          marginTop: 5,
          marginBottom: "40px",
          fontSize: "50px",
          padding: "0 40px 0 40px",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        ระบบคลังชิ้นเนื้อและคลังผลิตภัณฑ์ : Meat & Beef Product Warehouse System
      </div>
      <div>
        <Link href="/beefwarehouse/beefstore">
          <ButtonStore>คลังชิ้นเนื้อ / <h style={{ fontSize: "36px" }}>Beef Warehouse</h></ButtonStore>
        </Link>
        <Link href="/beefwarehouse/beefproduct">
          <ButtonProduct>คลังผลิตภัณฑ์ / <h style={{ fontSize: "36px" }}>Product Warehouse</h></ButtonProduct>
        </Link>
      </div>
    </div>
  );
};

export default Home;

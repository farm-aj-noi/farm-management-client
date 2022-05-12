import React, { useContext } from "react";
import { Logobeefgrade } from "../../../utils/image";
import { DivCenter } from "../Styleclass/Table";
import { AuthContext } from "../../../appState/AuthProvider";
import Link from "next/link";
import { BorderRadius, ButtonSignIn} from "../Styleclass/Radius"; 
import { Icon } from "react-icons-kit";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div style={{
      margin: "auto",
      width: "100%",
      textAlign: "center",
      marginTop: 20,
    }}>
      
        <Logobeefgrade height="400px" weight="400px" ></Logobeefgrade>
      
  
    <DivCenter style={{ marginTop: "20px" }}>
    <BorderRadius style={{  height: "400px", width: "1100px"}}> 
      <h1 style={{ color: "white", fontSize: "80px", fontWeight:"bold", height: "150px" }}>Beef Quality Grading System</h1>
      <h1 style={{  color: "white", fontSize: "60px", height: "175px"  }}>ระบบการตัดเกรดเนื้อโค</h1>
    </BorderRadius>
    <div style={{ position: "absolute",top: "750px"}}>
          <Link href="/beef_store/list">
            <ButtonSignIn>
              เริ่มการตัดเกรด
            </ButtonSignIn>
          </Link>
      </div>
    </DivCenter>
    </div>
  );
};

export default Home;

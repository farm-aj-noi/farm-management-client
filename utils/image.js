import React from "react";
import Logo from "../images/logo/logoindex.png";
import LogoSt from "../images/logo/Logo-Slaughter.png"
import Logoregis from "../images/logo/logo-register.png"
export const LogoFarmAll = (prop) => {
  return (
    <img
      src={Logo}
      width={prop.weight}
      height={prop.height}
      style={{ display: "inline", marginRight: "8px" }}
    />
  );
};

export const LogoSluagther = (prop) => {
  return (
    <img
      src={LogoSt}
      width={prop.weight}   
      height={prop.height}
      style={{ display: "inline", marginRight: "auto"}}
    />
  );
};
export const Logoregister = (prop) => {
  return (
    <img
      src={Logoregis}
      width={prop.weight}
      height={prop.height}
      style={{ display: "inline", marginRight: "auto"}}
    />
  );
};

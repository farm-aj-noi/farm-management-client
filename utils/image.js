import React from "react";
import Logo from "../images/logo/logoindex.png";
import LogoSt from "../images/logo/Logo-Slaughter.png"
import Logoregis from "../images/logo/logo-register.png"
import Logotest from "../images/logo/logo-test.jpg"
import LogoStore from "../images/logo/logo-store.png"

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
export const Logotest2 = (prop) => {
  return (
    <img
      src={Logotest}
      width={prop.weight}
      height={prop.height}
      style={{ display: "inline", marginRight: "auto"}}
    />
  );
};
export const Logobeefstore = (prop) => {
  return (
    <img
      src={LogoStore}
      width={prop.weight}
      height={prop.height}
      style={{ display: "inline", marginRight: "auto"}}
    />
  );
};
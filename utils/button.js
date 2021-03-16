import styled from "styled-components";

import { Icon } from "react-icons-kit";

import { save } from "react-icons-kit/fa/save";
import { edit } from "react-icons-kit/fa/edit";
import {remove} from 'react-icons-kit/fa/remove'
import {barcode} from 'react-icons-kit/icomoon/barcode'

// import { Savebuttoncolor, Editbuttoncolor,Removebuttoncolor } from "./buttonColor";

export const Savebutton = () => {
  return (
      <Icon size={20} icon={save} />
  );
};

export const Editbutton = () => {
  return (
      <Icon size={20} icon={edit} />
  );
};

export const Removebutton = () => {
  return (
      <Icon size={20} icon={remove} />
  );
};

export const Barcodebutton = () => {
  return (
      <Icon size={20} icon={barcode} />
  );
};

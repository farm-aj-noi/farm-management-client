import React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { paste } from "react-icons-kit/icomoon/paste";
import { DivCenter } from "../Styleclass/Table";
import { Icon10 } from "../../../utils/Logograde";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const thstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "10px",
  fontSize: "18px",
};

const tdstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "5px",
  fontSize: "14px",
};


function index() {
/*   const { data, loading, error } = useQuery(LISTGRADE); */
  /* console.log(data); */
  return (
    <div>
      <DivCenter
        style={{
          fontSize: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5px",
          }}
        ></div>
        <Icon10 height="70px" weight="70px" />
        รายการซากโค
      </DivCenter>

    </div>
  );
}

export default index;

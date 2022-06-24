import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
    DivFrom,
    DivFromTop,
    DivFromDown,
    HeaderColor,
    Searchinput,
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import {
    Savebuttoncolor,
    Editbuttoncolor,
    Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import {
    Removebutton,
    Editbutton,
    Savebutton,
} from "../../../../../utils/button";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Router from "next/router";


const listfreezer = () => {
    const [edit, setedit] = useState(false);
    return (
        <tr style={{ textAlign: "center" }}>
            <td></td>
            <td></td>
            <td> {edit ? (
                <Savebuttoncolor /* onClick={handleSubmit} */>
                    <Savebutton />
                </Savebuttoncolor>
            ) : (
                <Editbuttoncolor onClick={() => setedit(true)}>
                    <Editbutton />
                </Editbuttoncolor>
            )}
            </td>
            <td> <Removebuttoncolor /* onClick={handdleSubmitDelete} */>
                <Removebutton />
            </Removebuttoncolor>
            </td>
        </tr>
    )
}

export default listfreezer
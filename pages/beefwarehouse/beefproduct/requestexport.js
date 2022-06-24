import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../utils/background";
import Requestexport from "../../../components/BeefWarehouse/BeefProduct/09Requestexport/"
import Footer from "../../../components/BeefWarehouse/Footer";

const requestexport = () => {
    return (
        <BackgroundStore><Nav /> <Requestexport /><Footer /></BackgroundStore>
    )
}

export default requestexport
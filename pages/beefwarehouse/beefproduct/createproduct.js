import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Createbeefproduct from "../../../components/BeefWarehouse/BeefProduct/11Createbeefproduct"
import { BackgroundStore } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";

const createproduct = () => {
    return (
        <BackgroundStore>
            <Nav />
            <Createbeefproduct />
            <Footer />
        </BackgroundStore>
    )
}

export default createproduct
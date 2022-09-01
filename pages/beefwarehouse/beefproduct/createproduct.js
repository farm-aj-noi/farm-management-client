import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Createbeefproduct from "../../../components/BeefWarehouse/BeefProduct/11Createbeefproduct"
import { BackgroundProduct } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";

const createproduct = () => {
    return (
        <BackgroundProduct>
            <Nav />
            <Createbeefproduct />
            <Footer />
        </BackgroundProduct>
    )
}

export default createproduct
import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../utils/background";
import Transport from "../../../components/BeefWarehouse/BeefProduct/12Transport"
import Footer from "../../../components/BeefWarehouse/Footer";

const transport = () => {
    return (
        <BackgroundProduct>
            <Nav />
            <Transport />
            <Footer />
        </BackgroundProduct>
    )
}

export default transport
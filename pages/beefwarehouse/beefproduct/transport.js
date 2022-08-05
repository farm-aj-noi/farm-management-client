import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../utils/background";
import Transport from "../../../components/BeefWarehouse/BeefProduct/12Transport"
import Footer from "../../../components/BeefWarehouse/Footer";

const transport = () => {
    return (
        <BackgroundStore>
            <Nav />
            <Transport />
            <Footer />
        </BackgroundStore>
    )
}

export default transport
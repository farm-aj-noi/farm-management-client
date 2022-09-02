import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../utils/background";
import Requestexport from "../../../components/BeefWarehouse/BeefProduct/09Requestexport/"
import Footer from "../../../components/BeefWarehouse/Footer";

const requestexport = () => {
    return (
        <BackgroundProduct
        ><Nav />
            <Requestexport />
            <Footer />
        </BackgroundProduct>
    )
}

export default requestexport
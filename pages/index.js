import React, { useContext } from "react";
import json from '../json/provinces.json'

import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/index";
import Home from "../components/Home/Home";
import { BackgroundFarmAll } from "../utils/background";
// import {get_provinces,get_amphures,get_districts,get_zipcodes} from '../graphql/query/address'
import { fn } from "moment";


// import PageLayout from "../components/PageLayout";

// import {useEffect} from "react";
// import Router from 'next/router';
// useEffect(() => {
//   const handleRouteChange = url => {
//     console.log('App is changing to: ', url);
//   };

//   Router.events.on('routeChangeStart', handleRouteChange);
//   return () => {
//     Router.events.off('routeChangeStart', handleRouteChange);
//   };
// }, []);

const  HomePage =  ()  => {
  // try {
    // let data = get_provinces();
    // console.log(data);
    // let param = {
    //   province_id: ''
    // }
    // let data2 = get_amphures(param)
    // console.log(data2)
    // let param2 = {
    //   province_id: '',
    //   amphur_id: ''
    // }
    // let data3 = get_districts(param2)
    // console.log(data3)
    // let param3 = {
    //   district_code: ''
    // }
    // let data4 = get_zipcodes(param3)
    // console.log(data4)
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <BackgroundFarmAll>
      <Nav />

      <Home />
      {/* <Footer/> */}
    </BackgroundFarmAll>
  );
};

export default HomePage;
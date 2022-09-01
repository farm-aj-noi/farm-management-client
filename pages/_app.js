// import App from 'next/app'
import { useRouter } from "next/router";

import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import cookie from "cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "../font/font.css";

import PageLayout from "../components/PageLayout";
import AuthProvider from "../appState/AuthProvider";
import apolloClient from "../apollo/apolloClient";

import "../global style/style.css";
import "react-day-picker/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import Router from "next/router";
import LoadingPage from "../helps/LoadingPage";

//import Footer from "../components/Footer/index";
// import { ThemeProvider } from "styled-components";

// const theme = {
//   colors: {
//     primary: "#0070f3",
//   },
// };

const QUERY_USER = {
  query: `
    query {
      user {
        id
        name
        email
        passsport
        district
        province
        amphur
        zipcode
        numaccount
        role{
          nameEN
          nameTH
        }
      }
    }
  `,
};

// const QUERY_USER = {
//   query: `
//   query User {
//     user {
//       id
//       name
//       role {
//         nameTH
//         nameEN
//       }
//       email
//     }
//   }

//   `,
// };

function MyApp({ Component, pageProps, apollo, user }) {
  // console.log("User : ",user)
  const [loading, setLoading] = useState(false);
  // const router = useRouter()
  // if (router.isFallback) {
  //   return <LoadingPage/>
  // }

  console.log("weqwe");

  Router.events.on("routeChangeStart", (url) => {
    // console.log(`Loading: ${url}`);
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    // <ThemeProvider theme={theme}>
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <div style={{ fontFamily: "db_adman_xregular" }}>
          {/* <PageLayout> */}
          {loading && <LoadingPage />}
          <Component {...pageProps} />
          {/* </PageLayout> */}
        </div>
      </AuthProvider>
    </ApolloProvider>
    // </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  // console.log(ctx.req.headers)
  // console.log("Router : ",router)
  const { headers } = ctx.req;

  const cookies = headers && cookie.parse(headers.cookie || "");

  const token = cookies && cookies.jwt;
  console.log(token);

  // Route Protection

  // Route Beefstore
  if (!token) {
    if (
      router.pathname === "/beefwarehouse" ||
      router.pathname === "/beefwarehouse/beefstore" ||
      router.pathname === "/beefwarehouse/beefstore/chill" ||
      router.pathname === "/beefwarehouse/beefstore/import/import_halves" ||
      router.pathname === "/beefwarehouse/beefstore/import/import_quarters" ||
      router.pathname === "/beefwarehouse/beefstore/import/import_lumps" ||
      router.pathname === "/beefwarehouse/beefstore/import/import_chops" ||
      router.pathname === "/beefwarehouse/beefstore/import/import_entrails" ||
      router.pathname === "/beefwarehouse/beefstore/export/export_halves" ||
      router.pathname === "/beefwarehouse/beefstore/export/export_quarters" ||
      router.pathname === "/beefwarehouse/beefstore/export/export_lumps" ||
      router.pathname === "/beefwarehouse/beefstore/export/export_chops" ||
      router.pathname === "/beefwarehouse/beefstore/export/export_entrails" ||
      router.pathname === "/beefwarehouse/beefstore/Allstore/store" ||
      router.pathname === "/beefwarehouse/beefstore/Allstore/storeentrail" ||
      router.pathname === "/beefwarehouse/beefstore/report/report_chill" ||
      router.pathname === "/beefwarehouse/beefstore/report/import/report_halves" ||
      router.pathname === "/beefwarehouse/beefstore/report/import/report_quarters" ||
      router.pathname === "/beefwarehouse/beefstore/report/import/report_lumps" ||
      router.pathname === "/beefwarehouse/beefstore/report/import/report_chops" ||
      router.pathname === "/beefwarehouse/beefstore/report/import/report_entrails" ||
      router.pathname === "/beefwarehouse/beefstore/report/export/report_halves" ||
      router.pathname === "/beefwarehouse/beefstore/report/export/report_quarters" ||
      router.pathname === "/beefwarehouse/beefstore/report/export/report_lumps" ||
      router.pathname === "/beefwarehouse/beefstore/report/export/report_chops" ||
      router.pathname === "/beefwarehouse/beefstore/report/export/report_entrails" ||
      router.pathname === "/beefwarehouse/beefstore/report/store/report_store" ||
      router.pathname === "/beefwarehouse/beefstore/report/store/report_storeentrail" ||
      router.partname === "/beefwarehouse/beefstore/requestexport" ||
      router.partname === "/beefwarehouse/beefstore/notify/notify_date" ||
      router.partname === "/beefwarehouse/beefstore/notify/notify_exportrequest" ||
      router.partname === "/beefwarehouse/beefstore/notify/notify_import" ||
      router.partname === "/beefwarehouse/beefstore/notify/notify_export" ||
      router.partname === "/beefwarehouse/beefstore/transport" ||
      router.partname === "/beefwarehouse/beefstore/graph" ||
      router.partname === "/beefwarehouse/beefstore/setting/room" ||
      router.partname === "/beefwarehouse/beefstore/setting/sheif" ||
      router.partname === "/beefwarehouse/beefstore/setting/basket" ||
      router.partname === "/beefwarehouse/beefstore/setting/chillroom" ||
      router.partname === "/beefwarehouse/beefstore/setting/date"
    ) {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
  }
  // Route Beefproduct
  if (!token) {
    if (
      router.pathname === "/beefwarehouse/beefproduct" ||
      router.pathname === "/beefwarehouse/beefproduct/createproduct" ||
      router.pathname === "/beefwarehouse/beefproduct/imports" ||
      router.pathname === "/beefwarehouse/beefproduct/exports" ||
      router.pathname === "/beefwarehouse/beefproduct/store" ||
      router.pathname === "/beefwarehouse/beefproduct/report/report_import" ||
      router.pathname === "/beefwarehouse/beefproduct/report/report_export" ||
      router.pathname === "/beefwarehouse/beefproduct/report/report_store" ||
      router.pathname === "/beefwarehouse/beefproduct/requestexport" ||
      router.pathname === "/beefwarehouse/beefproduct/notify/notify_date" ||
      router.pathname === "/beefwarehouse/beefproduct/notify/notify_exportrequest" ||
      router.pathname === "/beefwarehouse/beefproduct/notify/notify_import" ||
      router.pathname === "/beefwarehouse/beefproduct/notify/notify_export" ||
      router.pathname === "/beefwarehouse/beefproduct/notify/notify_export" ||
      router.pathname === "/beefwarehouse/beefproduct/tracking/[trackingId]" ||
      router.pathname === "/beefwarehouse/beefproduct/transport" ||
      router.pathname === "/beefwarehouse/beefproduct/trace" ||
      router.pathname === "/beefwarehouse/beefproduct/trace/[trackingId]" ||
      router.pathname === "/beefwarehouse/beefproductgraph" ||
      router.pathname === "/beefwarehouse/beefproduct/setting" ||
      router.pathname === "/beefwarehouse/beefproduct/setting/date" ||
      router.pathname === "/beefwarehouse/beefproduct/setting/room" ||
      router.pathname === "/beefwarehouse/beefproduct/setting/freezer" ||
      router.pathname === "/beefwarehouse/beefproduct/setting/shelf"
    ) {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
  }




  if (!token) {
    if (router.pathname === "/cart") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/manageProduct") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/alert") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/getin") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listslaughter") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/slaughter") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/entrails") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listcuttwo") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listcutfour") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listother") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/cuttwo") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/cutfour") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/cutother") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/buy") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (
      router.pathname === "/slaughter/sell" ||
      router.pathname === "/slaughter/importcow" ||
      router.pathname === "/slaughter/food" ||
      router.pathname === "/slaughter/treat" ||
      router.pathname === "/slaughter/toslaughter" ||
      router.pathname === "/slaughter/grade" ||
      router.pathname === "/slaughter/senttwo" ||
      router.pathname === "/slaughter/sentfour" ||
      router.pathname === "/slaughter/sentlump" ||
      router.pathname === "/slaughter/transport" ||
      router.pathname === "/slaughter/tracking" ||
      router.pathname === "/slaughter/tracking/[trackingId]" ||
      router.pathname === "/slaughter/trace" ||
      router.pathname === "/slaughter/trace/[trackingId]" ||
      router.pathname === "/slaughter/report" ||
      router.pathname === "/slaughter/setting" ||
      router.pathname === "/slaughter/report/cuttwo" ||
      router.pathname === "/slaughter/report/entrail" ||
      router.pathname === "/slaughter/report/quarter" ||
      router.pathname === "/slaughter/report/lump" ||
      router.pathname === "/slaughter/report/chop" ||
      router.pathname === "/slaughter/setting/info-quarter" ||
      router.pathname === "/slaughter/setting/price-quarter" ||
      router.pathname === "/slaughter/setting/info-lump" ||
      router.pathname === "/slaughter/setting/price-lump" ||
      router.pathname === "/slaughter/setting/bbe" ||
      router.pathname === "/slaughter/setting/create-lump" ||
      router.pathname === "/slaughter/setting/delete-lump" ||
      ////////////////////////////////////////////////////
      router.pathname === "/registercow" ||
      router.pathname === "/registercow/importcow" ||
      router.pathname === "/registercow/historyfoods" ||
      router.pathname === "/registercow/listtreat" ||
      router.pathname === "/registercow/listregiscow" ||
      router.pathname === "/registercow/showlisttreat" ||
      router.pathname === "/registercow/export" ||
      router.pathname === "/registercow/listdead" ||
      router.pathname === "/registercow/druganddise" ||
      router.pathname === "/registercow/diseanddrug" ||
      router.pathname === "/registercow/report" ||
      router.pathname === "/registercow/report/cuttwo" ||
      router.pathname === "/registercow/report/getto" ||
      router.pathname === "/registercow/report/quarter" ||
      router.pathname === "/registercow/setting/setpun" ||
      router.pathname === "/registercow/alert" ||
      router.pathname === "/registercow/importfarmcow" ||
      router.pathname === "/registercow/listfarmmer" ||
      router.pathname === "/registercow/listtreatfarm" ||
      router.pathname === "/registercow/listsluagerfarm" ||
      router.pathname === "/registercow/listfarmmerweitting"
    ) {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    return null;
  }
  // Route Protection /slaughter
  if (token) {
    if (router.pathname === "/signin") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
    if (router.pathname === "/signup") {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
    }
  }

  // const response = await fetch("https://demo-1983-ser.herokuapp.com/graphql", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${token}` || "",
  //   },
  //   body: JSON.stringify(QUERY_USER),
  // });

  console.log(JSON.stringify(QUERY_USER));

  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || "",
    },
    body: JSON.stringify(QUERY_USER),
  });

  console.log(response);

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return { user: result.data.user };
  } else {
    // Route Protection
    if (router.pathname === "/cart") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/manageProduct") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/alert") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/getin") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listslaughter") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/slaughter") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/entrails") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listcuttwo") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listcutfour") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/listother") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/cuttwo") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/cutfour") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/cutother") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (router.pathname === "/slaughter/buy") {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    if (
      router.pathname === "/slaughter/sell" ||
      router.pathname === "/slaughter/importcow" ||
      router.pathname === "/slaughter/food" ||
      router.pathname === "/slaughter/treat" ||
      router.pathname === "/slaughter/toslaughter" ||
      router.pathname === "/slaughter/grade" ||
      router.pathname === "/slaughter/senttwo" ||
      router.pathname === "/slaughter/sentfour" ||
      router.pathname === "/slaughter/sentlump" ||
      router.pathname === "/slaughter/transport" ||
      router.pathname === "/slaughter/tracking" ||
      router.pathname === "/slaughter/tracking/[trackingId]" ||
      router.pathname === "/slaughter/trace" ||
      router.pathname === "/slaughter/trace/[trackingId]" ||
      router.pathname === "/slaughter/report" ||
      router.pathname === "/slaughter/setting" ||
      router.pathname === "/slaughter/report/cuttwo" ||
      router.pathname === "/slaughter/report/entrail" ||
      router.pathname === "/slaughter/report/quarter" ||
      router.pathname === "/slaughter/report/lump" ||
      router.pathname === "/slaughter/report/chop" ||
      router.pathname === "/slaughter/setting/info-quarter" ||
      router.pathname === "/slaughter/setting/price-quarter" ||
      router.pathname === "/slaughter/setting/info-lump" ||
      router.pathname === "/slaughter/setting/price-lump" ||
      router.pathname === "/slaughter/setting/bbe" ||
      router.pathname === "/slaughter/setting/create-lump" ||
      router.pathname === "/slaughter/setting/delete-lump" ||
      /////////////////////////////////////////////////////////
      router.pathname === "/registercow" ||
      router.pathname === "/registercow/importcow" ||
      router.pathname === "/registercow/historyfoods" ||
      router.pathname === "/registercow/listtreat" ||
      router.pathname === "/registercow/listregiscow" ||
      router.pathname === "/registercow/showlisttreat" ||
      router.pathname === "/registercow/export" ||
      router.pathname === "/registercow/listdead" ||
      router.pathname === "/registercow/druganddise" ||
      router.pathname === "/registercow/diseanddrug" ||
      router.pathname === "/registercow/report" ||
      router.pathname === "/registercow/report/cuttwo" ||
      router.pathname === "/registercow/report/getto" ||
      router.pathname === "/registercow/report/quarter" ||
      router.pathname === "/registercow/setting/setpun" ||
      router.pathname === "/registercow/alert" ||
      router.pathname === "/registercow/importfarmcow" ||
      router.pathname === "/registercow/listfarmmer" ||
      router.pathname === "/registercow/listtreatfarm" ||
      router.pathname === "/registercow/listsluagerfarm" ||
      router.pathname === "/registercow/listfarmmerweitting"
    ) {
      ctx.res.writeHead(302, { Location: "/signin" });
      ctx.res.end();
    }
    return null;
  }
  // calls page's `getInitialProps` and fills `appProps.pageProps`
};

export default apolloClient(MyApp);

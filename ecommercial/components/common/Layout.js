import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title ? title + "" : "EcomFloor"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon " href="/favicon.ico" />
      </Head>
      {/* Header */}

      <Header />
      {/* Header */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

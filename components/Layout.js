import Head from "next/head";
import React, { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import AuthModal from "./AuthModal";

import Header from "./Header/Header";

export default function Layout({ title, children }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);

  return (
    <>
      <Head>
        <title>{title ? title + " - MIU Market" : "MIU Market"}</title>
        <meta name="description" content="Ecommerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      {/* <div className=" container"> */}
        <div className="flex min-h-screen flex-col justify-between">
          <Header setIsAuthModalOpen={setIsAuthModalOpen} />

          <main className="  relative z-1">{children}</main>

          <footer
            className="container "
            
          >
            <div className="flex-col flex   justify-center items-center  shadow-inner  relative z-0 bg-primary " >
              <Footer />

              <p className="bg-white py-8 pl-56">Copyright © 2023</p>
            </div>
          </footer>
        </div>
      {/* </div> */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          isLogin={isLoginModal}
          setIsLogin={setIsLoginModal}
        />
      )}
    </>
  );
}

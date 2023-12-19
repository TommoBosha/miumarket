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

      <div className="flex min-h-screen flex-col ">
        <Header setIsAuthModalOpen={setIsAuthModalOpen} />

        <main className="  relative z-1">{children}</main>

        <footer className="w-full bg-primary ">
          <div className="flex-col flex    justify-center items-center    relative z-0  ">
            <Footer />
            <div className="bg-white w-full">
              <p className="container  py-[13px] md:py-[16px] xl:py-[25px]  ">
                Copyright © 2023
              </p>
            </div>
          </div>
        </footer>
      </div>

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

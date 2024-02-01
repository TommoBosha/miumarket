import { useEffect, useState } from "react";

import Image from "next/image";
import { signIn } from "next-auth/react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  async function login() {
    await signIn("google");
  }

  useEffect(() => {
    if (!isVisible) {
      onClose();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  function handleClickOutside(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const backdropStyle = {
    visibility: isVisible ? "visible" : "hidden",
    opacity: isVisible ? "1" : "0",
    transition: "visibility 0s, opacity 0.3s linear",
  };

  

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0  bg-black w-full h-full bg-opacity-50 z-50"
          style={backdropStyle}
          onClick={handleClickOutside}
        >
          <div
            className={`fixed  transform-cpu transition-opacity mx-auto  my-auto top-0 bottom-0  right-0 left-0  md:w-[410px] h-menu md:h-fit  w-[332px]  z-[100] bg-graybg rounded-[20px] ${isVisible ? 'modalAnimation' : ''} `}
          
          >
            <button className="closeButton " onClick={onClose}>
              <Image
                src="/images/close.svg"
                width={20}
                height={20}
                alt="logo"
                className="  opacity-20"
              />
            </button>

            <div className="scrollableContent ">
              {isLogin ? (
                <LoginScreen setIsVisible={setIsVisible} />
              ) : (
                <RegisterScreen setIsVisible={setIsVisible} />
              )}

              <p className="mb-[15px] text-center text-base font-semibold">
                Увійти через обліковий запис:
              </p>

              <div className="mb-[14px] flex items-center justify-center">
                <button
                  className="flex items-center  rounded-3xl bg-white py-[10px] pl-[15px] pr-[24px]  text-blue-600 "
                  onClick={login}
                >
                  <Image
                    src={"/images/google.svg"}
                    alt="uzor"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Google
                </button>
              </div>
              <p className=" w-[214px] mx-auto text-center mb-10">
                {isLogin
                  ? "Не маєте облікового запису? "
                  : "Вже маєте обліковий запис? "}
                <span
                  className="authSwitch font-semibold underline"
                  style={{ color: "#3ACCE9" }}
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Зареєструватися" : "Увійти"}
                </span>
              </p>
            </div>
            <Image
              src={"/images/white-modal.svg"}
              alt="uzor"
              width={451}
              height={108}
              className=" absolute rounded-2xl right-0 bottom-0 -z-10 rounded-b-[20px] opacity-[0.2]  "
            />
          </div>
        </div>
      )}
    </>
  );
}

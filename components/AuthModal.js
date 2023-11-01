import { useEffect, useState } from "react";
import LoginScreen from "../pages/login";
import RegisterScreen from "../pages/register";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(true);



    async function login() {
        await signIn('google');
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

    return (
        <>
            {isVisible && (
                <div className='modalBackdrop' onClick={handleClickOutside}>
                    <div className='modalContent'>
                        <button className='closeButton ' onClick={onClose}>
                            <Image
                                src="/images/close.svg"
                                width={30}
                                height={30}
                                alt="logo"
                                className="  opacity-20"
                            />
                        </button>

                        <div className="scrollableContent">
                            {isLogin ? <LoginScreen setIsVisible={setIsVisible} /> : <RegisterScreen setIsVisible={setIsVisible} />}



                            <p className="mb-6 text-center text-base font-semibold">Увійти через обліковий запис:</p>

                            <div className='mb-7 flex items-center justify-center'>
                                <button

                                    className='flex items-center mx-8 rounded-3xl bg-white py-3 px-10  text-blue-600 '
                                    onClick={login}
                                >

                                    <Image
                                        src={'/images/google.svg'}
                                        alt="uzor"
                                        width={24}
                                        height={24}
                                        className='mr-2'

                                    />
                                    Google
                                </button>
                            </div>
                            <p className=" text-center mb-20">
                                {isLogin
                                    ? "Не маєте облікового запису? "
                                    : "Вже маєте обліковий запис? "}
                                <span
                                    className='authSwitch underline'
                                    style={{ color: '#3ACCE9' }}
                                    onClick={() => setIsLogin(!isLogin)}>
                                    {isLogin ? "Зареєструватися" : "Увійти"}
                                </span>
                            </p>

                        </div>
                        <Image
                            src={'/images/white.svg'}
                            alt="uzor"
                            width={451}
                            height={108}
                            className=" absolute rounded-2xl left-0 -bottom-16 z-10   "
                        />
                    </div>

                </div>
            )}

        </>
    );
}
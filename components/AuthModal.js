import { useEffect, useState } from "react";
import LoginScreen from "../pages/login";
import RegisterScreen from "../pages/register";
import Image from "next/image";

export default function AuthModal({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(true);


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
                        <button className='closeButton' onClick={onClose}>
                            <Image
                                src="/images/close.svg"
                                width={30}
                                height={30}
                                alt="logo"
                            />
                        </button>
                        {isLogin ? <LoginScreen /> : <RegisterScreen setIsVisible={setIsVisible} />}
                        <p>
                            {isLogin
                                ? "Не маєте облікового запису? "
                                : "Вже маєте обліковий запис? "}
                            <span className='authSwitch' onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Зареєструватися" : "Увійти"}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
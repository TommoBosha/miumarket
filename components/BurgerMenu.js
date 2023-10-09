// import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';



const BurgerMenu = ({ navbar, setNavbar }) => {


    const [showParentCategories, setShowParentCategories] = useState(false);
    const [isEscKeyPressed, setIsEscKeyPressed] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const [setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);



    function fetchCategories() {
        axios.get("/api/categories/")
            .then((result) => {
                const categoriesWithoutParent = result.data.filter(category => !category.parent);
                setCategories(categoriesWithoutParent);
                setShowCatalog(true);
            });
    }

    const burgerMenuRef = useRef(null);


    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            setIsEscKeyPressed(true);
        }
    };

    const handleCatalogClick = () => {
        if (!showParentCategories) {
            fetchCategories();
        }
        setShowParentCategories(!showParentCategories);
        setShowCatalog(true);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        setNavbar(false);
    };


    const handleBurgerMenuClick = (e) => {
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(e.target)) {
            setNavbar(false);
        }
    };

    useEffect(() => {

        window.addEventListener("keydown", handleKeyPress);

        window.addEventListener("click", handleBurgerMenuClick);
        if (isEscKeyPressed) {
            setNavbar(false);
            setIsEscKeyPressed(false);
        }

        return () => {

            window.removeEventListener("keydown", handleKeyPress);
            window.removeEventListener("click", handleBurgerMenuClick);
        };
    }, [isEscKeyPressed]);


    return (
        <div
        >
            <div
                className={` flex-1 justify-self-center mt-8 block rounded-b-2xl pb-6  ${navbar ? 'p-0  block' : 'hidden'
                    }`}
                style={{
                    position: 'fixed',
                    left: navbar ? '0' : '-100%',
                    backgroundColor: '#F4F4F4',
                    transition: 'left 0.3s ease',
                }}
            >

                <ul className="text-left h-auto  justify-center flex  flex-col px-6 pb-32 w-72">
                    <li
                        className="  text-black mb-7 px-2 custom-li items-center" >
                        <Link
                            href="/"
                            onClick={() => setNavbar(!navbar)}
                            className='flex flex-row gap-2 uppercase text-base'
                            style={{ fontWeight: '600' }}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                <path d="M0.152344 12.3783L12.1526 0.378081C12.6568 -0.126027 13.4743 -0.126027 13.9785 0.378081L25.9788 12.3783H23.3961V22.7089C23.3961 23.4221 22.818 24.0002 22.1048 24.0002H15.6482V14.961H10.4829V24.0002H4.02631C3.31313 24.0002 2.73499 23.4221 2.73499 22.7089V12.3783H0.152344Z" fill="black" />
                            </svg>
                            Головна
                        </Link>
                    </li>

                    <li className=" text-black mb-7 px-2  custom-li" onClick={handleCatalogClick}>
                        <a className='flex flex-row gap-2 uppercase text-base'
                            style={{ fontWeight: '600' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 23 20" fill="none">
                                <path d="M17.6535 19.6948H1.10152C0.808644 19.6978 0.526997 19.5822 0.320623 19.3744C0.114249 19.1666 0.00069036 18.8841 0.00577116 18.5913H-0.00195312V3.14273C-0.00195312 1.92387 0.986126 0.935791 2.20498 0.935791H8.8258C9.07227 0.936026 9.31156 1.01877 9.50553 1.17083L12.0259 3.14273H17.6535C18.8724 3.14273 19.8605 4.13081 19.8605 5.34967V9.76354H20.964C21.3349 9.76358 21.681 9.94997 21.8851 10.2597C22.0893 10.5693 22.1242 10.9609 21.978 11.3018L18.6676 19.0261C18.4937 19.4317 18.0949 19.6948 17.6535 19.6948ZM5.14021 11.9705L2.77548 17.4878H16.9264L19.2911 11.9705H5.14021ZM2.20498 5.34967V13.2174L3.39783 10.4322C3.57172 10.0266 3.97058 9.76359 4.41192 9.76354H17.6535V5.34967H2.20498Z" fill="black" />
                            </svg>
                            {showCatalog
                                ? " Каталог"
                                : "Каталог"}</a>
                    </li>

                    {showParentCategories ? (
                        // Отображение родительских категорий
                        <ul>
                            {categories.map((cat) => (
                                // Добавьте обработчик клика на категорию
                                <li key={cat._id}
                                    onClick={() => handleCategoryClick(cat)}
                                    className='custom-category-li mb-4  '
                                    style={{ color: '#38C2DD' }}
                                >
                                    <Link
                                        href={`/catalog/${cat.name}`}
                                        className='flex flex-row px-9 uppercase text-base'
                                        style={{ fontWeight: '600', }}
                                    >{cat.name}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : null}





                    <li className="  text-black mb-7 px-2 custom-li">
                        <Link
                            href="/#about"
                            onClick={() => setNavbar(!navbar)}
                            className='flex flex-row gap-2 uppercase text-base items-center'
                            style={{ fontWeight: '600' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path d="M12.1479 23.0533C5.97381 23.0533 0.96875 18.0482 0.96875 11.8742C0.96875 5.70013 5.97381 0.695068 12.1479 0.695068C18.3219 0.695068 23.327 5.70013 23.327 11.8742C23.3202 18.0454 18.3191 23.0465 12.1479 23.0533ZM12.1479 2.93089C7.20862 2.93089 3.20457 6.93494 3.20457 11.8742C3.20457 16.8134 7.20862 20.8175 12.1479 20.8175C17.0871 20.8175 21.0912 16.8134 21.0912 11.8742C21.0856 6.93724 17.0848 2.93644 12.1479 2.93089ZM12.1479 18.5817C10.3816 18.6116 8.71208 17.7768 7.67622 16.3458C7.17325 15.6732 6.79465 14.916 6.55831 14.11H17.7374C17.7374 14.11 17.7374 14.11 17.7374 14.119C17.4974 14.9207 17.1191 15.6744 16.6195 16.3458C15.5835 17.7766 13.9141 18.6114 12.1479 18.5817ZM8.23518 11.8742C7.30907 11.8742 6.55831 11.1234 6.55831 10.1973C6.55831 9.27121 7.30907 8.52045 8.23518 8.52045C9.16129 8.52045 9.91205 9.27121 9.91205 10.1973C9.91205 11.1234 9.16129 11.8742 8.23518 11.8742ZM16.0527 11.8585C15.1309 11.8585 14.3837 11.1113 14.3837 10.1895C14.3837 9.26771 15.1309 8.52045 16.0527 8.52045C16.9745 8.52045 17.7218 9.26771 17.7218 10.1895C17.7205 11.1108 16.974 11.8573 16.0527 11.8585Z" fill="black" />
                            </svg>
                            Про нас
                        </Link>
                    </li>
                    <li className="  text-black mb-7 px-2  custom-li">
                        <Link
                            href="/contacts"
                            onClick={() => setNavbar(!navbar)}
                            className='flex flex-row gap-2 uppercase text-base'
                            style={{ fontWeight: '600' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 26" fill="none">
                                <path d="M3.31913 10.1739C4.0894 13.8362 6.01341 17.1809 8.79765 19.6895L11.9778 17.8553C12.3751 17.6268 12.8491 17.657 13.208 17.888C14.3689 18.6527 15.6788 19.2501 17.0956 19.6321C17.7271 19.8024 18.097 20.4453 17.9267 21.0769L16.8527 25.0598C16.6824 25.6913 16.0394 26.0612 15.4079 25.8909C4.72247 23.0095 -1.60225 12.0145 1.27909 1.32912C1.44939 0.697553 2.09802 0.329245 2.72389 0.498013L6.70674 1.57199C7.33831 1.7423 7.70815 2.38524 7.53785 3.0168C7.15582 4.43356 7.01366 5.86617 7.09103 7.25421C7.11034 7.68056 6.89809 8.10551 6.50077 8.33406L3.31913 10.1739Z" fill="black" />
                            </svg>
                            Контакти
                        </Link>
                    </li>
                    <li className="  text-black mb-7 px-2  custom-li ">
                        <Link
                            href="/delivery"
                            onClick={() => setNavbar(!navbar)}
                            className='flex flex-row gap-2 uppercase text-base items-center'
                            style={{ fontWeight: '600' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 24 20" fill="none">
                                <path d="M21.5937 19.3609H3.26041C1.99476 19.3609 0.96875 18.3163 0.96875 17.0276V3.02766C0.96875 1.739 1.99476 0.694336 3.26041 0.694336H21.5937C22.8593 0.694336 23.8853 1.739 23.8853 3.02766V17.0276C23.8853 18.3163 22.8593 19.3609 21.5937 19.3609ZM3.26041 10.0276V17.0276H21.5937V10.0276H3.26041ZM3.26041 3.02766V5.36098H21.5937V3.02766H3.26041ZM13.5729 14.6943H5.55206V12.361H13.5729V14.6943Z" fill="black" />
                            </svg>
                            Доставка та оплата
                        </Link>
                    </li>
                    <li className="  text-black mb-7 px-2  custom-li ">
                        <Link
                            href="/partners"
                            onClick={() => setNavbar(!navbar)}
                            className='flex flex-row gap-2 uppercase text-base items-center'
                            style={{ fontWeight: '600' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 27 21" fill="none">
                                <path d="M8.64914 8.81442C10.9171 8.81442 12.754 6.97238 12.754 4.70958C12.754 2.44165 10.9171 0.604736 8.64914 0.604736C6.38122 0.604736 4.5443 2.44165 4.5443 4.70958C4.5443 6.97238 6.38122 8.81442 8.64914 8.81442ZM8.64914 10.8668C5.91429 10.8668 0.439453 12.2368 0.439453 14.9717V17.0241H16.8588V14.9717C16.8588 12.2368 11.384 10.8668 8.64914 10.8668Z" fill="black" />
                                <path d="M8.14844 19.5739V20.0739H8.64844H25.0678H25.5678V19.5739V17.5215C25.5678 16.6542 25.1298 15.9319 24.5087 15.3589C23.8911 14.789 23.0601 14.3337 22.1743 13.9793C20.4034 13.2708 18.2879 12.9167 16.8581 12.9167C15.4284 12.9167 13.3128 13.2708 11.542 13.9793C10.6562 14.3337 9.82514 14.789 9.20755 15.3589C8.58648 15.9319 8.14844 16.6542 8.14844 17.5215V19.5739ZM16.8581 11.8642C19.4026 11.8642 21.463 9.79792 21.463 7.25939C21.463 4.71532 19.4022 2.65454 16.8581 2.65454C14.3141 2.65454 12.2533 4.71532 12.2533 7.25939C12.2533 9.79792 14.3137 11.8642 16.8581 11.8642Z" fill="black" stroke="#F4F4F4" />
                            </svg>
                            Партнерам
                        </Link>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default BurgerMenu;


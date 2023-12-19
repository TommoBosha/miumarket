import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

export default function Footer() {
    const [categories, setCategories] = useState([]);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const imageSrc = isMobile ? "/images/blue-mobile.svg" : "/images/blue.svg";
    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        axios.get("/api/categories/")
            .then((result) => {
                const categoriesWithoutParent = result.data.filter(category => !category.parent);
                setCategories(categoriesWithoutParent);
            })
            .catch((error) => {
                console.error('Ошибка при выполнении запроса:', error);
            });
    }

    return (
        <div className=" py-8 container" 

        >

            <div
                className="grid grid-cols-footermobile md:grid-cols-footer xl:grid-cols-footerxl  gap-5 md:gap-[73px] xl:gap-[138px]   "

            >
      
                <div>
                <ul className="mx-0 ">
                    <li>
                        <Link href={"/"} >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="112"
                                height="44"
                                viewBox="0 0 227 89"
                                fill="none"
                                className="md:w-[163px] xl:w-[210px] md:h-[63px] xl:h-[82px]"
                            >
                                <path
                                    d="M88.6046 68.4826L77.6568 56.749L88.1815 44.3912L77.6568 32.0335L88.6046 20.2999H76.8165V12.2164H80.7596V7.67721H76.2289V11.6277H68.2898V0L56.5957 10.9801L44.2964 0.423895L32.003 10.9801L20.3148 0V11.6277H12.3757V7.67721H7.84501V12.2164H11.7881V20.2999H0L10.9713 32.4633L0.611147 44.3853L11.0006 56.3427L0 68.4826H11.7881V76.5661H7.84501V80.9169H12.3757V77.1548H20.3148V88.7825L32.0147 77.8024L44.3023 88.3586L56.5957 77.8024L68.2957 88.7825V77.1548H76.2347V80.9169H80.7654V76.5661H76.8224V68.4826H88.6105H88.6046ZM77.4041 8.8547H79.5843V11.0389H77.4041V8.8547ZM11.2004 11.0389H9.0203V8.8547H11.2004V11.0389ZM11.2004 79.7394H9.0203V77.7435H11.2004V79.7394ZM77.4041 77.7435H79.5843V79.7394H77.4041V77.7435ZM78.6558 44.3971L73.414 50.6201H65.8335L60.4507 44.3971L65.8335 38.1682H73.414L78.6558 44.3971ZM58.4586 32.1925H61.385L51.8417 43.1254H47.5755L58.4586 32.1925ZM57.6535 29.1546V11.61L67.1145 2.72588V21.4832H85.8956L77.0398 30.9738L59.6339 31.015H57.6535V29.1546ZM56.4782 30.3379L45.7773 41.0884V36.8436L56.4782 27.4295V30.3379ZM38.2731 15.4251L44.3963 10.1735L50.5137 15.4251V23.0257L44.3963 28.401L38.2731 23.0257V15.4251ZM32.1264 27.4295L43.0682 37.0614V41.1119L32.1264 30.1672V27.4237V27.4295ZM41.2524 43.1313H36.9803L27.6662 32.1984H30.3223L41.2524 43.1313ZM2.70903 21.4774H21.4959V2.71999L30.957 11.6041V31.0091H30.2106L11.5648 30.9679L2.70903 21.4774ZM10.1486 44.297L15.5196 38.1623H23.1119L28.3478 44.297L23.1119 50.4317H15.5196L10.1486 44.297ZM30.9511 58.0442V77.1842L21.49 86.0625V67.3051H2.70903L11.5648 57.8087L30.6808 57.7675H30.957V58.0442H30.9511ZM30.3223 56.5959H27.6662L36.8334 45.8337H41.0526L30.3223 56.5959ZM32.1264 58.6329L43.0682 47.6352V51.727L32.1264 61.3588V58.627V58.6329ZM50.5137 73.381L44.3963 78.6267L38.2731 73.381V65.7803L44.3963 60.3933L50.5137 65.7803V73.381ZM56.4782 61.3706L45.7773 51.9566V47.6529L56.4782 58.3445V61.3706ZM47.7929 45.8337H51.9828L61.3792 56.6077H58.5702L47.7929 45.8337ZM67.1145 67.311V86.0684L57.6535 77.1901V57.7793H59.7514L77.0398 57.8205L85.8956 67.3169H67.1145V67.311Z"
                                    fill="white"
                                />
                                <path
                                    d="M116.653 42.0599L116.329 33.682C116.229 31.0562 116.13 27.8711 116.13 24.6919H116.03C115.342 27.4826 114.425 30.6029 113.567 33.1698L110.882 41.7066H106.974L104.612 33.2287C103.889 30.6677 103.131 27.5532 102.608 24.6919H102.543C102.408 27.6415 102.32 31.0209 102.144 33.7527L101.744 42.0657H97.1194L98.5238 20.188H105.182L107.344 27.4885C108.032 30.0259 108.725 32.7518 109.213 35.3129H109.313C109.936 32.7754 110.694 29.8905 111.411 27.459L113.773 20.1822H120.302L121.518 42.0599H116.629L116.641 42.0481L116.653 42.0599ZM137.731 36.4432H131.402L129.822 42.0599H124.639L131.391 20.1822H137.949L144.801 42.0599H139.424L137.72 36.4432H137.725H137.731ZM132.119 32.74H137.008L135.628 28.1008C135.228 26.7996 134.846 25.1747 134.511 23.8795H134.446C134.123 25.1806 133.788 26.8291 133.43 28.1008L132.119 32.74ZM148.75 41.9657V20.4765C150.589 20.188 152.981 20.0232 155.502 20.0232C159.697 20.0232 162.418 20.7709 164.557 22.3605C166.855 24.0502 168.3 26.7466 168.3 30.6088C168.3 34.7948 166.761 37.6855 164.628 39.4694C162.301 41.3828 158.757 42.2953 154.426 42.2953C151.841 42.2953 149.995 42.1305 148.755 41.9715V41.9598L148.75 41.9657ZM153.756 24.0149V38.3272C154.179 38.4273 154.873 38.4273 155.496 38.4273C160.021 38.4626 162.97 35.9899 162.97 30.7619C163.006 26.2109 160.308 23.8147 156.019 23.8147C154.902 23.8147 154.179 23.9148 153.756 24.0149ZM198.364 20.188H203.377V42.0657H198.364V20.188ZM213.29 42.0657H208.701V20.188H214.536L219.126 28.2008C220.436 30.5028 221.752 33.2346 222.734 35.7014H222.834C222.51 32.8107 222.41 29.8611 222.41 26.5759V20.1763H227V42.054H221.752L217.028 33.6173C215.717 31.28 214.277 28.454 213.196 25.893L213.096 25.9283C213.231 28.819 213.296 31.904 213.296 35.4777V42.0657H213.29ZM97.1311 46.134H102.144V58.7331C102.144 62.4951 103.589 64.4085 106.146 64.4085C108.702 64.4085 110.212 62.5952 110.212 58.7331V46.134H115.201V58.4092C115.201 65.1621 111.758 68.3767 105.987 68.3767C100.216 68.3767 97.1311 65.327 97.1311 58.3504V46.1398V46.134ZM119.514 68.0117V46.134H124.468V55.807H124.568C125.062 54.9592 125.585 54.1821 126.072 53.4049L131.085 46.1281H137.22L129.904 55.442L137.608 68.0058H131.773L126.36 58.5564L124.456 60.8584V67.9999H119.503V68.0117H119.514ZM139.67 68.0117V46.4224C141.275 46.1634 143.672 45.9691 146.328 45.9691C149.613 45.9691 151.899 46.4578 153.48 47.6941C154.791 48.7303 155.507 50.2552 155.507 52.2687C155.507 55.0593 153.504 56.9786 151.605 57.6557V57.7557C153.145 58.368 153.997 59.834 154.555 61.8416C155.243 64.3085 155.936 67.1698 156.36 68.0058H151.247C150.889 67.3935 150.366 65.6037 149.707 62.9072C149.12 60.1814 148.168 59.4337 146.135 59.4042H144.63V68.0058H139.676L139.67 68.0117ZM145.083 49.7959V55.8364H147.051C149.543 55.8364 151.018 54.6001 151.018 52.6867C151.018 50.6732 149.637 49.6605 147.345 49.637C146.129 49.637 145.441 49.7371 145.083 49.8018V49.7959ZM170.874 62.395H164.545L162.97 68.0117H157.782L164.534 46.134H171.092L177.944 68.0117H172.567L170.863 62.395H170.868H170.874ZM165.262 58.6919H170.151L168.771 54.0526C168.371 52.7514 167.989 51.1265 167.654 49.8313H167.589C167.266 51.1324 166.931 52.7809 166.573 54.0526L165.262 58.6919ZM180.911 46.1281H185.924V68.0058H180.911V46.1281ZM194.856 68.0058H190.266V46.1281H196.102L200.691 54.1409C202.002 56.4428 203.318 59.1746 204.299 61.6415H204.399C204.076 58.7507 203.976 55.8011 203.976 52.5159V46.1163H208.566V67.994H203.318L198.593 59.5573C197.283 57.22 195.843 54.394 194.762 51.833L194.662 51.8683C194.797 54.759 194.862 57.8441 194.862 61.4177V68.0058H194.856ZM226.048 54.7296V58.7566H217.915V63.9552H226.994V68.0175H212.891V46.1398H226.994V50.2022H217.915V54.7532H226.048V54.7355V54.7296ZM184.978 28.8072V32.8342H176.845V38.0328H185.924V42.0952H171.82V20.2175H185.924V24.2798H176.845V28.8308H184.978V28.8131V28.8072Z"
                                    fill="white"
                                />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <p className="mt-5 text-[12px] leading-[12.5px] ">
                        Купуючи сувеніри з категорії Military, ви допомагаєте наблизити перемогу ЗСУ.
                        <br/> <br/>
                         10% з кожного сувеніру ми направляємо на вироблення зарядних станцій для Збройних Сил України.
                        </p>
                        
                    </li>
                </ul>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3  gap-x-[18px] gap-y-[12px] mt-[8px]">
                    <ul className="">

                        <h2 className="primary-footer-text mb-1">КАТАЛОГ</h2>


                        {categories.map((cat) => (

                            <li key={cat._id}

                                className='text-[12px] leading-[12px] mb-1  '

                            >
                                <Link
                                    href={`/catalog/${cat._id}`}


                                >{cat.name}</Link>
                            </li>
                        ))}

                    </ul>

                    <ul className="order-3 md:order-2">
                        <h2 className="primary-footer-text mb-1">ІНФОРМАЦІЯ</h2>
                        <li className="text-[12px] leading-[12px] mb-1">
                            <Link href={"/contacts"}>Контакти</Link>
                        </li>
                        <li className="text-[12px] leading-[12px] mb-1">
                            <Link href={"/delivery"}>Доставка та оплата</Link>
                        </li>
                        <li className="text-[12px] leading-[12px] mb-1">
                            <Link href={"/#about"}>Про нас</Link>
                        </li>
                        <li className="text-[12px] leading-[12px] mb-1">
                            <Link href={"/partners"}>Партнерам</Link>
                        </li>
                    </ul>

                    <ul className="md:order-3 ">
                        <h2 className="primary-footer-text mb-1">СОЦМЕРЕЖІ</h2>
                        <li className="flex items-center text-[12px] leading-[12px] mb-1">
                            <Link
                                href={"https://www.youtube.com/@Made.in.Ukraine2023"}
                                className="flex items-center justify-center"
                                target="_blank"
                            >
                                {" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="12"
                                    viewBox="0 0 18 12"
                                    fill="none"
                                >
                                    <path
                                        d="M9.47773 12C7.21955 11.9611 5.35549 11.9348 3.49142 11.8936C3.0221 11.8833 2.55097 11.8467 2.08525 11.7878C1.33914 11.6934 0.861995 11.2278 0.632146 10.6014C0.390263 9.94244 0.18749 9.24743 0.128524 8.55585C0.0208194 7.29626 -0.022503 6.02637 0.0111922 4.76335C0.0412772 3.62674 0.126719 2.48155 0.60507 1.40558C0.965487 0.593878 1.57501 0.190031 2.51847 0.136833C6.39643 -0.0811076 10.275 0.0167081 14.1535 0.0573217C14.6529 0.0624699 15.1512 0.133973 15.6512 0.153421C16.5694 0.190031 17.0856 0.707139 17.4051 1.45763C17.7589 2.28821 17.8973 3.16512 17.9388 4.05175C17.984 5.01218 18.0122 5.97489 17.9948 6.93532C17.9737 8.06849 17.8949 9.20281 17.5002 10.2862C17.0898 11.412 16.5236 11.8089 15.2763 11.8478C13.2131 11.9119 11.1493 11.9565 9.47773 11.9994V12ZM7.22858 2.88197V9.07468C8.92176 8.04046 10.5734 7.03199 12.2829 5.98805C10.5764 4.93953 8.93259 3.92877 7.22858 2.88197Z"
                                        fill="white"
                                    />
                                </svg>{" "}
                                <p className="ml-1">Youtube</p>
                            </Link>
                        </li>
                        <li className="flex items-center text-[12px] leading-[12px] mb-1">
                            <Link
                                href={"https://www.facebook.com/profile.php?id=100094715630653"}
                                className="flex items-center justify-center"
                                target="_blank"
                            >
                                {" "}
                                <svg
                                    width="14"
                                    height="15"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.2835 0.428571H2.71205C1.29241 0.428571 0.140625 1.58036 0.140625 3V11.5714C0.140625 12.9911 1.29241 14.1429 2.71205 14.1429H7.46205V8.83036H5.67634V6.75893H7.46205V5.23214C7.46205 3.46428 8.55134 2.5 10.1317 2.5C10.8817 2.5 11.5335 2.55357 11.721 2.58036V4.42857L10.6317 4.4375C9.76562 4.4375 9.60491 4.83928 9.60491 5.4375V6.75893H11.6496L11.3817 8.83036H9.60491V14.1429H11.2835C12.7031 14.1429 13.8549 12.9911 13.8549 11.5714V3C13.8549 1.58036 12.7031 0.428571 11.2835 0.428571Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="ml-2">Facebook</p>
                            </Link>
                        </li>
                        <li className="flex items-center text-[12px] leading-[12px] mb-1">
                            <Link
                                href={"https://www.instagram.com/made_in_ukraine_bs/"}
                                className="flex items-center justify-center"
                                target="_blank"
                            >
                                <svg
                                    width="14"
                                    height="15"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.28348 7.28571C9.28348 8.54464 8.2567 9.57143 6.99777 9.57143C5.73884 9.57143 4.71205 8.54464 4.71205 7.28571C4.71205 6.02679 5.73884 5 6.99777 5C8.2567 5 9.28348 6.02679 9.28348 7.28571ZM10.5156 7.28571C10.5156 5.33929 8.9442 3.76786 6.99777 3.76786C5.05134 3.76786 3.47991 5.33929 3.47991 7.28571C3.47991 9.23214 5.05134 10.8036 6.99777 10.8036C8.9442 10.8036 10.5156 9.23214 10.5156 7.28571ZM11.4799 3.625C11.4799 3.16964 11.1138 2.80357 10.6585 2.80357C10.2031 2.80357 9.83705 3.16964 9.83705 3.625C9.83705 4.08036 10.2031 4.44643 10.6585 4.44643C11.1138 4.44643 11.4799 4.08036 11.4799 3.625ZM6.99777 1.66071C7.99777 1.66071 10.1406 1.58036 11.0424 1.9375C11.3549 2.0625 11.5871 2.21428 11.8281 2.45536C12.0692 2.69643 12.221 2.92857 12.346 3.24107C12.7031 4.14286 12.6228 6.28571 12.6228 7.28571C12.6228 8.28571 12.7031 10.4286 12.346 11.3304C12.221 11.6429 12.0692 11.875 11.8281 12.1161C11.5871 12.3571 11.3549 12.5089 11.0424 12.6339C10.1406 12.9911 7.99777 12.9107 6.99777 12.9107C5.99777 12.9107 3.85491 12.9911 2.95313 12.6339C2.64062 12.5089 2.40848 12.3571 2.16741 12.1161C1.92634 11.875 1.77455 11.6429 1.64955 11.3304C1.29241 10.4286 1.37277 8.28571 1.37277 7.28571C1.37277 6.28571 1.29241 4.14286 1.64955 3.24107C1.77455 2.92857 1.92634 2.69643 2.16741 2.45536C2.40848 2.21428 2.64062 2.0625 2.95313 1.9375C3.85491 1.58036 5.99777 1.66071 6.99777 1.66071ZM13.8549 7.28571C13.8549 6.33929 13.8638 5.40179 13.8103 4.45536C13.7567 3.35714 13.5067 2.38393 12.7031 1.58036C11.8996 0.776785 10.9263 0.526785 9.82812 0.473214C8.8817 0.419642 7.9442 0.428571 6.99777 0.428571C6.05134 0.428571 5.11384 0.419642 4.16741 0.473214C3.0692 0.526785 2.09598 0.776785 1.29241 1.58036C0.488839 2.38393 0.238839 3.35714 0.185268 4.45536C0.131696 5.40179 0.140625 6.33929 0.140625 7.28571C0.140625 8.23214 0.131696 9.16964 0.185268 10.1161C0.238839 11.2143 0.488839 12.1875 1.29241 12.9911C2.09598 13.7946 3.0692 14.0446 4.16741 14.0982C5.11384 14.1518 6.05134 14.1429 6.99777 14.1429C7.9442 14.1429 8.8817 14.1518 9.82812 14.0982C10.9263 14.0446 11.8996 13.7946 12.7031 12.9911C13.5067 12.1875 13.7567 11.2143 13.8103 10.1161C13.8638 9.16964 13.8549 8.23214 13.8549 7.28571Z"
                                        fill="white"
                                    />
                                </svg>
                                <p className="ml-2">Instagram</p>{" "}
                            </Link>
                        </li>

                        <li className="flex items-center text-[12px] leading-[12px] mb-1">
                            <Link
                                href={"https://www.tiktok.com/@made.in.ukraine3"}
                                className="flex items-center justify-center"
                                target="_blank"
                            >
                                <svg
                                    width="14"
                                    height="15"
                                    viewBox="0 0 43 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.4706 37.3231C12.4211 37.8246 13.4797 38.0864 14.5543 38.086C18.1338 38.086 21.0559 35.2387 21.1878 31.69L21.201 0H29.1076C29.1083 0.673085 29.1709 1.34468 29.2945 2.00632H23.5053V2.00742H29.2945H31.4129C31.4118 4.65963 32.3731 7.22216 34.1185 9.21918C34.1192 9.22003 34.1199 9.22088 34.1207 9.22173C35.9011 10.3848 37.9821 11.0032 40.1088 11.0012V12.7622C40.8531 12.9216 41.6227 13.0065 42.4142 13.0065V20.9152C38.4667 20.9198 34.6179 19.6821 31.413 17.3775V33.4468C31.413 41.4709 24.8839 48 16.8586 48C14.8601 48.0005 12.883 47.5882 11.0512 46.7889C9.22075 45.9903 7.57487 44.8224 6.21653 43.3584C6.21553 43.3577 6.21455 43.357 6.21355 43.3563C2.46035 40.7212 0 36.3633 0 31.4404C0 23.4151 6.52906 16.885 14.5543 16.885C15.2106 16.8881 15.8658 16.9359 16.5156 17.0279V18.9001C16.5156 18.9001 16.5156 18.9001 16.5156 18.9001L16.5156 25.1005C16.5156 25.1005 16.5156 25.1005 16.5156 25.1005L16.5156 18.9001C16.5613 18.8992 16.6067 18.8976 16.6523 18.8961C16.7207 18.8937 16.7893 18.8913 16.8586 18.8913C17.5148 18.8944 18.1701 18.9422 18.8198 19.0342V27.1068C18.1998 26.9122 17.5435 26.7989 16.8586 26.7989C15.0962 26.801 13.4066 27.5021 12.1605 28.7484C10.9144 29.9947 10.2136 31.6844 10.2119 33.4467C10.212 34.8387 10.6519 36.1951 11.4689 37.3222C11.4695 37.3225 11.4701 37.3228 11.4706 37.3231ZM19.9572 39.3245C21.9925 38.2447 23.4017 36.1357 23.4932 33.6952V33.6963C23.4017 36.136 21.9925 38.2448 19.9572 39.3245ZM14.5549 24.7926C14.9619 24.7927 15.359 24.8324 15.7448 24.9058C15.3531 24.8319 14.9548 24.7939 14.5549 24.7926ZM9.85666 26.7417C9.85665 26.7417 9.85666 26.7416 9.85666 26.7417V26.7417ZM3.26428 38.6397C3.93975 40.3996 4.9478 41.9961 6.21034 43.3529C4.9221 41.9743 3.92735 40.371 3.26428 38.6397ZM14.5544 45.9937C14.5544 45.9937 14.5544 45.9937 14.5544 45.9937V45.9937ZM29.1076 31.4393V15.3701C29.1076 15.3701 29.1076 15.3701 29.1076 15.3701V31.4393Z"
                                        fill="#fff"
                                    />
                                </svg>
                                <p className="ml-2">TikTok</p>{" "}
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>

            <div className="footer-image-wrapper">

                <Image
                    src={imageSrc}
                    alt="uzor"
                    width={1900}
                    height={253}
                    className=" absolute left-0 top-0 "
                    style={{
                        zIndex: -1,
                    }}
                    priority={true}
                />
            </div>

        </div>

    );
}



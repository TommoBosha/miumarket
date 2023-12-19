import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Contacts() {
  return (
    <Layout>
      <div className=" bg-graybg w-full">
        <div className="container flex flex-col md:grid md:grid-cols-2 md:gap-[40px] xl:gap-[108px] justify-center pt-[14px] md:pt-[32px] xl:pt-[38px] pb-[28px] md:pb-[32px] xl:pb-[40px] z-30 relative">
          <div className=" mb-2 ">
            <h1 className=" uppercase mb-[13px] md:mb-[24px] font-bold text-[24px] md:text-[27px] xl:text-[30px] leading-normal">
              Контакти
            </h1>
            <ul className=" grid grid-cols-2 gap-x-[18px] md:gap-x-[28px] xl:gap-x-[120px] gap-y-[10px] md:gap-y-[46px] xl:gap-y-[40px] ">
              <li className="mr-10 ">
                <p className="flex flex-row font-bold items-center gap-[5px]  uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="11"
                    viewBox="0 0 18 15"
                    fill="none"
                    className="md:w-[17px] md:h-[14px]"
                  >
                    <path
                      d="M15.933 0.0473633H1.80505C0.829344 0.0473633 0.0478924 0.837644 0.0478924 1.81335L0.0390625 12.4093C0.0390625 13.385 0.829344 14.1753 1.80505 14.1753H15.933C16.9087 14.1753 17.699 13.385 17.699 12.4093V1.81335C17.699 0.837644 16.9087 0.0473633 15.933 0.0473633ZM15.933 3.57935L8.86902 7.99432L1.80505 3.57935V1.81335L8.86902 6.22833L15.933 1.81335V3.57935Z"
                      fill="#3ACCE9"
                    />
                  </svg>
                  Email
                </p>
                <a
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  href="mailto:info@miumarket.com"
                >
                  info@miumarket.com
                </a>
              </li>

              <li>
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="14"
                    viewBox="0 0 23 20"
                    fill="none"
                    className="md:w-[21px] md:h-[18px]"
                  >
                    <path
                      d="M12.2648 15.6448C12.0013 15.7982 11.7575 15.903 11.5578 16.0624C10.7658 16.6919 9.98594 17.3381 9.2038 17.9798C8.58492 18.4871 8.2098 18.3716 7.96984 17.6016C7.38665 15.7313 6.79587 13.8641 6.22407 11.99C6.14814 11.7417 5.99019 11.6559 5.78516 11.5799C4.3158 11.0355 2.84796 10.4872 1.37784 9.94503C1.08017 9.83568 0.796932 9.71342 0.785541 9.34361C0.773392 8.95634 1.05056 8.81434 1.36569 8.69284C6.20205 6.83241 11.0369 4.96591 15.8717 3.10244C17.6995 2.39775 19.5288 1.69686 21.3573 0.993698C21.6148 0.894981 21.8699 0.830436 22.1091 1.02939C22.3597 1.23821 22.343 1.50095 22.2822 1.79178C21.1986 6.96226 20.1211 12.1343 19.0428 17.3063C18.9244 17.8758 18.812 18.4461 18.689 19.0141C18.5629 19.5965 18.1278 19.7681 17.6494 19.4226C16.1117 18.3116 14.5785 17.1939 13.0378 16.0867C12.8085 15.9219 12.5465 15.8035 12.2663 15.644L12.2648 15.6448ZM7.28642 11.5906C7.29705 11.6695 7.29781 11.7728 7.32438 11.8692C7.65774 13.0485 7.99034 14.2286 8.33889 15.4033C8.37002 15.5096 8.51126 15.5825 8.60163 15.6714C8.69199 15.5681 8.8431 15.4754 8.86361 15.36C8.94789 14.8877 9.00409 14.4093 9.04889 13.9309C9.11419 13.2346 9.38377 12.6726 9.91684 12.1859C12.4197 9.89946 14.8975 7.58646 17.3844 5.2818C17.4679 5.20435 17.5583 5.13069 17.6243 5.04032C17.6615 4.98945 17.6866 4.86339 17.6638 4.84821C17.6023 4.80568 17.5059 4.77607 17.4353 4.79201C17.3403 4.81403 17.2553 4.8801 17.1687 4.93325C16.2309 5.50809 15.2939 6.08444 14.3568 6.66004C12.2017 7.9836 10.0482 9.30792 7.89163 10.6292C7.53549 10.8471 7.28945 11.1273 7.28642 11.5898V11.5906Z"
                      fill="#3ACCE9"
                    />
                  </svg>
                  Телеграм
                </p>
                <a
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  target="_blank"
                  href="http://www.t.me/Igor_TrofimenkoUA"
                >
                  @Igor_TrofimenkoUA
                </a>
              </li>

              <li >
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 15 21"
                    fill="none"
                    className="md:w-[17px] md:h-[17px]"
                  >
                    <path
                      d="M2.41557 8.63533C3.06678 11.5906 4.64842 14.2802 6.91916 16.287L9.47633 14.7793C9.79583 14.5915 10.1794 14.6122 10.4713 14.7962C11.416 15.4056 12.4798 15.8784 13.6283 16.1763C14.1403 16.3091 14.4443 16.8261 14.3115 17.3381L13.474 20.5669C13.3412 21.0789 12.8241 21.383 12.3122 21.2501C3.64976 19.0032 -1.54951 10.1618 0.697472 1.49942C0.830281 0.987422 1.3519 0.684587 1.85928 0.8162L5.08807 1.65373C5.60007 1.78654 5.9041 2.30355 5.77129 2.81554C5.47337 3.96407 5.36952 5.12356 5.44284 6.24531C5.46175 6.5899 5.29343 6.93515 4.97394 7.12303L2.41557 8.63533Z"
                      fill="#3ACCE9"
                    />
                  </svg>
                  Телефон
                </p>
                <a
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  href="tel:+380665232307"
                >
                  +38 066 523 23 07
                </a>
              </li>

              <li>
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[16px] xl:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 21 21"
                    fill="none"
                    className="md:w-[19px] md:h-[19px]"
                  >
                    <path
                      d="M10.5672 20.3707C5.1809 20.3707 0.814453 16.0042 0.814453 10.618C0.814453 5.23168 5.1809 0.865234 10.5672 0.865234C15.9535 0.865234 20.3199 5.23168 20.3199 10.618C20.314 16.0018 15.951 20.3648 10.5672 20.3707ZM10.5672 2.81578C6.25815 2.81578 2.765 6.30894 2.765 10.618C2.765 14.927 6.25815 18.4201 10.5672 18.4201C14.8762 18.4201 18.3694 14.927 18.3694 10.618C18.3645 6.31094 14.8742 2.82062 10.5672 2.81578ZM15.4435 11.5932H9.59191V5.7416H11.5425V9.64269H15.4435V11.5932Z"
                      fill="#3ACCE9"
                      stroke="#3ACCE9"
                    />
                  </svg>
                  Графік роботи
                </p>
                <p className=" text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px] ">
                  Понеділок - субота 10:00 - 19:00
                </p>
              </li>
            </ul>
          </div>

          <div className="">
            <h2 className=" uppercase mb-[13px] md:mb-[24px] font-bold text-[24px] md:text-[27px] xl:text-[30px] leading-normal">
              соцмережі
            </h2>
            <ul className="grid grid-cols-2 gap-x-[18px] md:gap-x-[28px] xl:gap-x-[120px] gap-y-[10px] md:gap-y-[46px] xl:gap-y-[40px]">
              <li >
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="md:w-[22px] md:h-[22px]"
                  >
                    <path
                      d="M11.6246 1.066C13.1705 1.066 14.7146 1.03624 16.2605 1.07125C19.7374 1.15003 22.3407 3.53275 22.4913 7.0149C22.6348 10.3325 22.6348 13.6641 22.5018 16.9799C22.3617 20.4341 19.5974 22.9131 16.1537 22.9218C13.2668 22.9288 10.3816 22.9358 7.49472 22.9218C3.14246 22.9043 0.602181 20.3641 0.579422 16.0065C0.563666 13.1494 0.570669 10.2922 0.582923 7.43507C0.59868 3.85488 3.40331 1.0695 6.98876 1.06075C8.53464 1.05724 10.0788 1.06075 11.6246 1.06075C11.6246 1.0625 11.6246 1.066 11.6246 1.06775V1.066ZM2.64176 12.0219C2.64176 12.8097 2.64176 13.5958 2.64176 14.3836C2.64176 15.1995 2.62775 16.017 2.64876 16.8311C2.70478 19.0703 4.29442 20.8332 6.52483 20.8928C9.87393 20.9821 13.2283 20.9821 16.5774 20.9068C18.799 20.856 20.4675 19.093 20.4972 16.8749C20.541 13.6693 20.5375 10.462 20.4972 7.2565C20.4692 4.97883 18.7063 3.18611 16.4408 3.15634C13.2055 3.11258 9.97022 3.10907 6.73491 3.16685C4.32769 3.20886 2.66101 4.98058 2.64001 7.3878C2.626 8.93193 2.63825 10.4778 2.6365 12.0219H2.64176Z"
                      fill="#3ACCE9"
                      stroke="#3ACCE9"
                    />
                    <path
                      d="M11.5315 17.7081C8.375 17.6713 5.82596 15.1188 5.85573 12.0288C5.88549 8.86003 8.47304 6.33375 11.6523 6.36877C14.7668 6.40203 17.3334 9.02284 17.2738 12.1093C17.2143 15.2624 14.6653 17.7466 11.5298 17.7081H11.5315ZM15.2535 12.0253C15.257 10.0435 13.6271 8.40834 11.6418 8.39784C9.53572 8.38733 7.8883 9.99623 7.88655 12.0691C7.8848 14.0229 9.54272 15.6983 11.5053 15.7228C13.5623 15.7491 15.25 14.0841 15.2518 12.0253H15.2535Z"
                      fill="#3ACCE9"
                      stroke="#3ACCE9"
                    />
                    <path
                      d="M18.7737 6.17971C18.7667 6.92026 18.1698 7.48749 17.4134 7.47174C16.6816 7.45773 16.1074 6.84148 16.1337 6.09743C16.1599 5.38314 16.7184 4.85443 17.4432 4.85793C18.2013 4.86318 18.7807 5.43741 18.7737 6.17796V6.17971Z"
                      fill="#3ACCE9"
                      stroke="#3ACCE9"
                    />
                  </svg>
                  Instagram
                </p>
                <Link
                  href={"https://www.instagram.com/made_in_ukraine_bs/"}
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  target="_blank"
                >
                  made_in_ukraine_bs
                </Link>
              </li>

              <li>
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="12"
                    viewBox="0 0 25 17"
                    fill="none"
                    className="md:w-[24px] md:h-[16px]"
                  >
                    <path
                      d="M3.67816 16.3524C1.98863 16.256 1.09345 15.4026 0.827192 13.729C0.424714 11.1905 0.401715 8.64154 0.609588 6.08556C0.712198 4.81852 0.852845 3.55937 1.27036 2.34753C1.64807 1.25311 2.5406 0.58104 3.70204 0.489035C8.35399 0.121892 13.013 0.211268 17.6703 0.273481C19.0661 0.291882 20.4664 0.408421 21.8534 0.573154C23.19 0.731753 23.9454 1.61149 24.178 2.87503C24.4054 4.10614 24.5699 5.3539 24.6796 6.60166C24.8707 8.77473 24.822 10.9504 24.5283 13.1147C24.454 13.6606 24.3373 14.2109 24.1524 14.7288C23.8154 15.6725 23.0821 16.1947 22.0905 16.2657C19.9463 16.419 12.155 16.5934 12.155 16.5934C12.155 16.5934 6.60608 16.5224 3.67904 16.3551L3.67816 16.3524ZM9.35355 3.76791V12.398C12.1957 10.9504 14.975 9.53443 17.8383 8.07637C14.9821 6.6262 12.2054 5.21633 9.35355 3.76791Z"
                      fill="#3ACCE9"
                    />
                  </svg>
                  youtube
                </p>
                <Link
                  href={"https://www.youtube.com/@Made.in.Ukraine2023"}
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  target="_blank"
                >
                  @Made.in.Ukraine2023
                </Link>
              </li>

              <li >
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="19"
                    viewBox="0 0 14 23"
                    fill="none"
                    className="md:w-[12px] md:h-[22px]"
                  >
                    <path
                      d="M8.59735 5.5296V7.86248C9.65937 7.86248 10.6857 7.85712 11.7138 7.86248C13.4541 7.87497 13.1935 7.7179 13.2328 9.40643C13.2506 10.2079 13.1899 11.0146 13.247 11.8125C13.3042 12.6014 13.09 12.9531 12.2225 12.8924C11.1623 12.8192 10.0913 12.8745 8.9347 12.8745C8.91328 13.219 8.88115 13.501 8.87936 13.7848C8.87401 16.489 8.85438 19.1949 8.89007 21.899C8.899 22.6112 8.64733 22.8504 7.96192 22.8218C7.04269 22.7844 6.11632 22.7647 5.19887 22.8272C4.35461 22.8843 4.05296 22.6094 4.07081 21.7348C4.12079 19.1199 4.08866 16.505 4.08866 13.8883C4.08866 13.5956 4.08866 13.3029 4.08866 12.8727C3.28188 12.8727 2.55006 12.8477 1.82003 12.8817C1.2328 12.9084 0.943643 12.7496 0.966847 12.0909C1.00611 10.9325 0.99362 9.77233 0.957922 8.61393C0.940073 8.0142 1.18996 7.83035 1.75221 7.85534C2.48938 7.88568 3.22833 7.86248 4.02797 7.86248C4.09044 6.68087 4.08152 5.55816 4.22074 4.45508C4.52775 2.02224 5.71114 0.870974 8.16897 0.669279C9.61475 0.54969 11.0766 0.612162 12.5313 0.580033C13.0114 0.569324 13.2435 0.751385 13.2363 1.25473C13.2221 2.44348 13.2185 3.63223 13.2399 4.82099C13.2506 5.37252 13.0043 5.54388 12.4849 5.53495C11.214 5.51532 9.94496 5.52781 8.59735 5.52781V5.5296Z"
                      fill="#3ACCE9"
                    />
                  </svg>
                  Facebook
                </p>
                <Link
                  href={
                    "https://www.facebook.com/profile.php?id=100094715630653"
                  }
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  target="_blank"
                >
                  Made in Ukraine
                </Link>
              </li>

              <li>
                <p className="flex flex-row font-bold items-center gap-[5px] uppercase text-[15px] md:text-[18px] leading-normal mb-1 xl:mb-[9px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="19"
                    viewBox="0 0 20 23"
                    fill="none"
                    className="md:w-[19px] md:h-[22px]"
                  >
                    <path
                      d="M19.1404 5.69148C17.4936 5.44504 16.1549 4.68948 15.2826 3.22709C14.7932 2.40658 14.5101 1.51348 14.4103 0.569753C14.37 0.187677 14.2183 0.0434436 13.8373 0.0491747C12.9737 0.0625474 12.11 0.0463092 11.2472 0.0491747C10.6081 0.0501299 10.5688 0.0883375 10.5688 0.73118C10.5668 3.1822 10.5688 5.63321 10.5688 8.08423H10.5716C10.5716 10.4397 10.5774 12.7952 10.5688 15.1507C10.5659 15.8518 10.5265 16.5596 10.2079 17.2034C9.41044 18.8129 7.2704 19.4491 5.66777 18.5674C4.19374 17.7565 3.68704 15.6484 4.60447 14.1411C5.34437 12.9261 6.50556 12.5631 7.8414 12.5717C8.11874 12.5736 8.36058 12.5937 8.3577 12.2068C8.35098 11.1246 8.3529 10.0424 8.35482 8.96014C8.35482 8.64779 8.20223 8.494 7.89418 8.47012C6.58041 8.36792 5.30502 8.50165 4.10929 9.09673C1.33683 10.4741 -0.28595 13.6014 0.283128 17.1098C0.81094 20.3661 3.64769 22.7435 6.99978 22.8591C9.26841 22.9374 11.2328 22.2841 12.705 20.4902C13.774 19.1864 14.2893 17.6648 14.3114 15.9884C14.346 13.4428 14.3556 10.8963 14.3786 8.35073C14.3796 8.19598 14.3297 8.0059 14.4726 7.90274C14.6176 7.79672 14.7413 7.9419 14.8527 8.02118C16.1655 8.95632 17.6597 9.36705 19.2374 9.55426C19.6481 9.60298 19.7892 9.4406 19.7844 9.0547C19.7748 8.19503 19.7604 7.33536 19.7911 6.47664C19.8093 5.98568 19.6414 5.76694 19.1395 5.69148H19.1404Z"
                      fill="#3ACCE9"
                    />
                  </svg>
                  tiktok
                </p>
                <Link
                  href={"https://www.tiktok.com/@made.in.ukraine3"}
                  className="text-[15px] xl:text-[18px] leading-[22.5px] xl:leading-[27px]"
                  target="_blank"
                >
                  made.in.ukraine3
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Image
        src={"/images/gray.svg"}
        alt="uzor"
        width={1900}
        height={253}
        className=" absolute left-0 bottom-0 z-10"
      />
    </Layout>
  );
}

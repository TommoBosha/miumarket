import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive';

export default function Delivery() {
    const [isClient, setIsClient] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";

    useEffect(() => {
        setIsClient(true); 
       
    }, [])

    return (
        <Layout>
            <div className='bg-graybg'>
                <div
                    className='container relative z-10  justify-center pt-[14px] md:pt-[20px] xl:pt-[28px] pb-2 '
                   >
                    <h1 className='text-primary  text-center uppercase  mb-[12px] md:mb-[15px] xl:mb-[30px] font-bold text-[24px] leading-normal'>доставка</h1>


                    <div className='flex flex-col md:flex-row relative z-10  justify-center  m-auto pb-[33px]' >
                        <ul className='md:grid md:grid-cols-3 gap-[36px] xl:gap-[80px]'>
                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]'>
                                    Нова пошта доставка по Україні та світу
                                </p>
                                <Image
                                    src={'/images/delivery-2.svg'}
                                    alt='uzor'
                                    width={72}
                                    height={75}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[78px] md:h-[78px] xl:w-[95px] xl:h-[95px]'
                                />
                                <p className='mx-[56px] md:mx-0 mb-[10px] md:mb-[14px] xl:mb-[27px] text-[12px] md:text-[15px] xl:text-[18px] leading-[12.5px] md:leading-[15.67px] xl:leading-[21.33px]'>
                                    Вартість доставки по Україні - від 60 гривень
                                </p>
                                <p className='mx-[56px] md:mx-0 text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]' >
                                    Доставка здійснюється в усі відділення по Україні, окрім АР Крим і тимчасово окупованих територій.
                                    Вартість доставки товарів - від 60 грн.

                                    <br /> <br />Міжнародну доставку здійснює компанія Нова Пошта та Укрпошта тільки після 100% передоплати.
                                    Вартість доставки за кордон по тарифам перевізника.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]'>
                                    Кур&#39;єрська доставка <br />по Україні
                                </p>
                                <Image
                                    src={'/images/delivery-3.svg'}
                                    alt='uzor'
                                    width={71}
                                    height={71}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[76px] md:h-[77px] xl:w-[95px] xl:h-[95px]'
                                />
                                <p className='mx-[56px] md:mx-0 mb-[10px] md:mb-[14px] xl:mb-[27px] text-[12px] md:text-[15px] xl:text-[18px] leading-[12.5px] md:leading-[15.67px] xl:leading-[21.33px]'>
                                    Вартість доставки -
                                    від 130 гривень
                                </p>
                                <p className='mx-[56px] md:mx-0 text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    Адресну кур&#39;єрську доставку по Україні здійснює компанія &#34;Нова Пошта&#34;.

                                    <br /> <br />Тарифи і терміни кур&#39;єрської доставки Новою поштою
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]'>
                                    Доставка по Україні та світу Укрпоштою
                                </p>
                                <Image
                                    src={'/images/delivery-4.svg'}
                                    alt='uzor'
                                    width={66}
                                    height={72}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[72px] md:h-[78px] xl:w-[88px] xl:h-[95px]'
                                />
                                <p className=' mx-[56px] md:mx-0 mb-[10px] md:mb-[14px] xl:mb-[27px] text-[12px] md:text-[15px] xl:text-[18px] leading-[12.5px] md:leading-[15.67px] xl:leading-[21.33px]'>
                                    Вартість міжнарожної доставки уточніть у менеджерів
                                </p>
                                <p className='mx-[56px] md:mx-0 text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    Доставка здійснюється в усі відділення по Україні, окрім АР Крим і тимчасово окупованих територій.
                                    Вартість доставки товарів згідно тарифами.

                                    <br /><br />Міжнародну доставку здійснює компанія &#34;Укрпошта&#34; тільки після 100% передоплати.
                                    <br /><span className='underline'>
                                        Тарифи і терміни міжнародної доставки Укрпоштою
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>

                    <h2 className='text-primary  text-center uppercase  mb-[12px] md:mb-[15px] xl:mb-[16px] font-bold text-[24px] leading-normal'>ОПЛАТА</h2>
                    <p className=' text-center uppercase mb-[16px] md:mb-[20px] xl:mb-[22px]  text-[12px] md:text-[18px] text-secondary leading-[14.4px] md:leading-[21.6px]'
                        
                    >
                        Замовлення відправляються накладеним
                        <br /> платежем <b>після передоплати у розмірі 200грн</b></p>
                    <div className='flex flex-wrap relative z-10  justify-center  pb-[33px] m-auto'>

                        <ul className='md:grid md:grid-cols-3 gap-[36px] xl:gap-[80px]'>
                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]'>
                                    Онлайн оплата на сайті
                                </p>
                                <Image
                                    src={'/images/delivery-1.svg'}
                                    alt='uzor'
                                    width={83}
                                    height={72}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[89px] md:h-[78px] xl:w-[109px] xl:h-[95px]'
                                />
                                <p className='mx-[56px] md:mx-0 text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    Ви можете оплатити <br />замовлення онлайн за <br />допомогою банківської картки <br />або через систему Приват24.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Банківська картка
                                </p>
                                <Image
                                    src={'/images/delivery-4.svg'}
                                    alt='uzor'
                                    width={73}
                                    height={72}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[78px] md:h-[77px] xl:w-[93px] xl:h-[92px]'
                                />
                                <p className='mx-[56px] md:mx-0 text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    Ви можете оплатити <br />замовлення карткою Visa <br />або MasterCard у точці самовивозу.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]'>
                                    Контроль оплати
                                </p>
                                <Image
                                    src={'/images/delivery-2.svg'}
                                    alt='uzor'
                                    width={72}
                                    height={72}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[77px] md:h-[77px] xl:w-[93px] xl:h-[93px]'
                                />
                                <p className='mx-[56px] md:mx-0 text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    При отриманні замовлення у <br />відділенні &#34;Нової пошта&#34;, Ви можете оплатити його як готівкою, так і банківською картою.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <h2 className='text-primary  text-center uppercase  mb-[12px] md:mb-[15px] xl:mb-[20px] font-bold text-[24px] leading-normal'>інше</h2>

                    <div className='flex flex-row relative z-10 justify-center  m-auto pb-[24px] md:pb-[33px] xl:pb-[50px]'>

                        <ul className='md:flex md:flex-row md:justify-center xl:gap-[112px] '>
                            <li className='flex flex-col items-center text-center mb-[18px] md:mb-0'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]' >
                                    Трекінг
                                </p>
                                <Image
                                    src={'/images/delivery-3.svg'}
                                    alt='uzor'
                                    width={71}
                                    height={72}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[78px] md:h-[79px] xl:w-[94px] xl:h-[95px]'
                                />
                                <p className='mx-[56px] text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    Ви можете відстежувати <br /> ваші посилки через додатки або <br />на сайтах перевізників
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='mx-[56px] md:mx-0 text-[15px] md:text-[18px] leading-normal text-center uppercase font-bold mb-[6px] md:mb-[16px] xl:mb-[20px]' >
                                    Перевізники
                                </p>
                                <Image
                                    src={'/images/delivery-5.svg'}
                                    alt='uzor'
                                    width={79}
                                    height={75}
                                    className='mb-[14px] md:mb-[12px] w-auto h-auto xl:mb-[19px] md:w-[79px] md:h-[75px]  xl:w-[102px] xl:h-[97px]'
                                />
                                <p className='mx-[56px] text-secondary text-[12px] md:text-[15px] xl:text-[14px] leading-[12.5px] md:leading-[15.67px] xl:leading-[16.59px]'>
                                    Лінки Новою поштою та <br />Укрпоштою
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {isClient && (
            <div className="footer-image-wrapper">
            <Image
                src={imageSrc}
                alt="uzor"
                width={1900}
                height={253}
                className=" absolute left-0 bottom-0 z-0 "
                priority={true}
            />
            </div>
            )}
        </Layout>
    )
}

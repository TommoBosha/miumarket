import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'

export default function Delivery() {
    return (
        <Layout>
            <div style={{ backgroundColor: '#D7D7D7' }}>
                <div
                    className=' relative z-10  justify-center pt-7 pb-2 m-auto'
                    style={{ width: '1040px' }}>
                    <h1 className='text-white  text-center uppercase mb-8 font-bold text-2xl'>доставка</h1>


                    <div className='flex flex-row relative z-10  justify-center  m-auto'>
                        <ul className='grid grid-cols-3 gap-16'>
                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-5'>
                                    Нова пошта доставка по Україні та світу
                                </p>
                                <Image
                                    src={'/images/delivery-2.svg'}
                                    alt='uzor'
                                    width={95}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість доставки по Україні - від 60 гривень
                                </p>
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    Доставка здійснюється в усі відділення по Україні, окрім АР Крим і тимчасово окупованих територій.
                                    Вартість доставки товарів - від 60 грн.

                                    <br /> <br />Міжнародну доставку здійснює компанія Нова Пошта та Укрпошта тільки після 100% передоплати.
                                    Вартість доставки за кордон по тарифам перевізника.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-5'>
                                    Кур&#39;єрська доставка <br />по Україні
                                </p>
                                <Image
                                    src={'/images/delivery-3.svg'}
                                    alt='uzor'
                                    width={95}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість доставки -
                                    від 130 гривень
                                </p>
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    Адресну кур&#39;єрську доставку по Україні здійснює компанія &#34;Нова Пошта&#34;.

                                    <br /> <br />Тарифи і терміни кур&#39;єрської доставки Новою поштою
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-5'>
                                    Доставка по Україні та світу Укрпоштою
                                </p>
                                <Image
                                    src={'/images/delivery-4.svg'}
                                    alt='uzor'
                                    width={88}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість міжнарожної доставки уточніть у менеджерів
                                </p>
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
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

                    <h2 className='text-white  text-center uppercase pt-5 pb-4 font-bold text-2xl'>ОПЛАТА</h2>
                    <p className=' text-center uppercase mb-6  text-lg'
                        style={{ lineHeight: '21.59px', color: '#7E7E7E' }}
                    >
                        Замовлення відправляються накладеним
                        <br /> платежем <b>після передоплати у розмірі 200грн</b></p>
                    <div className='flex flex-wrap relative z-10  justify-center  pb-10 m-auto'>

                        <ul className='grid grid-cols-3 gap-10'>
                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Онлайн оплата на сайті
                                </p>
                                <Image
                                    src={'/images/delivery-1.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-6'
                                />
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    Ви можете оплатити <br />замовлення онлайн за <br />допомогою банківської картки <br />або через систему Приват24.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Банківська картка
                                </p>
                                <Image
                                    src={'/images/delivery-4.svg'}
                                    alt='uzor'
                                    width={88}
                                    height={95}
                                    className='mb-6'
                                />
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    Ви можете оплатити <br />замовлення карткою Visa <br />або MasterCard у точці самовивозу.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Контроль оплати
                                </p>
                                <Image
                                    src={'/images/delivery-2.svg'}
                                    alt='uzor'
                                    width={95}
                                    height={95}
                                    className='mb-6'
                                />
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    При отриманні замовлення у <br />відділенні &#34;Нової пошта&#34;, Ви можете оплатити його як готівкою, так і банківською картою.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <h2 className='text-white  text-center uppercase mb-5 font-bold text-2xl'>інше</h2>

                    <div className='flex flex-row relative z-10 justify-center  m-auto pb-12'>

                        <ul className='grid grid-cols-2 gap-28 '>
                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7' >
                                    Трекінг
                                </p>
                                <Image
                                    src={'/images/delivery-3.svg'}
                                    alt='uzor'
                                    width={95}
                                    height={95}
                                    className='mb-6'
                                />
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    Ви можете відстежувати <br /> ваші посилки через додатки або <br />на сайтах перевізників
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7' >
                                    Перевізники
                                </p>
                                <Image
                                    src={'/images/delivery-5.svg'}
                                    alt='uzor'
                                    width={95}
                                    height={98}
                                    className='mb-6'
                                />
                                <p style={{ color: '#7E7E7E', lineHeight: '16.59px' }}>
                                    Лінки Новою поштою та <br />Укрпоштою
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Image
                src={'/images/gray.svg'}
                alt="uzor"
                width={1900}
                height={253}
                className=" absolute left-0 bottom-0 z-0 "
            />
        </Layout>
    )
}

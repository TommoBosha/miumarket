import React from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'

export default function Delivery() {
    return (
        <Layout>
            <div style={{ backgroundColor: '#D7D7D7' }}>
                <div
                    className='flex flex-row relative z-10  justify-center pt-10 pb-10 m-auto'
                    style={{ width: '1040px' }}>
                    <div >
                        <h1 className='text-white  text-center uppercase mb-14 font-bold text-2xl'>доставка</h1>

                        <ul className='grid grid-cols-4 gap-10'>
                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-16'>
                                    Самовивіз у Києві
                                </p>
                                <Image
                                    src={'/images/delivery-1.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість доставки - безкоштовно
                                </p>
                                <p style={{ color: '#A0A0A0', lineHeight: '16.59px' }}>
                                    Ваше замовлення зберігається в пункті самовивозу 5 днів.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Нова пошта доставка по Україні та світу
                                </p>
                                <Image
                                    src={'/images/delivery-2.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість доставки по Україні - від 60 гривень
                                </p>
                                <p style={{ color: '#A0A0A0', lineHeight: '16.59px' }}>
                                    Доставка здійснюється в усі відділення по Україні, окрім АР Крим і тимчасово окупованих територій.
                                    <br />Вартість доставки товарів - від 60 грн.
                                    <br />Замовлення від 3000 грн відправляються після 50% передоплати.

                                    <br /><br />Міжнародну доставку здійснює компанія &#34;Нова пошта&#34; тільки після 100% передоплати.
                                    Вартість доставки за кордон по тарифам перевізника.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Кур&#39;єрська доставка по Україні
                                </p>
                                <Image
                                    src={'/images/delivery-3.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість доставки -
                                    <br />130 гривень
                                </p>
                                <p style={{ color: '#A0A0A0', lineHeight: '16.59px' }}>
                                    Адресну кур&#39;єрську доставку по Україні здійснює компанія &#34;Нова Пошта&#34;.

                                    <br /><br /><span className='underline'>
                                        Тарифи і терміни кур&#39;єрської доставки Новою поштою
                                    </span>
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center' >
                                <p className='text-center uppercase font-bold mb-7'>
                                    Доставка по Україні та світу Укрпоштою
                                </p>
                                <Image
                                    src={'/images/delivery-4.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-5'
                                />
                                <p className=' text-lg mb-7' style={{ lineHeight: '16.59px' }}>
                                    Вартість міжнарожної доставки уточніть у менеджерів
                                </p>
                                <p style={{ color: '#A0A0A0', lineHeight: '16.59px' }}>
                                    Доставка здійснюється в усі відділення по Україні, окрім АР Крим і тимчасово окупованих територій.
                                    <br />Вартість доставки товарів фіксована - 60 грн.

                                    <br /><br />Міжнародну доставку здійснює компанія &#34;Укрпошта&#34; тільки після 100% передоплати.
                                    <br /><span className='underline'>Тарифи і терміни міжнародної доставки Укрпоштою</span>
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7' >
                                    Готівкою
                                </p>
                                <Image
                                    src={'/images/delivery-3.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-6'
                                />

                                <p style={{ color: '#A0A0A0' }}>
                                    Ви можете оплатити замовлення готівкою в точці самовивозу або при доставці кур&#39;єром
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Банківська картка
                                </p>
                                <Image
                                    src={'/images/delivery-4.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-6'
                                />

                                <p style={{ color: '#A0A0A0' }}>
                                    Ви можете оплатити замовлення карткою Visa або MasterCard у точці самовивозу.

                                    <br /><br />При доставці кур&#39;єром можлива оплата тільки готівкою.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Онлайн оплата на сайті
                                </p>
                                <Image
                                    src={'/images/delivery-2.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-6'
                                />

                                <p style={{ color: '#A0A0A0' }}>
                                    Ви можете оплатити замовлення онлайн за допомогою банківської картки або через систему Приват24.
                                </p>
                            </li>

                            <li className='flex flex-col items-center text-center'>
                                <p className='text-center uppercase font-bold mb-7'>
                                    Контроль оплати
                                </p>
                                <Image
                                    src={'/images/delivery-1.svg'}
                                    alt='uzor'
                                    width={109}
                                    height={95}
                                    className='mb-6'
                                />

                                <p style={{ color: '#A0A0A0' }}>
                                    При отриманні замовлення у відділенні &#34;Нової пошта&#34;, Ви можете оплатити його як готівкою, так і банківською картою.
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

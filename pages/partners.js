import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { sendPartnerForm } from '../lib/api'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useMediaQuery } from 'react-responsive'

export default function Partners() {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const imageSrc = isMobile ? "/images/gray-mobile.svg" : "/images/gray.svg";
    const { handleSubmit, control, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {

        try {
            await sendPartnerForm(data);
            toast.success('Форма відправлена');
            reset();

        } catch (error) {
            console.error("Failed to submit form: ", error);

        }
    }

    const ButtonStyles = styled.button`
     background: #3ACCE9; 
     border-radius: 2px;
        &:hover {
        background: #FFF;
        color: #000; 
        }

    `;


    return (
        <Layout>
            <div className="bg-graybg" >
                <div className='container'>
                <h1
                    className='uppercase text-center pt-[15px] pb-[22px] font-bold text-secondary text-[24px] leading-[24.91px]'
                    >
                    форма для партнерства
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md mx-auto pb-[23px] relative z-10">

                    <div className="mb-8 relative">


                        <Controller
                            name="companyName"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <input {...field}
                                id="companyName"
                                placeholder='Богдан Бондар'
                                className={`appearance-none border-2 rounded-3xl 
                                ${errors.companyName ? 'border-red-500' : 'border-secondary'} 
                                rounded w-full py-2 px-5 border-secondary bg-graybg text-black text-sm leading-tight focus:outline-none focus:shadow-outline`}  />}
                        />

                        <label
                            className="block   text-sm pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 " style={{ background: '#D7D7D7', color: '#A0A0A0' }}
                            htmlFor="companyName"
                        >
                            Ім&#39;я
                        </label>

                        {errors.companyName && <p className="text-red-500 text-xs italic"> Поле обов&#39;язкове</p>}
                    </div>

                    <div className="mb-8 relative">

                        <Controller
                            name="product"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <input {...field}
                                id="product"
                                placeholder='Що плануєте продавати'
                                className={`appearance-none border-2 rounded-3xl
                                 ${errors.product ? 'border-red-500' : 'border-gray-300'} 
                                 rounded w-full py-2 px-5  text-black text-sm leading-tight
                                 focus:outline-none focus:shadow-outline`}
                                style={{ borderColor: '#A0A0A0', backgroundColor: '#D7D7D7' }} />}
                        />
                        <label
                            className="block   text-sm pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 " style={{ background: '#D7D7D7', color: '#A0A0A0' }}
                            htmlFor="product"
                        >
                            Продукт
                        </label>
                        {errors.product && <p className="text-red-500 text-xs italic"> Поле обов&#39;язкове</p>}
                    </div>

                    <div className="mb-8 relative">

                        <Controller
                            name="socialMedia"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field}
                                id="socialMedia"
                                placeholder='Instagram, Telegram ...'
                                className={`appearance-none border-2 rounded-3xl
                                 border-gray-300  w-full py-2 px-5 text-black
                                 text-sm leading-tight focus:outline-none focus:shadow-outline`}
                                style={{ borderColor: '#A0A0A0', backgroundColor: '#D7D7D7' }}
                            />}
                        />
                        <label
                            className="block   text-sm pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 " style={{ background: '#D7D7D7', color: '#A0A0A0' }}
                            htmlFor="socialMedia"
                        >
                            Соцмережі
                        </label>

                    </div>

                    <div className="mb-8 relative">

                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, pattern: /^(\+380\d{9})$/ }}
                            render={({ field }) => <input {...field}
                                id="phone"
                                placeholder='+380990000000'
                                className={`appearance-none border-2 rounded-3xl 
                                ${errors.phone ? 'border-red-500' : 'border-gray-300'} 
                                rounded w-full py-2 px-5 text-black text-sm leading-tight
                                focus:outline-none focus:shadow-outline`}
                                style={{ borderColor: '#A0A0A0', backgroundColor: '#D7D7D7' }}
                            />}
                        />
                        <label
                            className="block   text-sm pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 " style={{ background: '#D7D7D7', color: '#A0A0A0' }}
                            htmlFor="phone"
                        >
                            Телефон
                        </label>
                        {errors.phone && <p className="text-red-500 text-xs italic">Введіть правильний формат телефону (+380XXXXXXXXX)</p>}
                    </div>

                    <div className="mb-8 relative">

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
                            render={({ field }) => <input {...field}
                                id="email"
                                placeholder='example@mail.com'
                                className={`appearance-none border-2 rounded-3xl 
                                ${errors.email ? 'border-red-500' : 'border-gray-300'} 
                                rounded w-full py-2 px-5 text-black text-sm leading-tight
                                focus:outline-none focus:shadow-outline`}
                                style={{ borderColor: '#A0A0A0', backgroundColor: '#D7D7D7' }}
                            />}
                        />
                        <label
                            className="block   text-sm pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 " style={{ background: '#D7D7D7', color: '#A0A0A0' }}
                            htmlFor="email"
                        >
                            E-mail
                        </label>
                        {errors.email && <p className="text-red-500 text-xs italic">Введіть правильний формат email(example@mail.com)</p>}
                    </div>

                    <div className="pb-8 relative">

                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 10 }}
                            render={({ field }) => <textarea {...field}
                                id="description"
                                placeholder='Розкажіть про себе та товар який робите'
                                className={`appearance-none border-2 rounded-3xl 
                                ${errors.description ? 'border-red-500' : 'border-gray-300'}
                                 rounded w-full py-6 px-5 h-32 text-black text-sm
                                 leading-tight focus:outline-none focus:shadow-outline`}
                                style={{ borderColor: '#A0A0A0', backgroundColor: '#D7D7D7' }} />}
                        />
                        <label
                            className="block text-sm pl-1 pr-2 absolute top-0 left-5 transform -translate-y-2/4 " style={{ background: '#D7D7D7', color: '#A0A0A0' }}
                            htmlFor="description"
                        >
                            Про себе
                        </label>
                        {errors.description && <p className="text-red-500 text-xs italic">Поле обов&#39;язкове</p>}
                    </div>
                    <div className="mb-6 flex justify-center items-center">
                        <ButtonStyles
                            type="submit"
                            className="font-bold py-2 px-4  uppercase focus:outline-none focus:shadow-outline  "

                        >
                            Відправити
                        </ButtonStyles>
                    </div>
                </form>
                </div>
                
                <div className='footer-image-wrapper'>
                    <Image
                        src={imageSrc}
                        alt="uzor"
                        width={1900}
                        height={253}
                        className=" absolute left-0 bottom-0 "

                    />
                </div>

            </div>
        </Layout >
    )
}

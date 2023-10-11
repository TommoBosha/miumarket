import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { sendPartnerForm } from '../lib/api'
import Image from 'next/image'

export default function Partners() {
    const { handleSubmit, control, formState: { errors } } = useForm()

    const onSubmit = async (data) => {

        console.log(data)
        try {
            await sendPartnerForm(data);
            console.log("Form successfully submitted!");

        } catch (error) {
            console.error("Failed to submit form: ", error);

        }
    }

    const ButtonStyles = styled.button`
     background: #FFD700; 
        &:hover {
        background: #3ACCE9;
        color: #fff; 
        }

    `;


    return (
        <Layout>
            <div className="m-auto" style={{ background: '#D7D7D7' }}>
                <h1 className='uppercase text-white text-center pt-9 text-2xl' style={{ fontWeight: '700' }}>форма для партнерства </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto py-5 relative z-10">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="companyName">Ім&#39;я (Назва компанії):</label>
                        <Controller
                            name="companyName"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <input {...field}
                                id="companyName"
                                placeholder='Ім&#39;я (Назва компанії)'
                                className={`appearance-none border rounded-3xl ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline`} />}
                        />
                        {errors.companyName && <p className="text-red-500 text-xs italic"> Поле обов&#39;язкове</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">Що плануєте продавати</label>
                        <Controller
                            name="product"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <input {...field}
                                id="product"
                                placeholder='Що плануєте продавати'
                                className={`appearance-none border rounded-3xl ${errors.product ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline`} />}
                        />
                        {errors.product && <p className="text-red-500 text-xs italic"> Поле обов&#39;язкове</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="socialMedia">Соцмережі</label>
                        <Controller
                            name="socialMedia"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field}
                                id="socialMedia"
                                placeholder='Соцмережі'
                                className={`appearance-none border rounded-3xl border-gray-300  w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline`} />}
                        />

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Телефон:</label>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, pattern: /^(\+380\d{9})$/ }}
                            render={({ field }) => <input {...field}
                                id="phone"
                                placeholder='+380990000000'
                                className={`appearance-none border rounded-3xl ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline`} />}
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic">Введіть правильний формат телефону (+380XXXXXXXXX)</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">E-mail:</label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
                            render={({ field }) => <input {...field}
                                id="email"
                                placeholder='E-mail'
                                className={`appearance-none border rounded-3xl ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline`} />}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">Введіть правильний формат email(example@mail.com)</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Расскажите о себе и товаре который производите (мінімум 100 символів):</label>
                        <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, minLength: 10 }}
                            render={({ field }) => <textarea {...field}
                                id="description"
                                placeholder='Розкажіть про себе та товар який робите'
                                className={`appearance-none border rounded-3xl ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded w-full py-6 px-3 h-32 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline`} />}
                        />
                        {errors.description && <p className="text-red-500 text-xs italic">Мінімум 100 символів</p>}
                    </div>
                    <div className="mb-4 flex justify-center items-center">
                        <ButtonStyles
                            type="submit"
                            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  "

                        >
                            Відправити
                        </ButtonStyles>
                    </div>
                </form>
                <Image
                    src={'/images/gray.svg'}
                    alt="uzor"
                    width={1900}
                    height={253}
                    className=" absolute left-0 bottom-0 "
                    style={{
                        zIndex: 0,
                    }}
                />
            </div>
        </Layout >
    )
}

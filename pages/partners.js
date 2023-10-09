import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Layout from '../components/Layout'
import styled from 'styled-components'
import { sendPartnerForm } from '../lib/api'

export default function Partners() {
    const { handleSubmit, control, formState: { errors } } = useForm()

    const onSubmit = async (data) => {

        console.log(data)
        try {
            await sendPartnerForm(data);
            console.log("Form successfully submitted!");
            // Додаткові логіки, які ви хочете виконати після успішної відправки форми
        } catch (error) {
            console.error("Failed to submit form: ", error);
            // Додаткові логіки, які ви хочете виконати у випадку помилки відправки форми
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
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto py-5">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">Ім'я (Назва компанії):</label>
                    <Controller
                        name="companyName"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => <input {...field} id="companyName" className={`appearance-none border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} />}
                    />
                    {errors.companyName && <p className="text-red-500 text-xs italic">Поле обов'язкове</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Телефон:</label>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{ required: true, pattern: /^(\+380\d{9})$/ }}
                        render={({ field }) => <input {...field} id="phone" className={`appearance-none border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} />}
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">Введіть правильний формат телефону (+380XXXXXXXXX)</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
                        render={({ field }) => <input {...field} id="email" className={`appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} />}
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
                        render={({ field }) => <textarea {...field} id="description" className={`appearance-none border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} />}
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
        </Layout >
    )
}

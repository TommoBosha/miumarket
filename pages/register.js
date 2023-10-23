import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { getError } from '../utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function RegisterScreen({ setIsVisible }) {

    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name, email, password }) => {
        try {
            await axios.post('api/auth/signup', {
                name,
                email,
                password
            });

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
            setIsVisible(false)
        } catch (error) {
            toast.error(getError(error));
        }
    }

    return (

        <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)} >
            <h1 className='mb-4 text-xl'>Зареєструватись</h1>

            <div className='mb-4'>
                <label htmlFor='name'>Ім&#39;я</label>
                <input
                    type='text'
                    {...register('name', {
                        required: 'Додайте ваше ім&#39;я',

                    })}
                    className='w-full'
                    id='name'
                    autoFocus />
                {errors.name && (<div className='text-red-500'>{errors.name.message}</div>)}
            </div>

            <div className='mb-4'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    {...register('email', {
                        required: 'Додайте вашу пошту',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                            message: 'Невірна пошта',
                        }
                    })}
                    className='w-full'
                    id='email'
                />
                {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
            </div>

            <div className='mb-4'>
                <label htmlFor='password'>Пароль</label>
                <input
                    type='password'
                    {...register('password', {
                        required: 'Додайте ваш пароль',
                        minLength: { value: 6, message: 'Пароль повинен бути більше за 5 символів' },
                    })}
                    className='w-full'
                    id='password' />
                {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
            </div>

            <div className='mb-4'>
                <label htmlFor='confirmPassword'>Підтвердження пароля</label>
                <input
                    type='password'
                    {...register('confirmPassword', {
                        required: 'Додайте ваш пароль',
                        validate: (value) => value === getValues('password'),
                        minLength: {
                            value: 6,
                            message: 'Пароль повинен бути більше за 5 символів'
                        },
                    })}
                    className='w-full'
                    id='confirmPassword' />
                {errors.confirmPassword && (<div className='text-red-500'>{errors.confirmPassword.message}</div>)}
                {errors.confirmPassword &&
                    errors.confirmPassword.type === 'validate' && (
                        <div className='text - red - 500'>Паролі не співпадають</div>)}
            </div>

            <div className='mb-4'>
                <button className='primary-button'>Зареєструватись</button>
            </div>

        </form>

    )
}

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { getError } from '../utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


export default function LoginScreen({ setIsVisible }) {

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
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
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

        <form
            className='mx-auto '
            onSubmit={handleSubmit(submitHandler)} >
            <h1 className='mb-7 mt-14 text-center text-4xl font-bold'>Увійти</h1>
            <div className='mb-4 '>
                <label
                    className='pl-16 text-white'
                    htmlFor='email'>Email or Username</label>
                <input type='email'
                    {...register('email', {
                        required: 'Додайте вашу пошту',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                            message: 'Невірна пошта',
                        }
                    })}
                    className=' m-auto grid pl-6 rounded-3xl bg-white placeholder-slate-300'
                    style={{ width: '335px' }}
                    placeholder=' madeinua@gmail.com'
                    id='email'
                    autoFocus />
                {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
            </div>

            <div className='mb-10'>
                <label
                    className='pl-16 text-white'
                    htmlFor='password'>Пароль</label>
                <input type='password'
                    {...register('password', {
                        required: 'Додайте ваш пароль',
                        minLength: { value: 6, message: 'Пароль повинен бути більше за 5 символів' },
                    })}
                    className='  m-auto grid pl-6 rounded-3xl bg-white placeholder-slate-300 '
                    style={{ width: '335px' }}
                    placeholder='sfrhfdgt32'
                    id='password'
                    autoFocus />
                {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
            </div>

            <div className='mb-6 flex justify-center'>
                <button
                    style={{ width: '230px', backgroundColor: '#3ACCE9' }}
                    className='  rounded-3xl py-2 text-lg font-semibold uppercase text-white'
                >Увійти</button>
            </div>


        </form>

    )
}

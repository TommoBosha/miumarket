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

        <form className='mx-auto ' onSubmit={handleSubmit(submitHandler)} >
            <h1 className='mb-7 md:mb-5 mt-[34px] md:mt-[28px] xl:mt-10 text-center text-[24px] md:text-[27px]  uppercase  font-bold'>Реєстрація</h1>

            <div className='relative mb-8'>
                <label
                    className='block   text-[15px]  pl-4 md:pl-8  absolute top-[-10px] left-5 transform -translate-y-2/4 bg-transparent text-form'
                    htmlFor='name'>Ім&#39;я</label>
                <input
                    type='text'
                    {...register('name', {
                        required: 'Додайте ваше ім&#39;я',

                    })}
                    className='  mx-auto grid pl-6 h-[32px] md:h-[38px] rounded-3xl bg-white placeholder-slate-300 w-[276px] md:w-[335px] '
                    
                    placeholder='Made Ua'
                    id='name'
                    autoFocus />
                {errors.name && (<div className='text-red-500'>{errors.name.message}</div>)}
            </div>

            <div className='relative mb-8'>
                <label
                    className='block   text-[14px]  pl-4 md:pl-8 absolute top-[-10px] left-5 transform -translate-y-2/4 bg-transparent text-form'
                    htmlFor='email'>Email</label>
                <input
                    type='email'
                    {...register('email', {
                        required: 'Додайте вашу пошту',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                            message: 'Невірна пошта',
                        }
                    })}
                    className='  m-auto grid pl-6 h-[32px] md:h-[38px] rounded-3xl bg-white placeholder-slate-300 w-[276px] md:w-[335px] '
                  
                    placeholder='madeinua@gmail.com'
                    id='email'
                />
                {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
            </div>

            <div className='relative mb-8'>
                <label
                    className='block   text-[14px]  pl-4 md:pl-8 absolute top-[-10px] left-5 transform -translate-y-2/4 bg-transparent text-form'
                    htmlFor='password'>Пароль</label>
                <input
                    type='password'
                    {...register('password', {
                        required: 'Додайте ваш пароль',
                        minLength: { value: 6, message: 'Пароль повинен бути більше за 5 символів' },
                    })}
                    className='m-auto grid pl-6 h-[32px] md:h-[38px] rounded-3xl bg-white placeholder-slate-300 w-[276px] md:w-[335px]'
                    
                    placeholder='sfrhfdgt32'
                    id='password' />
                {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
            </div>

            <div className='relative mb-[18px]'>
                <label
                    className='block   text-[14px]  pl-4 md:pl-8 absolute top-[-10px] left-5 transform -translate-y-2/4 bg-transparent text-form'
                    htmlFor='confirmPassword'>Підтвердження пароля</label>
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
                    className='m-auto grid pl-6 h-[32px] md:h-[38px] rounded-3xl bg-white placeholder-slate-300 w-[276px] md:w-[335px]'
                    
                    placeholder='sfrhfdgt32'
                    id='confirmPassword' />
                {errors.confirmPassword && (<div className='text-red-500'>{errors.confirmPassword.message}</div>)}
                {errors.confirmPassword &&
                    errors.confirmPassword.type === 'validate' && (
                        <div className='text - red - 500'>Паролі не співпадають</div>)}
            </div>

            <div className='mb-[18px] md:mb-[15px] flex justify-center'>
                <button
                    style={{ width: '230px', backgroundColor: '#3ACCE9' }}
                    className=' mx-8 rounded-3xl py-2 text-[15px] md:text-[18px] font-semibold uppercase text-white'
                >Зареєструватись</button>
            </div>

        </form>

    )
}

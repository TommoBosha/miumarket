import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { getError } from '../utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function LoginScreen() {

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
        } catch (error) {
            toast.error(getError(error));
        }
    }

    return (
        <Layout>
            <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)} >
                <h1 className='mb-4 text-xl'>Login</h1>
                <div className='mb-4'>
                    <label htmlFor='email'>Email</label>
                    <input type='email'
                        {...register('email', {
                            required: 'Додайте вашу пошту',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                message: 'Невірна пошта',
                            }
                        })}
                        className='w-full' id='email' autoFocus />
                    {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
                </div>

                <div className='mb-4'>
                    <label htmlFor='password'>Password</label>
                    <input type='password'
                        {...register('password', {
                            required: 'Додайте ваш пароль',
                            minLength: { value: 6, message: 'Пароль повинен бути більше за 5 символів' },
                        })}
                        className='w-full' id='password' autoFocus />
                    {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
                </div>

                <div className='mb-4'>
                    <button className='primary-button'>Login</button>
                </div>
                <div className='mb-4'>
                    Новий користувач? &nbsp;
                    <Link href='register' style={{
                        color: "#3ACCE9",
                    }}>Зареєструватись</Link>
                </div>
            </form>
        </Layout>
    )
}

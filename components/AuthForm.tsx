"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {signIn, signUp} from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            if(type === 'sign-up'){
                const newUser = await signUp(data);
                setUser(newUser);
            }
            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })
                if(response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className=' flex cursor-pointer items-center gap-1'>
                    <Image src="/icons/logo.svg" width={34} height={34} alt='logo' />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>DigiBank</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Conectar conta' : type === 'sign-in' ? 'Entrar' : 'Criar conta'}
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Conecte sua conta para começar' : 'Por favor, digite suas informações'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>

                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="firstName" label="Primeiro nome" placeholder="Digite seu nome" />
                                        <CustomInput control={form.control} name="lastName" label="Sobrenome" placeholder="Digite seu sobrenome" />
                                    </div>
                                        <CustomInput control={form.control} name="address1" label="Endereço" placeholder="Digite seu endereço" />
                                        <CustomInput control={form.control} name="city" label="Cidade" placeholder="Digite sua cidade" />
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="state" label="UF" placeholder="ex: SP" />
                                        <CustomInput control={form.control} name="postalCode" label="CEP" placeholder="ex: 00000-000" />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name="dateOfBirth" label="Data de nascimento" placeholder="DD-MM-AAAA" />
                                        <CustomInput control={form.control} name="cpf" label="CPF" placeholder="ex: 00000000000" />    
                                    </div>
                                </>
                            )}
                            <CustomInput control={form.control} name="email" label="Email" placeholder="Digite seu email" />
                            <CustomInput control={form.control} name="password" label="Senha" placeholder="Digite sua senha" />
                            <div className='flex flex-col gap-4'>
                                <Button className='form-btn' type='submit' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp; Carregando...
                                        </>
                                    ) : type === 'sign-in' ? 'Entrar' : 'Cadastrar'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in' ? "Não possui uma conta?" : "Já possui uma conta?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Cadastre-se' : 'Entrar'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
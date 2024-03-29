'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import Button from '@/src/components/Buttons/button';
import Link from 'next/link';

export default function Navbar() {
    const [loading, setLoading] = useState<boolean>()
    return (
        <div className='bg-white fixed w-full h-16 px-5 flex items-center md:px-[9%] justify-between z-[100]'>
            <div className='flex items-center gap-10'>
                <Image
                    priority={true}
                    placeholder='empty'
                    src="/logo.png"
                    alt="DeferAlly Logo"
                    width={70}
                    height={70}
                    className='cursor-pointer'
                />
                <span className='cursor-pointer'>
                    Ask Plutus
                </span>
                <span className='cursor-pointer'>
                    Contact us
                </span>
                <span className='cursor-pointer'>
                    About us
                </span>
            </div>
            <div className='flex gap-2'>
                <Link href="/login">
                <Button
                    type="button"
                    text="Login"
                    disabled={loading}
                />                    
                </Link>
                <Link href="/signup">
                <Button
                    type="button"
                    text="Register"
                    disabled={loading}
                />
                </Link>
            </div>
        </div>
    )
}

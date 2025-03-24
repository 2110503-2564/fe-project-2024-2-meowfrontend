'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Banner () {
    const covers = ['/img/banner1.2.png', '/img/banner2.1.jpg', '/img/banner3.1.jpg', '/img/banner4.1.jpg' ]
    const [index, setIndex] = useState(0)
    const router = useRouter()

    const { data: session } = useSession()
    console.log(session?.user.token)
    console.log(session)

    return (
        <div className={styles.banner} onClick={()=>{ setIndex(index+1 )}}>  
            <Image src={covers[index%4]} 
            alt='cover'
            fill={true}
            priority 
            objectFit='cover'/>
            <div className={styles.bannerText}>
            <h1 className='text-5xl font-sans'>Unwind Your Body, Refresh Your Mind</h1>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl'>
                    Welcome {session.user?.name}</div>
                    : null
            }
            <button className='bg-white text-yellow-950 border border-yellow-950
                font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
                hover:bg-yellow-950 hover:text-white hover:border-transparent'
                onClick={(e)=>{e.stopPropagation();router.push('/venue')}}
                >
                SELECT SHOP
            </button>           
        </div>
    );
}
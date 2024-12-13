import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { MdEmail } from 'react-icons/md'
import { BsWhatsapp } from 'react-icons/bs'

const Footer = () => {
  return (
    <div id='footer' className='mt-20 mb-20 w-full flex flex-col gap-5  text-neutral-500 dark:text-neutral-400 font-medium text-sm max-w-4xl mx-auto'>
      <Separator className='mt-10 bg-neutral-500 dark:bg-neutral-500 max-w-6xl w-full'/>
      <div className='flex justify-around items-start mt-5 mb-10'>
        <div className='flex flex-col items-start gap-5'>
          <Link href={'/#home'}>
            Home
          </Link>
          <Link href={'/#featured'}>
            Features
          </Link>
          <Link href={'/#testimonials'}>
            Testimonials
          </Link>
          <Link href={'/#pricing'}>
            Pricing
          </Link>
        </div>
        <div className='flex flex-col items-start gap-5'>
          <Link href={'https://github.com/vector17002/DevSync'} target='_blank'>
           Github
          </Link>
          <Link href={'https://www.linkedin.com/in/ansh-kumain/'} target='_blank'>
           Instagram
          </Link>
          <Link href={'https://x.com/ansh_kumain'} target='_blank'>
            Twitter
          </Link>
        </div>
        <div className='flex flex-col items-start gap-5'>
            <a href='https://mail.google.com/mail/?view=cm&to=anshk17002@gmail.com' target='_blank' className='flex gap-2 items-center'> <MdEmail className='h-4 w-4'/>
              <p>Email</p> </a>
              <a href='https://wa.me/9625400635' target='_blank' className='flex gap-2 items-center'> <BsWhatsapp className='h-4 w-4'/>
              <p>Whatsapp</p> </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
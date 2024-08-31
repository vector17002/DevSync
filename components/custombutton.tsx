import Link from 'next/link'
import { Button } from './ui/button'

const CustomButton = ({value , link , className} : {value: string , link: string , className: string}) => {
  return (
    <Button asChild className='w-full px-4 rounded-xl dark:text-white dark:bg-black font-bold  hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-slate-500 border-2'>
        <Link href={link}>{value}</Link>
    </Button>
  )
}

export default CustomButton
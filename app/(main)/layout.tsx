import Navbar from '@/components/main/navbar'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default layout
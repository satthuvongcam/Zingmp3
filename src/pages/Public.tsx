import Sidebar from '~/components/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '~/components/Header'
import { useEffect, useState } from 'react'
import Player from '~/components/Player'
const Public = () => {
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      console.log('window.scrollY: ', window.scrollY > 10);
      if (window.scrollY > 0) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='w-full relative h-screen flex flex-col bg-[#CED9D9]'>
      <div className='w-full h-full flex flex-auto'>
        <div className='w-[240px] h-full flex-none fixed left-0 top-0'>
          <Sidebar />
        </div>
        <div className='flex-auto ml-[240px]'>
          <div
            className={`h-[70px] flex items-center flex-1 mb-5  ${
              isFixed
                ? 'fixed z-[100] left-[240px] right-[0] bg-[#ced9d9cc] shadow-[0_3px_5px_rgba(0,0,0,.08)]'
                : ''
            }`}
          >
            <Header />
          </div>
          <Outlet />
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 h-[90px]'>
        <Player />
      </div>
    </div>
  )
}

export default Public

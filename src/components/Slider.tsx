import axios from 'axios'
import React, { useEffect } from 'react'
import { useAppSelector } from '~/redux/hooks'
import { selectBanner } from '~/redux/slices/homeSlice'

const Slider = () => {
  const banner = useAppSelector(selectBanner)

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex w-full gap-8 pt-8'>
        {banner?.map((item, index) => (
          <>
            <img src={item.banner} alt='Banner' key={item.encodeId} className='' />
          </>
        ))}
      </div>
    </div>
  )
}

export default Slider

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { selectBanner } from '~/redux/slices/homeSlice'
import { getArrSlider, handleShowImgBanner } from '~/utils/functions'
import icons from '~/utils/icons'
import { ItemHome } from '~/models/homeInterfaces'
import { setIsAlbum, setCurrentSongId, setPlay } from '~/redux/slices/musicSlice'
import { useNavigate } from 'react-router-dom'

const { GoChevronLeft, GoChevronRight } = icons

const Slider = () => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()
  const [count, setCount] = useState<number>(0)
  const [elementBannerShow, setElementBannerShow] = useState<number[]>([0, 1, 2])

  const banner = useAppSelector(selectBanner)
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  useEffect(() => {
    const sliderEls = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2
    const IntervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1)
      handleShowImgBanner(list, sliderEls, min, max, false)

      min = min === sliderEls.length - 1 ? 0 : min + 1
      max = max === sliderEls.length - 1 ? 0 : max + 1
      setElementBannerShow([min, min + 1, max])
    }, 3000)
    setIntervalId(IntervalId)
    return () => {
      IntervalId && clearInterval(IntervalId)
    }
  }, [count])

  const handlePrevImageBanner = () => {
    const sliderEls = document.getElementsByClassName('slider-item')
    const newImgBannerShow = elementBannerShow.map((item) => {
      if (item === 0) {
        item = elementBannerShow.length - 1
      } else {
        item -= 1
      }
      return item
    })
    setElementBannerShow(newImgBannerShow)
    handleShowImgBanner(
      newImgBannerShow,
      sliderEls,
      elementBannerShow[elementBannerShow.length - 1],
      elementBannerShow[0],
      true
    )
  }

  const handleNextImageBanner = () => {
    const sliderEls = document.getElementsByClassName('slider-item')

    const newImgBannerShow = elementBannerShow.map((item) => {
      if (item === elementBannerShow.length - 1) {
        item = 0
      } else {
        item += 1
      }
      return item
    })
    setElementBannerShow(newImgBannerShow)
    handleShowImgBanner(
      newImgBannerShow,
      sliderEls,
      elementBannerShow[0],
      elementBannerShow[elementBannerShow.length - 1],
      false
    )
  }

  const handleClickBanner = (item: ItemHome) => {
    if (item?.type === 1) {
      dispatch(setCurrentSongId(item.encodeId))
      dispatch(setPlay(true))
      dispatch(setIsAlbum(false))
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split('.')[0]
      nav(albumPath)
    } else {
      dispatch(setIsAlbum(false))
    }
  }

  return (
    <div
      onMouseEnter={() => {
        clearInterval(intervalId)
      }}
      onMouseLeave={() => {
        setCount((prev) => prev + 1)
      }}
      className='w-full overflow-hidden hover:cursor-pointer px-[59px]'
    >
      <div className='flex w-full gap-8 mt-8 relative group'>
        {banner?.map((item, index) => {
          return (
            <img
              src={item.banner}
              alt='Banner'
              key={item.encodeId}
              onClick={() => handleClickBanner(item)}
              className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
                index <= 2 ? 'block' : 'hidden'
              }`}
            />
          )
        })}
        <div
          onClick={handlePrevImageBanner}
          className='invisible group-hover:visible z-10 flex justify-center items-center opacity-1 hover:opacity-[0.8] rounded-[50%] shadow-[0_2px_4px_rgba(226, 102, 102, .15)] cursor-pointer text-white -translate-y-1/2 bg-[#ffffff26] absolute top-[50%] left-[10px] w-[55px] h-[55px]'
        >
          <GoChevronLeft size={36} />
        </div>
        <div
          onClick={handleNextImageBanner}
          className='invisible group-hover:visible z-10 flex justify-center items-center opacity-1 hover:opacity-[0.8] rounded-[50%] shadow-[0_2px_4px_rgba(226, 102, 102, .15)] cursor-pointer text-white -translate-y-1/2 bg-[#ffffff26] absolute top-[50%] right-[10px] w-[55px] h-[55px]'
        >
          <GoChevronRight size={36} />
        </div>
      </div>
    </div>
  )
}

export default Slider

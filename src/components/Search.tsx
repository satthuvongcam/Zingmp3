import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { homeApi } from '~/apis'
import { ItemData } from '~/models/homeInterfaces'
import { ListItemSong } from '~/models/musicInterfaces'
import icons from '~/utils/icons'
import BgImage from './BgImage'
import { compareText, toNonAccentVietnamese } from '~/utils/functions'

const { AiOutlineSearch, IoTrendingUpSharp } = icons

interface Course {
  id: number
  title: string
  image: string
  name_author: string
}
interface Teacher {
  id: number
  name: string
  avatar: string
}
interface DataSearch {
  course: Course | null
  teacher: Teacher | null
}

interface PaginationPage {
  pageSize: number
  totalPage: number
}

const { IoPlay, BsDot } = icons

const Search = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [dataSearch, setDataSearch] = useState<ListItemSong[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [infoPagination, setInfoPagination] = useState<PaginationPage>({
    pageSize: 5,
    totalPage: 1
  })
  const [searchText, setSearchText] = useState('')
  const [suggestSearch, setSuggestSearch] = useState<ItemData[]>([])
  const [typeSearch, setTypeSearch] = useState<string>('')

  const currentLocation = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (currentLocation.current) {
      const { clientHeight, scrollHeight, scrollTop } = currentLocation.current
      if (Math.round(scrollTop) + clientHeight === scrollHeight) {
        if (currentPage < infoPagination.totalPage) {
          setCurrentPage((cur) => cur + 1)
        }
      }
    }
  }

  // const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(e.target.value)
  //   setDataSearch([])
  //   setCurrentPage(1)
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await homeApi.getSuggest()
        setSuggestSearch(response.topSuggest)
        const response1 = await homeApi.search('noi nay')
        console.log('response1: ', response1)
        const data = response1
        const type = response1.top.objectType + 's'
        setTypeSearch(type)
        setDataSearch(data[type])
        const newText = toNonAccentVietnamese('Nơi đâu cần em')
        const compareResult = compareText(newText, 'noi nay')
        console.log('compareResult: ', compareResult);
        // data[type].map((item: any) => {
        //   if (item.title.includes('noi nay')) {
        //     console.log('item: ', item)
        //   }
        // })
        // if (dataSearch.length == 0) {
        //   setDataSearch(data)
        // } else {
        //   setDataSearch([...dataSearch, ...data])
        // }
        // setCurrentPage(response.data.result.page)
        // setInfoPagination({
        //   pageSize: response.data.result.size,
        //   totalPage: response.data.result.total_page
        // })
      } catch (error) {
        console.log('Failed fetch data', error)
      }
    }
    fetchData()
  }, [currentPage, searchText])

  // const compareText = (data: ListItemSong[]) => {
  //   const newData = data.map((item) => {
  //     const searchText = 'noi nay'
  //     const newSearchText = searchText.trim().toLowerCase()
  //     const itemInclude = item?.title.trim().toLowerCase()
  //     return item?.title.includes(searchText) ? item : ''
  //   })
  //   console.log('newData: ', newData)
  // }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (isOpenDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // Clicked outside the modal, close it
        setIsOpenDropdown(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpenDropdown])

  return (
    <>
      <div
        onClick={(e) => {
          console.log(e)
          setIsOpenDropdown(true)
        }}
        ref={dropdownRef}
        className={`w-full flex items-center max-w-[440px] relative ${
          isOpenDropdown
            ? 'shadow-[0_1px_5px_0_rgba(0,0,0,.2)] border-[1px] border-solid border-transparent rounded-tr-[20px] rounded-tl-[20px]'
            : 'shadow-none'
        }`}
      >
        <span
          className={`${
            isOpenDropdown ? 'rounded-tl-[20px]' : 'rounded-l-[20px]'
          } text-gray-500 h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center cursor-pointer`}
        >
          <AiOutlineSearch size={20} />
        </span>
        <input
          type='text'
          // onChange={handleChangeSearchText}
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
          className={`bg-[#DDE4E4] w-full text-gray-500 px-4 py-2 ${
            isOpenDropdown ? 'rounded-tr-[20px]' : 'rounded-r-[20px]'
          } h-10 border-none focus:ring-0`}
        />

        <div
          className={`${
            isOpenDropdown ? 'block' : 'hidden'
          } w-full h-auto z-[40] overflow-hidden bg-[#DDE4E4] absolute top-10 rounded-b-[20px] shadow-[0_4px_6px_0_rgba(32,33,36,.28)] py-[13px] px-[10px] text-[#32323d]`}
        >
          <div className='overflow-y-auto calc-500'>
            {dataSearch.length === 0 ? (
              <>
                <div className='text-[14px] font-bold px-[10px] pb-2 flex justify-between'>
                  Đề xuất cho bạn
                </div>
                {suggestSearch?.slice(0, 6)?.map((item) => (
                  <div key={item?.encodeId} className='text-[#32323d] text-[14px]'>
                    <NavLink
                      to=''
                      className='flex items-center gap-2 rounded-[4px] py-2 px-[10px] cursor-pointer hover:bg-[#ffffff4d]'
                    >
                      <div className='flex items-center'>
                        <IoTrendingUpSharp size={16} />
                      </div>
                      <span className='font-semibold'>{item.title !== null && item.title}</span>
                    </NavLink>
                  </div>
                ))}
              </>
            ) : (
              <div className='px-[10px]'>
                <div className='text-[14px] font-bold px-[10px] pb-2 flex justify-between'>
                  Từ khóa liên quan
                </div>
                <div className='text-[14px] mt-[10px] pt-[10px] border-t-[1px] border-solid border-[#0000001a] font-bold px-[10px] pb-2 flex justify-between'>
                  Gợi ý kết quả
                </div>
                {dataSearch?.map((item) => {
                  let totalFollow = ''
                  if (item?.totalFollow) {
                    if (item?.totalFollow < 1000) {
                      totalFollow = item?.totalFollow + ' người quan tâm'
                    } else if (item?.totalFollow < 1000000) {
                      totalFollow = Math.round(item?.totalFollow / 1000) + 'K quan tâm'
                    } else {
                      totalFollow = Math.round(item?.totalFollow / 1000000) + 'M quan tâm'
                    }
                  }
                  return (
                    <div
                      key={item?.encodeId}
                      className='px-[10px] py-[8px] flex group items-center gap-3 hover:cursor-pointer hover:bg-[#ffffff4d]'
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`${
                          typeSearch === 'artists' ? 'rounded-full' : 'rounded'
                        } w-[52px] h-[52px] overflow-hidden relative`}
                      >
                        {typeSearch === 'artists' || typeSearch === 'playlists' ? (
                          <img
                            src={item?.thumbnail}
                            alt='Avatar'
                            className='w-full h-full rounded-full object-contain'
                          />
                        ) : (
                          <BgImage
                            Data={item}
                            Icon={IoPlay}
                            Style={{
                              rounded: typeSearch === 'artists' ? 'rounded-full' : 'rounded',
                              width: 6,
                              height: 6,
                              iconSize: 20,
                              isCircle: false
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <div className='text-sm text-[#32323D] font-medium hover:text-[#0e8080]'>
                          {typeSearch === 'artists' ? item?.name : item?.title}
                        </div>
                        <div className='flex items-center text-xs text-[#696969]'>
                          <span>
                            {typeSearch === 'artists'
                              ? 'Nghệ sĩ'
                              : typeSearch === 'playlists'
                              ? 'Playlist'
                              : ''}
                          </span>
                          <span>
                            {typeSearch === 'artists' || typeSearch === 'playlists' ? (
                              <BsDot size={20} />
                            ) : (
                              ''
                            )}
                          </span>
                          <span className='mt-[2px]'>
                            {typeSearch === 'artists' ? totalFollow : item?.artists[0].name}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search

import axios from 'axios'
import React, { useEffect, useState, useRef, UIEvent } from 'react'
import { NavLink } from 'react-router-dom'
import icons from '~/utils/icons'

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

const Search = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [dataSearch, setDataSearch] = useState<DataSearch[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [infoPagination, setInfoPagination] = useState<PaginationPage>({
    pageSize: 5,
    totalPage: 1
  })
  const [searchText, setSearchText] = useState('')

  const currentLocation = useRef<HTMLDivElement>(null)

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

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setDataSearch([])
    setCurrentPage(1)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://3b2a-42-119-83-189.ngrok-free.app/api/v1/courses/search-global?page=${currentPage}&size=${infoPagination.pageSize}&search=${searchText}`
        )
        const data = response.data.result.items
        if (dataSearch.length == 0) {
          setDataSearch(data)
        } else {
          setDataSearch([...dataSearch, ...data])
        }
        setCurrentPage(response.data.result.page)
        setInfoPagination({
          pageSize: response.data.result.size,
          totalPage: response.data.result.total_page
        })
      } catch (error) {
        console.log('Failed fetch data', error)
      }
    }
    fetchData()
  }, [currentPage, searchText])
  return (
    <>
      <div
        className={`w-full flex items-center max-w-[440px] relative ${
          isOpenDropdown
            ? 'shadow-[0_1px_5px_0_rgba(0,0,0,.2)] border-[1px] border-solid border-transparent rounded-tr-[20px] rounded-tl-[20px]'
            : 'shadow-none'
        }`}
        onClick={(e) => {
          console.log(e);
          setIsOpenDropdown(!isOpenDropdown)
        }}
        onBlur={() => setIsOpenDropdown(false)}
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
          onChange={handleChangeSearchText}
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
          className={`bg-[#DDE4E4] w-full text-gray-500 px-4 py-2 ${
            isOpenDropdown ? 'rounded-tr-[20px]' : 'rounded-r-[20px]'
          } h-10 border-none focus:ring-0`}
        />

        <div
          className={`${
            isOpenDropdown ? 'block' : 'hidden'
          } w-full h-auto overflow-hidden bg-[#DDE4E4] z-[5] absolute top-10 rounded-b-[20px] shadow-[0_4px_6px_0_rgba(32,33,36,.28)] py-[13px] px-[10px] text-[#32323d]`}
        >
          <div className='overflow-y-auto calc-400' ref={currentLocation} onScroll={handleScroll}>
            <div className='text-[14px] font-bold px-[10px] pb-2 flex justify-between'>
              Đề xuất cho bạn
            </div>
            {dataSearch?.map((item, index) => (
              <div key={index} className='text-[#32323d] text-[14px]'>
                <NavLink
                  to=''
                  className='flex items-center gap-2 items-baseline rounded-[4px] py-2 px-[10px] cursor-pointer hover:bg-[#ffffff4d] hover:text-[#0F7070]'
                >
                  <div className='flex items-center'>
                    <IoTrendingUpSharp size={16} />
                  </div>
                  <span className='font-semibold'>
                    {item.teacher !== null ? item.teacher.name : 'Không có teacher'}
                  </span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search

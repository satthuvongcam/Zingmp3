import React from 'react'
import icons from '~/utils/icons'

const { AiOutlineSearch } = icons

const Search = () => {
  return (
    <div className='w-full flex items-center max-w-[440px]'>
      <span className='rounded-l-[20px] text-gray-500 h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center cursor-pointer'>
        <AiOutlineSearch size={20} />
      </span>
      <input
        type='text'
        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        className='bg-[#DDE4E4] w-full text-gray-500 px-4 py-2 rounded-r-[20px] h-10 border-none focus:ring-0'
      />
    </div>
  )
}

export default Search

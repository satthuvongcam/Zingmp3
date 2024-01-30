import logo from '~/assets/images/logo-light.svg'
import { sidebarMenu } from '~/utils/menu'
import { NavLink, useNavigate } from 'react-router-dom'
import icons from '~/utils/icons'

const { IoPlayCircleOutline } = icons

const Sidebar = () => {
  const nav = useNavigate()

  return (
    <div className='flex flex-col bg-[#DDE4E4] h-full'>
      <div
        onClick={() => {
          nav('')
        }}
        className='w-full pl-7 pr-[25px] py-[15px] height-[70px] flex justify-start items-center'
      >
        <img src={logo} alt='Logo' className='w-[120px] h-10 cursor-pointer' />
      </div>
      <div className='flex flex-col'>
        {sidebarMenu.map((item, index) => (
          <NavLink
            to={item.path}
            key={index.toString()}
            end={item.end}
            title={item.title}
            className={({ isActive }) =>
              isActive
                ? 'py-3 px-[21px] relative text-[14px] text-[#0F7070] bg-[#e7ecec] border-l-[2px] border-l-[#0F7070]'
                : 'py-3 px-[21px] relative text-[14px] text-[#32323D]'
            }
          >
            <div className='flex items-center gap-3 font-semibold group hover:text-[#0F7070]'>
              <item.icon />
              <span>{item.title}</span>
              <span className='absolute right-[30px] invisible group-hover:visible'>
                <IoPlayCircleOutline size={20} />
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar

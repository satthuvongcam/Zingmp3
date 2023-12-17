import icons from "./icons";

const { discoverIcon, zingChartIcon, radioIcon, libraryIcon  } = icons

interface SidebarMenu {
  path: string,
  title: string,
  end?: boolean,
  icon: React.ComponentType
}

export const sidebarMenu: SidebarMenu[] = [
  {
    path: '',
    title: 'Khám Phá',
    end: true,
    icon: discoverIcon
  },
  {
    path: 'zing-chart',
    title: '#zingchart',
    icon: zingChartIcon
  },
  {
    path: 'radio',
    title: 'Radio',
    icon: radioIcon
  },
  {
    path: 'mymusic',
    title: 'Thư Viện',
    icon: libraryIcon
  },
]
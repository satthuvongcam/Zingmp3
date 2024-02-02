import { Artists } from './musicInterfaces'

export interface ItemHome {
  type: number
  link: string
  banner: string
  cover: string
  target: string
  title: string
  description: string
  ispr: number
  encodeId: string
}

export interface ListItemHome {
  sectionType: string
  viewType: string
  title: string
  link: string
  sectionId: string
  items: ItemHome[]
}

export interface ItemData {
  encodeId: string
  title: string
  artistsNames: string
  artists: Artists[]
  thumbnailM: string
  link: string
  thumbnail: string
  sortDescription: string
  releaseDate: number
}

export interface Data {
  items: ItemData[]
  title: string
  link: string
}

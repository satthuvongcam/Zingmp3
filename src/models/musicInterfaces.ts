export interface SongInfoDetail {
  thumbnail: string
  title: string
  artistName: string
}

export interface PlaylistInfo {
  encodeId: string
  title: string
  thumbnail: string
  link: string
  artists: Artists[]
  artistsNames: string
  thumbnailM: string
  sortDescription: string
  contentLastUpdate: number
  artist: Artist
  song: SongInfo
  like: number
}

export interface Artists {
  id: string
  name: string
  link: string
  thumbnail: string
  thumbnailM: string
  playlistId: string | null
  totalFollow: number | null;
}

export interface Artist {
  id: string
  name: string
  link: string
  playlistId: string
  cover: string
  thumbnail: string
}

export interface SongInfo {
  items: ListItemSong[]
  total: number
  totalDuration: number
}

export interface ListItemSong {
  encodeId: string
  title: string
  artistsNames: string
  artists: Artists[]
  thumbnailM: string
  link: string
  thumbnail: string
  duration: number
  album: Album
  total: number
  totalDuration: number
  releaseDate: number
}

export interface Album {
  encodeId: string
  title: string
  thumbnail: string
  link: string
  artists: Artists[]
  artistsNames: string;
}

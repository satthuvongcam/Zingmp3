import { createSlice, PayloadAction } from '@reduxjs/toolkit/react'
import { ListItemSong } from '~/models/musicInterfaces'
import type { RootState } from '~/redux/store'

interface InitialState {
  currentSongId: string
  isPlaying: boolean
  isAlbum: boolean
  playlist: ListItemSong[]
  originalPlaylist: ListItemSong[]
}

const initialState: InitialState = {
  currentSongId: '',
  isPlaying: false,
  isAlbum: false,
  playlist: [],
  originalPlaylist: []
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentSongId: (state, action: PayloadAction<string>) => {
      state.currentSongId = action.payload
    },
    setPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setIsAlbum: (state, action: PayloadAction<boolean>) => {
      state.isAlbum = action.payload
    },
    setPlaylist: (state, action: PayloadAction<ListItemSong[]>) => {
      state.playlist = action.payload
    },
    setOriginalPlaylist: (state, action: PayloadAction<ListItemSong[]>) => {
      state.originalPlaylist = action.payload
    }
  }
})

export const { setCurrentSongId, setPlay, setIsAlbum, setPlaylist, setOriginalPlaylist } = musicSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSong = (state: RootState) => state.music.currentSongId
export const selectIsPlaying = (state: RootState) => state.music.isPlaying
export const selectIsAlbum = (state: RootState) => state.music.isAlbum
export const selectPlaylist = (state: RootState) => state.music.playlist
export const selectOriginalPlaylist = (state: RootState) => state.music.originalPlaylist
export default musicSlice.reducer

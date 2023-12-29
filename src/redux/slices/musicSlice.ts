import { createSlice, PayloadAction } from '@reduxjs/toolkit/react'
import type { RootState } from '~/redux/store'

interface InitialState {
  currentSongId: string;
  isPlaying: boolean;
}

const initialState: InitialState = {
  currentSongId: '',
  isPlaying: false
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
    }
  }
})  

export const { setCurrentSongId, setPlay } = musicSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentSong = (state: RootState) => state.music.currentSongId
export const selectIsPlaying = (state: RootState) => state.music.isPlaying
export default musicSlice.reducer

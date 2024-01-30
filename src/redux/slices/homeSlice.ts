import { createSlice, PayloadAction } from '@reduxjs/toolkit/react'
import type { RootState } from '~/redux/store'
import { ItemHome, ListItemHome } from '~/models/homeInterfaces'
import { ListSongRelease } from '~/models/musicInterfaces'

interface InitialState {
  banner: ItemHome[]
  homeData: ListItemHome[]
  releaseData: ListSongRelease
}

const initialState: InitialState = {
  banner: [],
  homeData: [],
  releaseData: {
    all: [],
    vPop: [],
    others: []
  }
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getHome: (state, action: PayloadAction<ListItemHome[]>) => {
      state.homeData = action.payload
    },
    getBanner: (state, action: PayloadAction<ItemHome[]>) => {
      state.banner = action.payload
    },
    getSongRelease: (state, action: PayloadAction<ListSongRelease>) => {
      state.releaseData = action.payload
    }
  }
})

export const { getHome, getBanner, getSongRelease } = homeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBanner = (state: RootState) => state.home.banner
export const selectHome = (state: RootState) => state.home.homeData
export const selectSongRelease = (state: RootState) => state.home.releaseData
export default homeSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit/react'
import type { RootState } from '~/redux/store'
import { ItemBanner, ItemHome } from '~/models/homeInterfaces'

interface InitialState {
  banner: ItemBanner[]
  homeData: ItemHome[]
}

const initialState: InitialState = {
  banner: [],
  homeData: []
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getHome: (state, action: PayloadAction<ItemHome[]>) => {
      state.homeData = action.payload
    },
    getBanner: (state, action: PayloadAction<ItemBanner[]>) => {
      state.banner = action.payload
    }
  }
})

export const { getHome, getBanner } = homeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBanner = (state: RootState) => state.home.banner
export const selectHome = (state: RootState) => state.home.homeData
export default homeSlice.reducer

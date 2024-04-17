import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CardState {
  title: number
}

const initialState: CardState = {
  title: 0
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard: (state, action: PayloadAction<number>) => {
      state.title = action.payload
    }
  }
})

export const { setCard } = cardSlice.actions
export const selectCard = (state: { card: CardState }) => state.card.title

export default cardSlice.reducer

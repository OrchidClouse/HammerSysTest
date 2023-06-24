import {createSlice} from "@reduxjs/toolkit";

const initialState = []
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, {payload: user}) => {
      if(state.some(u => u.id === user.id)){
        return
      }
      state.push(user)
    }
  }
})

export const {actions, reducer} = userSlice
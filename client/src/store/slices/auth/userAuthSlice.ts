import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {checkUserAuthStatus} from "../../../services/user"

interface UserAuthState{
   isLogedIn: boolean;
}

const initialState: UserAuthState = {
    isLogedIn: checkUserAuthStatus()
}

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setIsLogedIn: (state, action: PayloadAction<boolean>) => {
            state.isLogedIn = action.payload
        },
        setLogOut: (state)=>{
            // also clear the tokens in local storage
           localStorage.clear();
           state.isLogedIn = false;
        }
    }
})


export const { setIsLogedIn, setLogOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
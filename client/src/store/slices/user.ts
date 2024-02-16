import { createSlice } from '@reduxjs/toolkit'
import {checkUserAuthStatus} from "../../services/user"
import {ResponseUserInfo, getUserDetails} from "../../services/user"

interface UserAuthState{
   isLogedIn: boolean;
   userDetails: ResponseUserInfo | null | undefined;
}
// ResponseUserInfo
const initialState: UserAuthState = {
    isLogedIn: checkUserAuthStatus(),
    userDetails : getUserDetails(),
}

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setIsLogedIn: (state, action ) => {            
            state.isLogedIn = true;
            const userinfo : ResponseUserInfo = action.payload
            state.userDetails =  userinfo;
            return state
        },
        setLogOut: (state)=>{
            // also clear the tokens in local storage
           localStorage.clear();
           state.isLogedIn = false;
           return state
        }
    }
})


export const { setIsLogedIn, setLogOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
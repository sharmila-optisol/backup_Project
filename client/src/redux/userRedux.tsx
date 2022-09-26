import {createSlice} from '@reduxjs/toolkit';


const userSlice =createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFetching:false,
        // filteredUser:[],
        isLoading:true,         
        error:false
    },
    reducers:{
        loginStart:(state)=>{state.isFetching=true;
            state.error=false;},
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.currentUser = null;

          },
          registerStart:(state)=>{state.isFetching=true},
        registerSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        registerFailure:(state)=>{  
            state.isFetching=false;
            state.error=true;
        }, 
     
    }
      
}, 

)

export const {loginStart,loginSuccess,loginFailure,logout,registerStart,registerSuccess,registerFailure,
   } = userSlice.actions;
export default userSlice.reducer; 
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess,} from "./userRedux";
import { baseRequest } from "../requestMethod";


export const login =async (dispatch,user)=>{
    dispatch(loginStart());
    try{
       const res = await baseRequest.post("/login",user);
       dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure())
    }
}
export const googleLogin =async (dispatch,user)=>{
    dispatch(loginStart());
    try{
       const res = await baseRequest.post("/googleLogin",user);
       dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure())
    }
}
export const register =async (dispatch,user)=>{
    dispatch(registerStart());
    try{
       const res = await baseRequest.post("/register",user);
       dispatch(registerSuccess(res.data));
    }catch(err){
        dispatch(registerFailure())
    }
}


export const url = "http://localhost:4000/";
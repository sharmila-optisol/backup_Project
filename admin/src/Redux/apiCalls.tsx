import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { baseRequest, userRequest } from "../requestMethods";
import { getProductFailure, getProductStart, getProductSuccess,deleteProductStart, deleteProductSuccess, deleteProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, addProductStart, addProductSuccess, addProductFailure} from "./productRedux";
import { getUserStart,getUserSuccess, getUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, updateUserStart, updateUserSuccess, updateUserFailure, addUserStart, addUserSuccess, addUserFailure} from "./userProductRedux";
export const login =async (dispatch:any,user:any)=>{
    dispatch(loginStart());
    try{
       const res = await baseRequest.post("/auth/login",user);
       dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure())
    }
}
//getproducts
export const getProducts =async (dispatch:any)=>{
    dispatch(getProductStart());
    try{
       const res = await baseRequest.get("/products");
       dispatch(getProductSuccess(res.data));
    }catch(err){
        dispatch(getProductFailure())
    }
}
//deleteproducts
export const deleteProducts =async (id,dispatch:any)=>{
    dispatch(deleteProductStart());
    try{
    //    const res = await userRequest.delete(`/products/${id}`);
       dispatch(deleteProductSuccess(id));
    }catch(err){
        dispatch(deleteProductFailure())
    }
}
//updateproducts
export const updateProducts =async (id,product,dispatch:any)=>{
    dispatch(updateProductStart());
    try{
    // update
       const res = await userRequest.put(`/products/${id}`,product)
        console.log(product)
       dispatch(updateProductSuccess({ id,product}));
    }catch(err){
        dispatch(updateProductFailure())
    }
}
//addproducts
export const addProducts =async (product,dispatch:any)=>{
    dispatch(addProductStart());
    try{
    // create
    const res = await userRequest.post(`/products`,product)
       dispatch(addProductSuccess(res.data));
    }catch(err){
        dispatch(addProductFailure())
    }
}
//getuser
export const getUser =async (dispatch:any)=>{
    await dispatch(getUserStart());
    try{
        // console.log("hi");
        
       const res = await userRequest.get("/users");     
       console.log(res.data);
        dispatch(getUserSuccess(res.data));
    }catch(err){
         dispatch(getUserFailure())
    }
}  
//delete user
export const deleteUser =async (id,dispatch:any)=>{
    dispatch(deleteUserStart());
    try{        
    //    await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
       console.log(dispatch(deleteUserSuccess(id)));
    }catch(err){
        dispatch(deleteUserFailure())
    }
}  
//updateuser
export const updateUser =async (id:any,user,dispatch:any)=>{
    dispatch(updateUserStart());
    try{
    // update
       dispatch(updateUserSuccess({id, user}));
    }catch(err){
        dispatch(updateUserFailure())
    }
}
//adduser
export const addUser =async (user,dispatch:any)=>{
    dispatch(addUserStart());
    try{
    // create
    const res = await userRequest.post(`/users`,user);
       dispatch(addUserSuccess(res.data));
    }catch(err){
        dispatch(addUserFailure())
    }
}
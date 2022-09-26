import {createSlice} from '@reduxjs/toolkit';


const cartSlice =createSlice({
    name:"cart",
    initialState:{
        products : [],
    cartQuantity:0,
    cartAmount:0,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.cartQuantity +=1;
            state.products.push(action.payload);
            state.cartAmount += action.payload.price*action.payload.quantity;
        },
        increaseCart(state,action){
           const itemIndex = state.products.findIndex(
            (item)=>item.id === action.payload.id
           );
           if(itemIndex >= 0 ){
            state.products[itemIndex].quantity +=1;

           }else{
            const tempProduct = {...action.payload, quantity:1}
            state.products.push(tempProduct);
           }
           localStorage.setItem("products",JSON.stringify(state.products));
        },
        decreaseCart(state,action){
            const item = state.products.findIndex(
                cartItem=> cartItem.id === action.payload.id
            )
            if(state.products[item].quantity >1 ){
                state.products[item].quantity -=1
            }else if(state.products[item].quantity ===1 ){
                const nextItem = state.products.filter(
                    (item)=>item.id !== action.payload.id
                )
                state.products = nextItem;
            }
            localStorage.setItem("products",JSON.stringify(state.products));
        },
        clearCart(state){
             state.products=[];
             localStorage.setItem("products",JSON.stringify(state.products));
        },
        clearLogout(state){
            state.products=[];
            localStorage.setItem("products",JSON.stringify(state.products));
       },
        getTotal(state,action){
           let {total,tquantity} = state.products.reduce(
                (cartTotal,cartItem)=>{
                    const {price,quantity} = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total +=itemTotal
                    cartTotal.tquantity += quantity;

                    return cartTotal;
                },
                {
                    total:0,
                    tquantity:0
                }
            );
            state.cartQuantity = tquantity;
            state.cartAmount = total;
        },
      
    }
      
}, 

)

export const {addProduct,clearCart,decreaseCart,increaseCart,getTotal,clearLogout} = cartSlice.actions;
export default cartSlice.reducer; 
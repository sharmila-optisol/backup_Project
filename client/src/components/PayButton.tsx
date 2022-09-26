import axios from "axios";
import { useAppSelector } from "../hooks";
import { url } from '../redux/apiCalls'

const PayButton =({cartItems})=>{
    const user = useAppSelector((state)=>state.user.currentUser._id)
    const handleCheckout =()=>{
       console.log("carts:",cartItems)
       axios.post(`${url}/stripe/create-checkout-session`,{
        cartItems,
        UserId:user,   
       })
       .then((res)=>{
        if(res.data.url){
            window.location.href = res.data.url;
        }
       })
       .catch((err)=>{
        console.log(err.message);
       })
       console.log("user:",user)
       
    }

    return (
        <>
        <button className="summarybutton"onClick={()=>handleCheckout()}>Check Out</button>
        </>
    )
}

export default PayButton;
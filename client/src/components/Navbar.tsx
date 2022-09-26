import React, {  useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { logout} from '../redux/userRedux'
import { useAppDispatch, useAppSelector } from '../hooks'
import './Navbar.css'
import { userRequest } from '../requestMethod'
import { clearLogout } from '../redux/cartRedux'


   const Navbar= () => {
    // const [user,setUser]=useState(JSON.parse(localStorage.getItem('persist:root')));
    const dispatch = useAppDispatch();
    const users = useAppSelector((state:any) => state.currentUser);
  const filteredUser = useAppSelector((state:any) => state.filteredUser);
  console.log(users);
    const [search,setSearch] = useState("");                                                                
    const quantity = useAppSelector((state)=>state.cart.cartQuantity); 
    const navigate = useNavigate();
    const fetchUsers = (name) =>{
        setSearch(name)  
        userRequest.get("/products/search",{params:{search}}).then(res=>{navigate(`/products/${res.data.categories}`)})
        .catch(err=>console.log(err))
    
         
}            

    const out = () =>{                                                                                       
    localStorage.removeItem("user");  
    dispatch({type:logout})  
    dispatch(clearLogout())
    document.location.href ="/login" ;    
     alert("logged out successfully")   
    }
   
  return (
    <div className='cont'>
        <div className='wrapper'>
            <div className='left-title'>
              <Link to="/">
                <div className='logo'>
                    <h1>SHAPIY</h1>  
                </div>
                </Link>
            </div>         
            <div className="search">    
            <form >                                                         
            <input type="text" placeholder="Search user" className='bar' value={search} name="name" onChange={(e)=>fetchUsers(e.target.value)}/>             
            <button type="submit" ><i className="fa-solid fa-magnifying-glass"></i></button>
            <div>
        { filteredUser?.map((user) => (
          <div>{user.name}</div>
        ))}
      </div>     
            </form>
            </div>
            <div className='right-nav'>

            <div  className='menuItem'><Link to="/otp" >ForgotPassword</Link></div>  
            <div className='menuItem'onClick={out}>LOGOUT</div>
                <Link to='/cart'>
                <div className='menuItem'> 
                <button type="button" className="btn btn-primary">
                <i className="fa-solid fa-cart-shopping" />
                 <span className="badge rounded-pill bg-danger">
                {quantity}
                </span>
             </button>
                </div> 
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
import axios from "axios";


const BASE_URL = "http://localhost:4000/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTZlZjhkNGRlMTQ5OWU0ZjkyOTQ5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDE2MjI3OSwiZXhwIjoxNjY1MDI2Mjc5fQ.Blmj3M0NBVAD9nxwZSB_Izu_gIK80kiq2UhrECkAMeo";
console.log("token:",TOKEN);


//to fetch the products we use this 
export const baseRequest = axios.create({
    baseURL:BASE_URL,
    
})
//use for login & admin
export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})
import axios from "axios";


const BASE_URL = "http://localhost:4000"
const TOKEN = (JSON.parse(localStorage.getItem("persist:root")));
console.log("tokenj:",TOKEN);

//to fetch the products we use this      
export const baseRequest = axios.create({
    baseURL:BASE_URL,
})
//use for login & admin
export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})
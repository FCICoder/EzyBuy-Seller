import axios from "axios";

// ? create instance 
 let instance = axios.create({
    baseURL:"https://nodee-f764.onrender.com",
});

export default  instance;
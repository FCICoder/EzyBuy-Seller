import instance from "../axiosConfig/instance"
import {  } from "react-icons/fa";

export const register = ( data )=>{
   return instance.post('/retailer/signup',data)
}

export const check = (data)=>{
    return instance.post('/retailer/check',data)
}

export const login = (data)=>{
    return instance.post('/retailer/login',data)
}
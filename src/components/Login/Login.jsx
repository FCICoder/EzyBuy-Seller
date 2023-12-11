import  {   useState } from 'react'
import style from './Login.module.css'
import {useFormik} from 'formik'
import * as  Yup from 'yup' 
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast'
import { check,} from '../../services/auth'
export default function Login() {
  let navigate =useNavigate();
  let [error,setError] = useState(null)
  let [isLoading , setisLoading]  = useState(false)

  async function loginSubmit(values){
    setisLoading(true);
    try {
   let {data} =await check(values) 
   console.log(data.data); 
   
   if(data?.data === true ){
    setisLoading(false);
    toast.success("Email Exist")
    localStorage.setItem('retailerEmail',values.email);
    navigate('/passwordPage');
  }else{
    setisLoading(false);
    localStorage.setItem('retailerEmail',values.email);
    toast.success("Email does not Exist")
    navigate('/register');
  }
  }catch(err){
      setError(err.message)
      setisLoading(false)
      toast.error("invalid Email")
    }
  }


  let validateSchema = Yup.object({
    email:Yup.string().email('is invalid name').required( 'email is required'),
  })
  
  const formik = useFormik({
    initialValues:{
      email:'',
    },
    validationSchema:validateSchema,
    onSubmit:loginSubmit,
    
  })

  return (
  <>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      <form onSubmit={formik.handleSubmit}>
      
      <label htmlFor="email" className='text-start  w-100 fw-bold mb-1 ' >Email Address</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className={`form-control mb-2 ${style.input}`} type="email"  name='email' id='email'/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:""}
      
     {!isLoading?
      <div className='d-flex align-items-center justify-content-between' >
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-primary rounded-5 text-white w-100 mt-2 mx-2'> Continue </button>
      
     </div>
     
      :<button  type='button' className='btn btn-primary d-flex justify-content-center  rounded-5 text-white w-100 mt-2'>  
          <MagnifyingGlass
            visible={true}
            height="20"
            width="40"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#e15b64'
          />
       </button>}
    </form>
<Toaster/>
    </>
   )
}

import toast, { Toaster } from "react-hot-toast"
import { MagnifyingGlass } from "react-loader-spinner"
import * as Yup from 'yup'
import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import axios from "axios"

// import ImagesUploader from 'react-images-uploader';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';
// import style from './AddPrd.module.css'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { useEffect } from "react"

export default function AddPrd() {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dpmzm3oum");
  const [uploadPreset] = useState("lmvgp1bw");
  let [error,setError] = useState(null)
  let [isLoading , setisLoading]  = useState(false)
  const navigate = useNavigate()
  let validateSchema = Yup.object({
    title:Yup.string().min(10 , 'name min length is 10').required('title is required'),
    ar_title:Yup.string().min(10 , 'name min length is 10').required('title is required'),
    description:Yup.string().min(10 , 'description min length is 10').required( 'description is required'),
    ar_description:Yup.string().min(10 , 'arabic description min length is 10').required( 'description is required'),
    price:Yup.number().required('price is required'),
    discountPercentage:Yup.number().required('discount is required'),
    stock:Yup.number().required('In stock is required'),
    brand:Yup.string().required('Brand is required'),
    category:Yup.string().required('category is required'),
  })
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: true,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });
  // eslint-disable-next-line
  const myImage = cld.image(publicId);
  useEffect(()=>{
    console.log(myImage);
  },[publicId])
  console.log(publicId);
 async function submetRegister(value){
  
  value.thumbnail=JSON.parse(localStorage.getItem('images'))[0];
  value.images = JSON.parse(localStorage.getItem('images'));
  
  setisLoading(true)
  try{
    let {data} =  await axios.post(`https://nodee-f764.onrender.com/product`,value,{
      headers: {
        'authorization': localStorage.getItem('retailerToken')
      }
    });
    if(data.message === 'Product created successfully'){
      setisLoading(false);
      localStorage.removeItem('images');
      formik.resetForm();
      toast.success('added successfully');
      navigate('/products')
    }
  }catch(err){
    console.log(err);
    setError(err.message)
    setisLoading(false)
  }
  }

  const formik = useFormik({
    initialValues:{
      title:'',
      description:'',
      price:'',
      discountPercentage:'',
      stock:'',
      brand:'',
      category:'',
      ar_title:'',
      ar_description:''

    },
    validationSchema:validateSchema,
    onSubmit:submetRegister,

  })
  return <>
    <div className='w-75 mx-auto py-2'>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className=" text-start w-100" >Title</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} className={`form-control   mb-2 `} type="text"  name='title' id='title'/>
      {formik.errors.title && formik.touched.title? <div className='alert alert-danger mt-2 p-2'>{formik.errors.title}</div>:""}

      <label htmlFor="ar_title" className=" text-start w-100" >ar_title</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ar_title} className={`form-control   mb-2 `} type="text"  name='ar_title' id='ar_title'/>
      {formik.errors.ar_title && formik.touched.ar_title? <div className='alert alert-danger mt-2 p-2'>{formik.errors.ar_title}</div>:""}

      <label htmlFor="description" className=" text-start w-100" >Description</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}  className={`form-control   mb-2 `} type="text"  name='description' id='description'/>
      {formik.errors.description && formik.touched.description? <div className='alert alert-danger mt-2 p-2'>{formik.errors.description}</div>:""}

      <label htmlFor="ar_description" className=" text-start w-100" >ar_description</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ar_description}  className={`form-control   mb-2 `} type="text"  name='ar_description' id='ar_description'/>
      {formik.errors.ar_description && formik.touched.ar_description? <div className='alert alert-danger mt-2 p-2'>{formik.errors.ar_description}</div>:""}

      <label htmlFor="price" className="text-start w-100" >Price</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.price}  className={`form-control   mb-2 `} type="number"  name='price' id='price'/>
      {formik.errors.price && formik.touched.price? <div className='alert alert-danger mt-2 p-2'>{formik.errors.price}</div>:""}
      
      <label htmlFor="discountPercentage" className=" text-start w-100" >DiscountPercentage</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.discountPercentage}  className={`form-control   mb-2 `} type="number"  name='discountPercentage' id='discountPercentage'/>
      {formik.errors.discountPercentage && formik.touched.discountPercentage? <div className='alert alert-danger mt-2 p-2'>{formik.errors.discountPercentage}</div>:""}

      <label htmlFor="stock" className=" text-start w-100" >Stock</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.stock}  className={`form-control   mb-2 `} type="number"  name='stock' id='stock'/>
      {formik.errors.stock && formik.touched.stock? <div className='alert alert-danger mt-2 p-2'>{formik.errors.stock}</div>:""}

      <label htmlFor="brand" className=" text-start w-100" >Brand</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.brand}  className={`form-control   mb-2 `} type="text"  name='brand' id='brand'/>
      {formik.errors.brand && formik.touched.brand? <div className='alert alert-danger mt-2 p-2'>{formik.errors.brand}</div>:""}

      <label htmlFor="category" className=" text-start w-100" >Category</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.category}  className={`form-control   mb-2 `} type="text"  name='category' id='category'/>
      {formik.errors.category && formik.touched.category? <div className='alert alert-danger mt-2 p-2'>{formik.errors.category}</div>:""}

      {/* <label htmlFor="thumbnail" className=" text-start w-100" >Thumbnail</label>
      <input onBlur={formik.handleBlur}  onChange={onImageChange}   className={`form-control   mb-2 `} type="file"  name='thumbnail' id='thumbnail' alt="thumb nail"/>
      {formik.errors.thumbnail && formik.touched.thumbnail? <div className='alert alert-danger mt-2 p-2'>{formik.errors.thumbnail}</div>:""} */}
      <p className="py-2">upload your product's photos (first one will be considered a thumbnail)</p>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      {/* <AdvancedImage
          style={{ maxWidth: "20%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        /> */}
       
      {/* <label htmlFor="images" className=" text-start w-100" >Images</label>
      <input onBlur={formik.handleBlur} onChange={onImagesChange}   className={`form-control   mb-2 `} type="file"   name='images' id='images' alt="images "/>
      {formik.errors.images && formik.touched.images? <div className='alert alert-danger mt-2 p-2'>{formik.errors.images}</div>:""} */}

     {!isLoading?
     <button  disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-primary d-flex justify-content-center w-100 text-white mt-2 rounded-5'> Add product </button>
      :<button  type='button' className='btn bg-primary d-flex justify-content-center rounded-5 w-100 text-white mt-2'>  
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
    </div>

  </>
}

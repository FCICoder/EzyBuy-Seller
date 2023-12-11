import axios from "axios";
import { Column } from "primereact/column";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { MenuContext } from "../../contexts/Menu";
import { useContext } from "react";
import { ColorRing, MagnifyingGlass } from "react-loader-spinner";
import { Tag } from "primereact/tag";
import TableContainer from "../UI/TableContainer";
import { DataTable } from "primereact/datatable";
import { Rating } from "primereact/rating";
import * as Yup from 'yup'
import classes from './EditPrd.module.css'
import { useFormik } from "formik";

export default function EditPrd() {
  const menuCtx = useContext(MenuContext);
  const [isLoading, setIsLoading] = useState(true);
  let [error,setError] = useState(null)
  let {id}  = useParams();
  let [product , setProduct] = useState({});
  let [ishidden, setIsHidden] = useState(true);
  let show = ()=>{
    setIsHidden(false)
  }
  let hide = ()=>{
    setIsHidden(true)
  }
  async function getPrd(id){
    try{
      let {data } = await axios.get(`https://nodee-f764.onrender.com/product/details/${id}`)
      console.log(data);
      setProduct(data?.data);
      setIsLoading(false);
    }catch(err){
      console.log(err.message);
      toast.error(err.message);
    }    
  }


  useEffect(()=>{
    getPrd(id);
  })


  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img className={classes.img}
        src={`${product.images[0]}`}
        alt={product.image}
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={Math.round(product.rating)} readOnly cancel={false} />;
  };

  const editProduct = (product) => {
    return <button className='btn btn-primary' onClick={()=>show()}>
      Edit
    </button>;
  };


  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={getStatus(product)}
        severity={getSeverity(product)}
      ></Tag>
    );
  };

  const getStatus = (product) => {
    if(product.stock >= 100){
      return  'INSTOCK'
    }else if(product.stock <100){
      return  'LOWSTOCK' 
    }else if (product.stock === 0){
      return  'OUTOFSTOCK' 
    }

  };

  const getSeverity = (product) => {
    if(product.stock >= 100){
      return  'success'
    }else if(product.stock <100){
      return  'warning' 
    }else if (product.stock === 0){
      return  'danger' 
    }
  };

  const header = (
    <div className='d-flex justify-content-between align-items-center hdr'>
      <span className="text-xl text-900 font-bold">Product</span>
      <Link to='/products' >
      <button className="btn btn-dark">Back to Products</button>
      </Link>
    </div>
  );
  const footer = `Update a specific Product.`;
  
  let validateSchema = Yup.object({
    title:Yup.string().min(3 , 'title min length is 3'),
    price:Yup.number(),
    discount:Yup.number().max(10 , 'maximum discount is 10 '),
  })

 async function submetUpdates(value){
  setIsLoading(true)
  if(value.title === ''|| value.price ==='' || value.discount === ''){
    value.title = product.title;
    value.price = product.price;
    value.discount = product.discountPercentage;
  }
  try{
    let {data} = await axios.patch(`https://nodee-f764.onrender.com/product/${id}`,value,{
      headers: {
        'authorization': localStorage.getItem('retailerToken')
      },
    })
    if(data.message === 'Product edited successfully'){
      setIsLoading(false);
      getPrd(id);
      toast.success('Done')
    }
  }catch(err){
    console.log(err.message);
    setError(err.message)
    setIsLoading(false)
  }
  }
  
  const formik = useFormik({
    initialValues:{
      title:'' || product.title,
      price:''|| product.price,
      discount: '' || product.discountPercentage
    },
    validationSchema:validateSchema,
    onSubmit:submetUpdates,

  })
  return <>
  {isLoading?
      <div className=' w-100 py-5 fs-1 d-flex justify-content-center align-items-center' style={{}}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
      :
    <TableContainer>
      <div className={menuCtx.darkMode ? "dark" : ""}>
        <DataTable
          value={[product]}
          header={header}
          footer={footer}
          tableStyle={{
            minWidth: "60rem",
            width: "100%",
          }}
        >
          <Column field="title" header="Name" className={classes.names}></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column
            field="price"
            header="Price"
            body={priceBodyTemplate}
          ></Column>
          <Column field="category" header="Category"></Column>
          <Column
            field="rating"
            header="Reviews"
            body={ratingBodyTemplate}
          ></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
          <Column header="Edit" body = {editProduct}></Column>
        </DataTable>
      </div>
    </TableContainer>

    
    }
    <div className='w-75 mx-auto py-2' hidden={ishidden}>
      {error ? <div className='alert alert-danger'>{error}</div>:""}
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className=" text-start w-100" >title</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title || product.title} className={`form-control   mb-2 `} type="text"  name='title' id='title'  />
      {formik.errors.title && formik.touched.title? <div className='alert alert-danger mt-2 p-2'>{formik.errors.title}</div>:""}

      <label htmlFor="price" className=" text-start w-100" >New Price</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.price || product.price}  className={`form-control   mb-2 `} type="number"  name='price' id='price' />
      {formik.errors.price && formik.touched.price? <div className='alert alert-danger mt-2 p-2'>{formik.errors.price}</div>:""}
      
      <label htmlFor="discount" className="text-start w-100" >discount</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.discount || product.discountPercentage}  className={`form-control   mb-2 `} type="number"  name='discount' id='discount' />
      {formik.errors.discount && formik.touched.discount? <div className='alert alert-danger mt-2 p-2'>{formik.errors.discount}</div>:""}
      
     <button onClick={()=>hide()} type="button" className='btn bg-danger d-flex justify-content-center w-100 text-white mt-2 rounded-5'> Cancel  </button>

     {!isLoading?
     <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-primary d-flex justify-content-center w-100 text-white mt-2 rounded-5'> Update  </button>
      :<button  type='button' className='btn d-flex justify-content-center bg-primary rounded-5 w-100 text-white mt-2'>  
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

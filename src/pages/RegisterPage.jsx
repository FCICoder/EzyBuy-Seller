import Register from '../components/Register/Register'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-06 - Copy.svg'

const RegisterPage = () => {

  let navigate = useNavigate();
  return <>
  <Container>
    <div className=' text-center py-5 ' >
      <div className='d-flex flex-column align-items-center '>
      <img 
      style={{maxWidth:'200px'}}
      src={logo}
            alt="" />
            
       <h4 className='mt-2'>Create your Walmart account</h4>
       <div className='d-flex '>
       <p className='text-start text-body-secondary' style={{fontSize:16}} >Email address: &nbsp;  </p>
       <p style={{fontSize:16}} className='text-start text-body-secondary' > {localStorage.getItem("customerEmail")}
       <span className='ms-4'>
        <button className={`border-0 text-decoration-underline bg-light`} style={{fontSize:14}}  onClick={()=>navigate('/login')} >
          Change
        </button>
       </span>

       </p>
       
       </div>
       
      </div>
      
        <div className='  d-flex justify-content-center align-items-center '>
        <div className="w-100 d-flex flex-column " style={{maxWidth:'500px'}}>
          <Register/>

          </div>
      </div>

    </div>

    </Container>
    </>
}

export default RegisterPage

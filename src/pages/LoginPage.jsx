import Login from '../components/Login/Login'
import { Container } from 'react-bootstrap'
import logo from '../assets/logo-06 - Copy.svg'
const LoginPage = () => {
  return <>
  <Container>
    <div className=' py-5 text-center d-flex flex-column gap-3' >
      <div className='d-flex flex-column align-items-center'>
      <img 
      className='img-fluid mb-2'
      style={{maxWidth:'200px'}}
      src={logo}
       alt="" />
       <h5 >Sign in or create your account</h5>
       <p style={{fontSize:14}}>Not sure if you have an account?</p>
       <p style={{fontSize:14}}>Enter your email and we’ll check for you.</p>
      </div>
        <div className=' d-flex justify-content-center align-items-center '>
        <div className="w-100 d-flex flex-column " style={{maxWidth:'300px'}}>

          <Login/>

          </div>
      </div>

    </div>

    </Container>
    </>
}

export default LoginPage
import { Link } from 'react-router-dom'
import style from './NotFound.module.css'
import notFound from '../../assets/notfound.jpg'
export default function NotFound() {
  return <>
  <div class="container d-flex flex-column  justify-content-center align-items-center w-100">
            <img className='img-fluid w-50'  src={notFound} alt='img 1' />
            <div className={style.info}>
                <Link to='/'>
                <button className='btn btn-dark'>Back to Home</button>
                 </Link>
            </div>
        </div >
  </>
}

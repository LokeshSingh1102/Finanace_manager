import { Link } from "react-router"
import Grarph from '../pages/Grarph'


function Header() {
    return (
        <div className='flex justify-between bg-sky-200' >
            <div className='flex justify-center '>
                <div className='m-2 flex justify-center flex-2 items-center'>
                    <Link to={'/'} >
                        <div className='logo cursor-pointer'>FinMan</div>
                    </Link>
                </div>
            </div>
            <div className="mr-2">
                <div className='childService' >
                    <p className="ml-36 cursor-pointer" >
                        profile
                    </p>
                    <ul className='z-1 w-48 ml-4 bg-slate-400 mr-2'>
                        <li><Link to={"/setting"}> <p>Go to Profile Page</p></Link></li>
                        <li><Link to={"/graph"}> <p>Graph</p></Link></li>
                        <li><Link to={"/signin"}> <p>Logout</p></Link></li>

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Header
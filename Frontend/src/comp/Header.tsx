import { Link } from "react-router"

function Header() {
    return (
        <div className='flex justify-between' >
            <div className='flex justify-center'>
                <div className='flex justify-center flex-2 items-center'>
                    <Link to={'/'} >
                        <div className='logo cursor-pointer'>FinMan</div>
                    </Link>
                </div>
                <div className='flex-none services flex justify-center items-center'>
                    <div className='childService m-auto'>
                        <a href="">Recharge</a>
                        <ul className='z-1 w-18'>
                            <li><a href="">One</a></li>
                            <li><a href="">Two</a></li>
                            <li><a href="">Three</a></li>
                        </ul>
                    </div>
                    <div className='childService w-38'><a href="">Ticket Booking</a>
                        <ul className='z-1 w-30'>
                            <li><a href="">One</a></li>
                            <li><a href="">Two</a></li>
                            <li><a href="">Three</a></li>
                        </ul>
                    </div>
                    <div className='childService w-56'><a href="">Payment and services</a>
                        <ul className='z-1 w-42'>
                            <li><a href="">One</a></li>
                            <li><a href="">Two</a></li>
                            <li><a href="">Three</a></li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="mr-2">
                <div className='childService' >
                    <p className="ml-36 cursor-pointer" >
                        profile
                    </p>
                    <ul className='z-1 w-48 ml-4 bg-slate-400 mr-2'>
                        <li><Link to={"/setting"}> <p>Go to Profile Page</p></Link></li>
                        <li><a href="/Signup">Logout</a></li>

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Header
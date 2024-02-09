import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import {
    useAppSelector,
    useAppDispatch
} from "../../store/hooks"
import { setLogOut } from "../../store/slices/user"
import GeneralButton from '../common/GeneralButton';

const Navbar = () => {
    const userAuthDetails = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const navItems = [
        // { name: 'Home', path: '/', }, //If user is log in then user should not be here
        { name: 'Notes', path: "/notes" },
        { name: 'Profile', path: "/profile" },
        { name: 'Archived', path: "/archives" }
    ]
    return (
        <div className="bg-yellow-500 min-h-14 flex items-center pl-2 pr-2 md:pr-3" >
            <Logo className='w-[20%] mr-5' logoText='📝' />
            <ul className=' w-[30%] flex' >
                {navItems.map((item, index) => {
                    if (userAuthDetails.isLogedIn === false && (item.name === "Notes" || item.name === "Profile" || item.name === "Archived")) {
                        return null
                    }
                    return (
                        <li className='m-2 text-white text-lg' key={index}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    )
                })}
            </ul>
            <div className='w-[60%] flex items-center' >
                {userAuthDetails.isLogedIn ?
                    <div className='w-full  flex items-center justify-between'>
                        <SearchBar />
                        <GeneralButton buttonText='Log out' onClick={() => { dispatch(setLogOut()) }} />
                    </div> :
                    <>
                        <GeneralButton className='mr-3' buttonText='Sign In' onClick={() => { navigate("/signin") }} />
                        <GeneralButton className='bg-white/0 border-2' buttonText='Sign Up' onClick={() => { navigate("/signup") }} />
                    </>
                }
            </div>

        </div>
    )
}

export default Navbar
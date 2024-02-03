import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';

const Navbar = () => {
    const navItems = [
      { name: 'Home',path: '/',}, //If user is log in then user should not be here
      { name: 'Notes', path: "/notes"},
      { name: 'Profile', path: "/profile"},
      { name: 'Archived', path: "/archives"}
    ]
    return (
        <div className="bg-yellow-500 min-h-14 flex items-center justify-between pl-2 pr-2" >
            <Logo logoText='📝' />
            <ul className='flex' >
                {navItems.map((item, index) => (
                    <li className='m-2 text-white text-lg' key={index}>
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <SearchBar />
        </div>
    )
}

export default Navbar
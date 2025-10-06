import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../firebase';
import logo from '../../assets/logo.png';
import serachIcon from '../../assets/search_icon.svg';
import bellIcon from '../../assets/bell_icon.svg';
import profileImg from '../../assets/profile_img.png';
import caretIcon from '../../assets/caret_icon.svg';
import './Navbar.css';

function Navbar(){
    const navigate = useNavigate();
    const navRef = useRef();

    useEffect(() => {
        function scrollHandler() {
             if(window.scrollY >= 80){
                navRef.current.classList.add('nav-dark');
            }else{
                navRef.current.classList.remove('nav-dark');
            }
        }

        window.addEventListener('scroll', scrollHandler);
           

        return (window.removeEventListener('scroll', scrollHandler ));
    }, [])

    return (
        <div className='navbar' ref={navRef}>
            <div className="navbar-left">
                <img src={logo} alt="" />
                <ul>
                    <li onClick={() => navigate('/')}>Home</li>
                    <li>TV Show</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li onClick={() => navigate('/watchlist')}>My List</li>
                </ul>
            </div> 
            <div className="navbar-right">
                <img src={serachIcon} alt="" className='icon'/>
                <p>children</p>
                <img src={bellIcon} alt="" className='icon'/>
                <div className="navbar-profile">
                    <img src={profileImg} alt="" className='profile'/>
                    <img src={caretIcon} alt="" />
                    <div className="dropdown">
                        <p onClick={() => logout()}>Sign Out of Netflix</p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Navbar;
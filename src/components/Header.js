import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <nav className="navbar navbar-expand-sm mb-3 border-bottom bg-primary">
            <a className="navbar-brand text-decoration-none" href="/"><span className='text-secondary'>Wood</span><span className='text-light'>LAND</span></a>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                    <a className="nav-link text-light" href="#" onClick={e=> {localStorage.clear(); history.push('/')}}>Log Out</a>
                </li>
                <li className="nav-item ">
                    <Link className="nav-link text-light" to="/cart">My cart</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header
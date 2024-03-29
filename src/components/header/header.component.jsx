import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import BpmContext from '../../contexts/bpm.context';

import './header.styles.scss';

const Header = () => {
    const currentUser = useContext(BpmContext);
    return (
        <div className='header'>
            <div className='options'>
                <Link className='option' to='/'>Home</Link>
                <Link className='option'
                    to={{ pathname: '/days', state: { days: 7 } }}>7 DAYS</Link>
                <Link className='option'
                    to={{ pathname: '/days', state: { days: 30 } }}>30 DAYS</Link>
                {currentUser ? (
                    <Link className='option' to='/newentryform'>
                        <span className='fas fa-plus' ></span>
                    </Link>
                ) : (
                        <Link className='option' to='/signin'>SIGN IN</Link>
                    )
                }
            </div>
        </div >
    )
};

export default Header;
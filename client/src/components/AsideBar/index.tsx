import React, { HTMLAttributes } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import LandingButton from '../LandingButton';

import './styles.css';

const AsideBar: React.FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <aside className="aside-bar" { ...props } >
        <LandingButton small />

        <Link to="/map" className="return-btn" >
            <FaArrowLeft size={17} /> 
        </Link>
    </aside>
  );
}

export default AsideBar;
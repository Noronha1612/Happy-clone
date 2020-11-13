import React from 'react';
import { Link } from 'react-router-dom';

import HappyPoint from '../../assets/HappyPoint.png'

interface LandingProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    small?: boolean
}

const LandingButton: React.FC<LandingProps> = ({ small = false, className, ...props }) => {
  return (
      <Link to ="/" {...props}>
          <img className={className} src={HappyPoint} style={small ? { height: '56px', width: '48px' } : { height: '72px', width: '64px' }} alt="Happy"/>
      </Link>
  );
}

export default LandingButton;
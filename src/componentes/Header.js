import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
     return ( 
          <header className="col-12">
               <Link to={'/'} >
                    <h1 className="text-center">IAM MasMovil!</h1>
               </Link>
          </header>
      );
}
 
export default Header;
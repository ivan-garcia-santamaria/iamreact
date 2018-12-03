import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
     return (  
          <nav className="col-12 col-md-8">
               <Link to={'/'}>Usuarios</Link>
               <Link to={'/createUser'}>Nuevo Usuario</Link>
          </nav>
     );
}
 
export default Navbar;
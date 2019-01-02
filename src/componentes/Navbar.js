import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import power from '../on-off-power-button.png';


class Navbar extends Component {


     iniciarSesion = () => {
          this.props.auth.login();
      }
  
      cerrarSesion = () => {
          this.props.auth.logout();
      }


     componentWillReceiveProps() {
          
          const { isAuthenticated } = this.props.auth;
          if( ! isAuthenticated() ) {
               console.log("no esta autenticado");
          }else{
               console.log("esta autenticado");

          }
        }

        render() {
          const { isAuthenticated } = this.props.auth;

          return (
               <nav className="navegacion">
                    <Link to={'/users/'}>Usuarios</Link>
                    <Link to={'/groups/'}>Grupos</Link>
                    <Link to={'/profiles/'}>Perfiles</Link>
                    <Link to={'/permissions/'}>Permisos</Link>
                    <Link to={'/roles/'}>Roles</Link>
                    { isAuthenticated() && (
                         <div className="contenedor-boton"><div className="boton" onClick={this.cerrarSesion}>{this.props.auth.idTokenPayload.name} <img src={power} alt="Logout" /></div></div>
                    )}
                    { !isAuthenticated() && (
                         <div className="contenedor-boton"><div className="boton" onClick={this.iniciarSesion}>Login</div></div>
                    )}
               </nav>
          );
     }
}
 
export default Navbar;
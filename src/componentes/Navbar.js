import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import power from '../on-off-power-button.png';


class Navbar extends Component {

     state = {
          profile: {}
     }

     iniciarSesion = () => {
          this.props.auth.login();
      }
  
      cerrarSesion = () => {
          this.props.auth.logout();
      }


     componentWillReceiveProps() {
          const { isAuthenticated } = this.props.auth;
          if( isAuthenticated() ) {
               this.setState({ profile: {} });

               const { userProfile, getProfile } = this.props.auth;
     
               if (!userProfile) {
                    getProfile((err, profile) => {
                         console.log(profile);
                         console.log(this.props.auth.authorization);
                         console.log(this.props.auth);
                    this.setState({ profile });
                    });
               } else {
                    console.log(userProfile);
                    this.setState({ profile: userProfile });
               }
          }else{
               console.log("no pasa");
          }
        }

        render() {
          const { isAuthenticated } = this.props.auth;

          let resultado;
    
          if( isAuthenticated() ) {       
               
              resultado = <div className="contenedor-boton"><a className="boton" onClick={this.cerrarSesion}>{this.state.profile.name} <img src={power} alt="Logout" /></a></div>
          } else {
               resultado = <div className="contenedor-boton"><a className="boton" onClick={this.iniciarSesion}>Login</a></div>
          }

          return (
               <nav className="navegacion">
                    <Link to={'/users/'}>Usuarios</Link>
                    <Link to={'/groups/'}>Grupos</Link>
                    <Link to={'/profiles/'}>Perfiles</Link>
                    <Link to={'/permissions/'}>Permisos</Link>
                    <Link to={'/roles/'}>Roles</Link>
                    {resultado}
               </nav>
          );
     }
}
 
export default Navbar;
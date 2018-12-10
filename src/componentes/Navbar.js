import React, { Component } from 'react';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import './Navbar.css';


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
  
              resultado = <div> {this.state.profile.name} <div className="contenedor-boton"><a className="boton" onClick={this.cerrarSesion}>Logout</a></div></div>
          } else {
               resultado = <div className="contenedor-boton"><a className="boton" onClick={this.iniciarSesion}>Login</a></div>
          }

          return (
               <nav className="navegacion">
                    <Link to={'/users/'}>Usuarios</Link>
                    {resultado}
                    <Popup trigger={<span> Trigger</span>} position="right center">
                      <div>Popup content here !!</div>
                    </Popup>
               </nav>
          );
     }
}
 
export default Navbar;
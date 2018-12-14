import React, { Component } from 'react';
import Popup from "reactjs-popup";
import {Link} from 'react-router-dom';
import './Navbar.css';
import power from '../on-off-power-button.png';


const Card = ({ title }) => (
     <div className="card">
       <div className="header">{title} position </div>
       <div className="content">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit autem
         sapiente labore architecto exercitationem optio quod dolor cupiditate
       </div>
     </div>
   )

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
                    {resultado}
               </nav>
          );
     }
}
 
export default Navbar;
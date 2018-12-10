import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';
import UsersSection from './UsersSection';
import SingleUser from './SingleUser';
import UserForm from './UserForm';
import swal from 'sweetalert2';
import Auth from '../Auth/Auth';
import history from '../history';
import Callback from './Callback/Callback';

const auth = new Auth();

const handleAuthentication = ({location}) => {
     if (/access_token|id_token|error/.test(location.hash)) {
       auth.handleAuthentication();
     }
 }

class Router extends Component {
     state = { 
          users: [],
          auth0_domain: 'masmovil.eu.auth0.com',
          auth0_token: ''

      }

      


      componentDidMount() {
          if (!this.state.auth0_token) {
               console.log('obteniendo el token');
               this.getAccessToken();
          }else { 
               console.log('solo busca usuarios');
               this.getUsers();
          }
      }

      getAccessToken = () => {
          const tokenRequest = {
               grant_type: 'client_credentials',
               client_id: 'M7p4ae2yWH7SymwbUYGq2UuweVjzXNOG',
               client_secret: 'TOSmk-oLa-JdSmP354_IBaSVhe3l7EFAGeCNaP5hE3rhLf_iTOt-dF5VqzfBWagq',
               audience: 'https://masmovil.eu.auth0.com/api/v2/'
          }

          axios.post(`https://${this.state.auth0_domain}/oauth/token`, tokenRequest,
           {headers: {}
           }).then(res => {
                console.log(res);
                if (res.status === 200) {

                    this.setState({
                         auth0_token: res.data.access_token
                   });
                   this.getUsers();
                   
                }
          }).catch(error => {
               console.log(error);
          })

      }

      getUsers = () => {
          console.log("buscando users");
          axios.get(`https://${this.state.auth0_domain}/api/v2/users`,
           {headers: {
               "Authorization" : `Bearer ${this.state.auth0_token}`
             }
           }).then(res => {
                    this.setState({
                         users: res.data
                    })
               })
     }

     delUser = (userId) => {
          console.log(`que borro al user ${userId}`)
          axios.delete(`https://${this.state.auth0_domain}/api/v2/users/${userId}`,
           {headers: {
               "Authorization" : `Bearer ${this.state.auth0_token}`
             }
           }).then(res => {
                console.log(res);
                if (res.status === 204) {

                    swal({
                         title: `Estas seguro??`,
                         text: `Esta acción no se puede deshacer! Vas a borrar a ${userId}`,
                         type: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Si, borrar!',
                         cancelButtonText : 'Cancelar'
                     }).then((result) => {
                         if (result.value) {
                             swal(
                                 'Eliminado!',
                                 'El usuario se ha eliminado.',
                                 'success'
                             )
                             const users = [...this.state.users];

                             let resto = users.filter(user => (
                                 user.user_id !== userId
                             ));
        
                             this.setState({
                                 users: resto
                            })

                         }
                     });
                }else{
                    swal({
                         type: 'error',
                         title: 'Oops...',
                         text: 'Something went wrong!'
                         // footer: '<a href>Why do I have this issue?</a>'
                       });
                }
               })
     }

     createUser = (user) => {
          console.log(`creando el usuario ${user.name}`)
          console.log(user)
          axios.post(`https://${this.state.auth0_domain}/api/v2/users`, user,
           {headers: {
               "Authorization" : `Bearer ${this.state.auth0_token}`
             }
           }).then(res => {
                console.log(res);
                if (res.status === 201) {
                    const users = [...this.state.users,res];

                    this.setState({
                        users
                   })

                   swal(
                         'Usuario Creado',
                         'Se creo correctamente',
                         'success'
                     ).then(function(){
                         window.location.href = "/";
                     });

                }
          }).catch(error => {
               swal({
                    type: 'error',
                    title: error.response.data.error,
                    text: error.response.data.message 
                    // footer: '<a href>Why do I have this issue?</a>'
                    });

          })
     }

     render() { 
          return ( 
               <BrowserRouter>
                    <div className="container">
                         {/* <div className="row justify-content-center2"> */}
                              <Header 
                                   getUsers = {this.getUsers}
                              />
                              <Navbar auth={auth} />
                              <Switch>
                                   <Route exact path="/" render={ () => {
                                        return(
                                             <UsersSection 
                                                  users={this.state.users}
                                                  delUser={this.delUser}
                                             />
                                        )
                                   }}
                                   />
                                   <Route exact path="/users/:userId" render={ (props) => {
                                        let userId = props.location.pathname.replace('/users/','');

                                        const users = this.state.users;

                                        let filtro;
                                        filtro = users.filter(user => (
                                             user.user_id === userId
                                        ))

                                        return(
                                             <SingleUser
                                                  user = {filtro[0]} 
                                             />
                                             
                                        )
                                   }}
                                   />
                                   <Route exact path="/createUser" render={ () => {
                                            return(
                                                <UserForm 
                                                  createUser={this.createUser}
                                                />
                                            )
                                    }}
                                    />
                                   <Route path="/callback" render={(props) => {
                                        handleAuthentication(props);
                                        return <Callback {...props} /> 
                                   }}/>
                              </Switch>
                         {/* </div> */}
                    </div>
               </BrowserRouter>
           );
     }
}
 
export default Router;
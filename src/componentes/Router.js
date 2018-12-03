import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';
import UsersSection from './UsersSection';
import SingleUser from './SingleUser';
import UserForm from './UserForm';
import swal from 'sweetalert2';

class Router extends Component {
     state = { 
          users: [],
          auth0_domain: 'masmovil.eu.auth0.com',
          auth0_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VTkJNa0ZGTWtKQlFqVkRPVFV4TlVWQ04wRTRPVEV5UWpGRFJFSTFNMFZEUXpBMU1UVTVNQSJ9.eyJpc3MiOiJodHRwczovL21hc21vdmlsLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJ2c3lqa0cxQ09DSlFEN2U4SU44R0ZoWmpEdzg1THNXNUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9tYXNtb3ZpbC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU0Mzg1OTkzMCwiZXhwIjoxNTQzOTQ2MzMwLCJhenAiOiJ2c3lqa0cxQ09DSlFEN2U4SU44R0ZoWmpEdzg1THNXNSIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.FAfjRuma_3eEdiLLbPyEoPSVBpdCcz8LTMUXh2hNC_7tADPiaNmRCRLHPzAO8CBaloQ3v4vQPifZxKhqFDPfzRcihmSMgAPL_ucSDJeoQu-Uvpb1UfN-dzIyWEIF8xyTk8h_jas1SV-JDbAmTvkMrzoP9RDbb1yc3TnAK1j_WuO1dFeNGTR8hXupfoFmIB39kvQNKiXVs6fO90Mpymmx3A84UAW8Ni0VkuqeWwaCanPeYj7C867yWaXNW6pG8xphXdlRDHEVebPLXn0l-uXGU6btV7ecVYeM6tCBerOCODeRqkPRJCPI85mcZGqSwA75FZlliD55JTArI6Ne-SyIEQ'

      }
      componentDidMount() {
           this.getUsers();
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
                         <div className="row justify-content-center2">
                              <Header 
                                   getUsers = {this.getUsers}
                              />
                              <Navbar/>
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
                              </Switch>
                         </div>
                    </div>
               </BrowserRouter>
           );
     }
}
 
export default Router;
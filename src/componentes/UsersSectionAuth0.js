import React, { Component } from 'react';
import ListUsers from './ListUsers';
import swal from 'sweetalert2';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UsersSectionAuth0 extends Component {
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
      
      render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Usuarios <Link to={'/createUser'}>+Usuario</Link></h2>
                <ListUsers 
                    users= {this.state.users}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default UsersSectionAuth0;
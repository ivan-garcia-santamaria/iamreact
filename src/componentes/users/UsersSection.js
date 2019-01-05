import React, { Component } from 'react';
import ListUsers from './ListUsers';
import {Link} from 'react-router-dom';
import { URL_USERS } from '../../constants';
import axios from 'axios';
import Errors from '../errors/Errors';

const errors = new Errors();

class UsersSection extends Component {

    
    componentDidMount() {
        this.getUsers();
      }

    getUsers = () => {
        console.log("buscando users en users -> " + this.props.auth.getAccessToken());
        axios.get(`${URL_USERS}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(res => {
            this.props.updateStateUsers(res.data)
        }).catch(error => {
            errors.showErrorForbidden();
        })
    }

   unblockUser = (userId) => {
       console.log(`unblockUser user ${userId}`)
       errors.getModalAlert("Estas seguro??",
           `Vas a desbloquear a ${userId} y podrá interactuar con los sistemas de MM!`,
           'Si, desbloquear!'
       ).then((result) => {
           if (result.value) {

               const user = {
                   connection: 'Username-Password-Authentication',
                   blocked: false
               }

               axios.patch(`${URL_USERS}/${userId}`, user, {
                   headers: {
                       "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
                   }
               }).then(res => {
                   //Find index of specific object using findIndex method.    
                   const users = [...this.props.users];
                   const objIndex = users.findIndex((obj => obj.user_id === userId));
                   //this.props.updateStateUsers(res.data)
                   //Log object to Console.
                   console.log("Before update: ", users[objIndex]);

                   //Update object's name property.
                   users[objIndex].blocked = false;

                   this.props.updateStateUsers(users);
               })
           }
       });
   }

   delUser = (userId) => {
       console.log(`que borro al user ${userId}`)
       errors.getModalAlert("Estas seguro??",
           `Esta acción no se puede deshacer! Vas a borrar a ${userId}`,
           'Si, borrar!'
       ).then((result) => {
           if (result.value) {
               axios.delete(`${URL_USERS}/${userId}`, {
                   headers: {
                       "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
                   }
               }).then(res => {
                   console.log(res);
                   if (res.status === 204) {
                       errors.showSuccess(
                           'Eliminado!',
                           'El usuario se ha eliminado.'
                       );
                       const users = [...this.props.users];

                       let resto = users.filter(user => (
                           user.user_id !== userId
                       ));

                       this.props.updateStateUsers(resto)
                   } else {
                       errors.showError('Oops...',
                           'Algo ha ido realmente mal!');
                   }
               })

           }
       });
   }

      render() {
        return (
            <div className="col-12 col-md-8">
                <h2 className="text-center">Usuarios <Link to={'/createUser'}>+</Link></h2>
                <ListUsers 
                    auth= {this.props.auth}
                    users= {this.props.users}
                    unblockUser= {this.unblockUser}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default UsersSection;
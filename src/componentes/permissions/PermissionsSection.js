import React, { Component } from 'react';
import axios from 'axios';
import ListPermissions from './ListPermissions';
import {Link} from 'react-router-dom';
import { URL_PERMISSIONS } from '../../constants';
import Errors from '../errors/Errors';

const errors = new Errors();

class PermissionsSection extends Component {
    state = { 
        permissions: []
    }

    
    componentDidMount() {
        this.getPermissions();
    }

    getPermissions = () => {
        console.log("buscando Permissions");
        axios.get(`${URL_PERMISSIONS}`, {
            headers: {
                "Authorization": `Bearer ${this.props.auth.getAccessToken()}`
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                permissions: res.data.permissions
            })
        }).catch(error => {
            errors.showErrorForbidden();
        })
    }
    
      render() {
        return (
            <div className="col-12 col-md-12">
                <h2 className="text-center">Permisos <Link to={'/createUser'}>+</Link></h2>
                <ListPermissions 
                    auth= {this.props.auth}
                    permissions= {this.state.permissions}
                    delUser = {this.delUser}
                />
            </div>
        );
    }
}

export default PermissionsSection;
import React, { Component } from 'react';
import axios from 'axios';
import ListPermissions from './ListPermissions';
import {Link} from 'react-router-dom';

class PermissionsSection extends Component {
    state = { 
        permissions: []
    }

    
    componentDidMount() {
        this.getPermissions();
    }

    getPermissions = () => {
        console.log("buscando Permissions");
        axios.get(`https://vertx.lab.ovid-project.com/iam/v1/permissions/`,
         {headers: {
           }
         }).then(res => {
             console.log(res.data);
            this.setState({
                permissions: res.data
            })
         })
   }
    
      render() {
        return (
            <div className="col-12 col-md-8">
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